import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { validateTravelPlan } from "../utils/travelPlanValidation";
 

const INTERESTS = [
  "museums",
  "hiking",
  "food",
  "nightlife",
  "architecture",
  "family-friendly",
  "accessibility",
  "relaxation",
  "adventure",
];

const TRAVELER_TYPES = ["adult", "child", "senior"];

export default function TravelPlanner() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    destination: "",
    days: 5,
    travelers: 2,
    travelerTypes: [],
    interests: [],
    interestsText: "",
    budget: "",
    travelStyle: "moderate",
    startDate: "",
    constraints: "",
  });
  const [errors, setErrors] = useState({});
 

  const canSubmit = useMemo(() => {
    const { errors: e } = validateTravelPlan(form);
    return Object.keys(e).length === 0;
  }, [form]);

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function toggleArrayValue(name, value) {
    setForm((f) => {
      const arr = new Set(f[name] || []);
      if (arr.has(value)) arr.delete(value);
      else arr.add(value);
      return { ...f, [name]: Array.from(arr) };
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { errors: validationErrors } = validateTravelPlan(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;
    // Navigate to result page and let it call the API
    navigate('/travel-planner/result', { state: { form } });
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-bgC py-12">
        <div className="app-container">
          {/* Hero header */}
          <div className="mb-8 text-center">
            <h1 className="headtext mb-3">Travel Planner</h1>
            <p className="subtext max-w-2xl mx-auto">Answer a few quick questions and we'll craft a tailored itinerary that matches your pace, budget, and interests.</p>
          </div>

          {/* Form Card */}
          <div className="flex justify-center">
          <section className="form-card w-full max-w-3xl animate-fade-up">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Trip basics */}
              <div>
                <h2 className="font-koulen text-xl mb-4">Trip basics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="label">Destination (optional)</label>
                    <input
                      className="input"
                      type="text"
                      placeholder="e.g., Kandy, Galle, Ella"
                      value={form.destination}
                      onChange={(e) => updateField("destination", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">Trip length (days)</label>
                    <input
                      className="input"
                      type="number"
                      min={1}
                      max={60}
                      value={form.days}
                      onChange={(e) => updateField("days", Number(e.target.value))}
                    />
                    {errors.days && <p className="text-red-400 text-xs mt-1">{errors.days}</p>}
                  </div>
                  <div>
                    <label className="label">Number of travelers</label>
                    <input
                      className="input"
                      type="number"
                      min={1}
                      max={20}
                      value={form.travelers}
                      onChange={(e) => updateField("travelers", Number(e.target.value))}
                    />
                    {errors.travelers && <p className="text-red-400 text-xs mt-1">{errors.travelers}</p>}
                  </div>
                </div>
              </div>

              {/* Travelers */}
              <div>
                <h2 className="font-koulen text-xl mb-4">Travelers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {TRAVELER_TYPES.map((t) => (
                    <label key={t} className="inline-flex items-center gap-2 bg-white/5 rounded-md px-3 py-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.travelerTypes.includes(t)}
                        onChange={() => toggleArrayValue("travelerTypes", t)}
                      />
                      <span className="capitalize">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h2 className="font-koulen text-xl mb-4">Interests & preferences</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                  {INTERESTS.map((i) => (
                    <label key={i} className="inline-flex items-center gap-2 bg-white/5 rounded-md px-3 py-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.interests.includes(i)}
                        onChange={() => toggleArrayValue("interests", i)}
                      />
                      <span className="capitalize">{i.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
                <textarea
                  className="input min-h-[90px]"
                  placeholder="Anything else we should know?"
                  value={form.interestsText}
                  onChange={(e) => updateField("interestsText", e.target.value)}
                />
              </div>

              {/* Budget & Style */}
              <div>
                <h2 className="font-koulen text-xl mb-4">Budget & style</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Budget (per person or total)</label>
                    <input
                      className="input"
                      type="text"
                      inputMode="decimal"
                      placeholder="e.g., LKR 80,000 per person"
                      value={form.budget}
                      onChange={(e) => updateField("budget", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">Travel style</label>
                    <select
                      className="input"
                      value={form.travelStyle}
                      onChange={(e) => updateField("travelStyle", e.target.value)}
                    >
                      <option value="relaxed">Relaxed</option>
                      <option value="moderate">Moderate</option>
                      <option value="packed">Packed</option>
                    </select>
                    {errors.travelStyle && <p className="text-red-400 text-xs mt-1">{errors.travelStyle}</p>}
                  </div>
                </div>
              </div>

              {/* Timing & constraints */}
              <div>
                <h2 className="font-koulen text-xl mb-4">Timing & constraints</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Start date or earliest window (optional)</label>
                    <input
                      className="input"
                      type="text"
                      placeholder="e.g., 2025-01-10 or March 2025"
                      value={form.startDate}
                      onChange={(e) => updateField("startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">Hard constraints (optional)</label>
                    <textarea
                      className="input min-h-[90px]"
                      placeholder="Diet, mobility, must-see items..."
                      value={form.constraints}
                      onChange={(e) => updateField("constraints", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button type="button" className="btn-secondary" onClick={() => setForm({
                  destination: "",
                  days: 5,
                  travelers: 2,
                  travelerTypes: [],
                  interests: [],
                  interestsText: "",
                  budget: "",
                  travelStyle: "moderate",
                  startDate: "",
                  constraints: "",
                })}>
                  Reset
                </button>
                <button type="submit" className="btn-primary" disabled={!canSubmit}>
                  Generate Plan
                </button>
              </div>
            </form>
          </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
