import { callGemini } from "../utils/geminiClient.js";

function toInt(val, def = 0) {
  const n = Number.parseInt(val, 10);
  return Number.isFinite(n) && n >= 0 ? n : def;
}

function clipStr(s, max = 500) {
  if (!s) return "";
  const t = String(s).trim();
  return t.length > max ? t.slice(0, max) : t;
}

// Basic server-side validation & sanitization
export function validateTravelPlanPayload(body) {
  const errors = {};

  const destination = clipStr(body?.destination, 120);
  const days = toInt(body?.days);
  const travelers = toInt(body?.travelers);
  const budget = clipStr(body?.budget, 60);
  const travelStyle = clipStr(body?.travelStyle, 24);
  const startDate = clipStr(body?.startDate, 32);
  const constraints = clipStr(body?.constraints, 500);
  const interestsText = clipStr(body?.interestsText, 300);

  let interests = Array.isArray(body?.interests)
    ? body.interests
        .filter((x) => typeof x === "string")
        .map((x) => clipStr(x, 40))
        .slice(0, 20)
    : [];

  let travelerTypes = Array.isArray(body?.travelerTypes)
    ? body.travelerTypes
        .filter((x) => typeof x === "string")
        .map((x) => clipStr(x, 24))
        .slice(0, 10)
    : [];

  if (days <= 0) errors.days = "Trip length must be at least 1 day";
  if (travelers <= 0) errors.travelers = "Number of travelers must be at least 1";
  if (travelStyle && !["relaxed", "moderate", "packed"].includes(travelStyle.toLowerCase())) {
    errors.travelStyle = "Travel style must be relaxed, moderate, or packed";
  }

  return {
    errors,
    cleaned: {
      destination,
      days,
      travelers,
      travelerTypes,
      interests,
      interestsText,
      budget,
      travelStyle,
      startDate,
      constraints,
    },
  };
}

function buildPrompt(clean) {
  const {
    destination,
    days,
    travelers,
    travelerTypes,
    interests,
    interestsText,
    budget,
    travelStyle,
    startDate,
    constraints,
  } = clean;

  const systemPrompt = `You are a local Sri Lankan travel expert helping plan detailed, practical itineraries. Return concise, well-structured plans that are easy to skim on mobile. Avoid overly flowery language.`;

  const bullets = [
    destination ? `Destination: ${destination}` : null,
    `Trip length: ${days} day${days > 1 ? "s" : ""}`,
    `Travelers: ${travelers}${travelerTypes?.length ? ` (${travelerTypes.join(", ")})` : ""}`,
    interests?.length ? `Interests: ${interests.join(", ")}` : null,
    interestsText ? `Additional preferences: ${interestsText}` : null,
    budget ? `Budget: ${budget}` : null,
    travelStyle ? `Travel style: ${travelStyle}` : null,
    startDate ? `Start date/window: ${startDate}` : null,
    constraints ? `Hard constraints: ${constraints}` : null,
  ].filter(Boolean);

  const userContent = `Create a travel plan with the following sections for Sri Lanka or the specified destination:\n\n- Overview (short)\n- Day-by-day itinerary (${days} days) with 2-4 key activities per day, realistic timing, local tips\n- Estimated costs (per person and total), show a simple itemized breakdown\n- Recommended accommodations (2-3 options, budget to midrange)\n- Recommended transport between points (with time estimates)\n- Short packing list (10-15 bullets)\n- Travel tips (8-12 practical tips covering: local customs & etiquette, safety advice, best times to visit attractions, money-saving tips, food recommendations, communication/language tips, health precautions, and cultural do's and don'ts)\n- Helpful links (general, no affiliate links)\n\nConstraints and preferences:\n${bullets.map((b) => `- ${b}`).join("\n")}\n\nOutput format as JSON with this shape:\n{\n  "overview": string,\n  "days": [\n    { "day": 1, "title": string, "activities": [string, ...] }\n  ],\n  "costs": { "perPerson": number, "total": number, "breakdown": [ {"item": string, "cost": number} ] },\n  "accommodations": [ {"name": string, "location": string, "notes": string} ],\n  "transport": [ {"route": string, "mode": string, "time": string, "notes": string} ],\n  "packingList": [string],\n  "travelTips": [ {"category": string, "tip": string} ],\n  "links": [ {"title": string, "url": string} ]\n}\nIf you cannot produce exact numbers, give reasonable estimates. Always return valid JSON only (no markdown fences).`;

  return { systemPrompt, userContent };
}

export async function createTravelPlan(req, res) {
  try {
    const { errors, cleaned } = validateTravelPlanPayload(req.body || {});
    if (Object.keys(errors).length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const prompt = buildPrompt(cleaned);

    const text = await callGemini(prompt);

    // Try hard to parse JSON even if model returns markdown fences
    let plan;
    const tryParse = (t) => {
      try {
        return JSON.parse(t);
      } catch {
        return null;
      }
    };

    // 1) Direct parse
    plan = tryParse(text);
    if (!plan) {
      // 2) Strip markdown code fences ```json ... ```
      const fenceMatch = text.match(/```(?:json)?\n([\s\S]*?)```/i);
      if (fenceMatch?.[1]) {
        plan = tryParse(fenceMatch[1]);
      }
    }
    if (!plan) {
      // 3) Heuristic: find first { ... last } block
      const first = text.indexOf("{");
      const last = text.lastIndexOf("}");
      if (first !== -1 && last !== -1 && last > first) {
        plan = tryParse(text.slice(first, last + 1));
      }
    }
    if (!plan) {
      plan = { rawText: text };
    }

    return res.json({ ok: true, plan });
  } catch (err) {
    console.error("/api/travel-plan error:", err);
    return res.status(500).json({ ok: false, message: err.message || "Failed to generate travel plan" });
  }
}
