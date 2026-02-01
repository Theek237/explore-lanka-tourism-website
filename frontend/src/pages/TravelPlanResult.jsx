import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { API_BASE } from "../utils/apiBase";
import { SkeletonText } from "../components/Skeleton";

axios.defaults.withCredentials = true;

export default function TravelPlanResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.form;

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");

  const title = useMemo(() => {
    const days = form?.days ? `${form.days}-day` : "";
    const dest = form?.destination?.trim() || "Sri Lanka";
    return `${days ? days + " " : ""}${dest} itinerary`;
  }, [form]);

  useEffect(() => {
    if (!form) return; // No form data; handled below
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.post(`${API_BASE}/api/travel-plan`, form, { timeout: 60000 });
        if (!cancelled) {
          if (res.data?.ok) setPlan(res.data.plan);
          else setError(res.data?.message || "Failed to generate travel plan");
        }
      } catch (e) {
        if (!cancelled) setError(e.response?.data?.message || e.message || "Request failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [form]);

  // If the server fell back to rawText, try to parse JSON client-side as a last resort
  useEffect(() => {
    if (!plan?.rawText) return;
    const text = String(plan.rawText);
    const tryParse = (t) => {
      try { return JSON.parse(t); } catch { return null; }
    };
    let parsed = tryParse(text);
    if (!parsed) {
      const fence = text.match(/```(?:json)?\n([\s\S]*?)```/i);
      if (fence?.[1]) parsed = tryParse(fence[1]);
    }
    if (!parsed) {
      const first = text.indexOf("{");
      const last = text.lastIndexOf("}");
      if (first !== -1 && last > first) parsed = tryParse(text.slice(first, last + 1));
    }
    if (parsed) setPlan(parsed);
  }, [plan]);

  if (!form) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-bgC flex-center">
          <div className="form-card text-center">
            <h1 className="headtext mb-2">Travel Plan</h1>
            <p className="subtext mb-6">Start by telling us about your trip.</p>
            <button className="btn-primary" onClick={() => navigate('/travel-planner')}>Go to Planner</button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-bgC py-10">
        <div className="app-container max-w-5xl mx-auto">
          <header className="mb-6">
            <h1 className="headtext mb-2">Your {title}</h1>
            <p className="subtext">Generated based on your preferences. You can share or print this plan.</p>
          </header>

          {error && (
            <div className="alert-error mb-6">{error}</div>
          )}

          {loading && (
            <div className="bg-white/5 rounded-xl p-6">
              <SkeletonText lines={2} className="mb-4" />
              <SkeletonText lines={7} />
              <p className="text-white/60 mt-4 text-sm">This may take up to 30 seconds.</p>
            </div>
          )}

          {!loading && plan && (
            <div className="space-y-8">
              {plan.overview && (
                <section className="bg-white/5 rounded-xl p-6">
                  <h2 className="font-koulen text-2xl mb-2">Overview</h2>
                  <p className="text-white/80 whitespace-pre-line">{plan.overview}</p>
                </section>
              )}

              {Array.isArray(plan.days) && plan.days.length > 0 && (
                <section className="bg-white/5 rounded-xl p-6">
                  <h2 className="font-koulen text-2xl mb-4">Itinerary</h2>
                  <ol className="space-y-3">
                    {plan.days.map((d, idx) => (
                      <li key={idx} className="bg-white/5 rounded-lg p-4">
                        <div className="font-semibold">Day {d.day}: {d.title}</div>
                        <ul className="list-disc list-inside text-white/80 mt-2">
                          {(d.activities || []).map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {plan.costs && (
                <section className="bg-white/5 rounded-xl p-6">
                  <h2 className="font-koulen text-2xl mb-3">Estimated Costs</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/80">
                    <div>Per Person: <span className="font-semibold">{plan.costs.perPerson}</span></div>
                    <div>Total: <span className="font-semibold">{plan.costs.total}</span></div>
                  </div>
                  {Array.isArray(plan.costs.breakdown) && plan.costs.breakdown.length > 0 && (
                    <ul className="list-disc list-inside text-white/80 mt-2">
                      {plan.costs.breakdown.map((b, i) => (
                        <li key={i}>{b.item}: {b.cost}</li>
                      ))}
                    </ul>
                  )}
                </section>
              )}

              {Array.isArray(plan.accommodations) && plan.accommodations.length > 0 && (
                <section className="bg-white/5 rounded-xl p-6">
                  <h2 className="font-koulen text-2xl mb-3">Accommodations</h2>
                  <ul className="list-disc list-inside text-white/80">
                    {plan.accommodations.map((a, i) => (
                      <li key={i}><span className="font-semibold">{a.name}</span> — {a.location} <span className="text-white/60">{a.notes}</span></li>
                    ))}
                  </ul>
                </section>
              )}

              {Array.isArray(plan.transport) && plan.transport.length > 0 && (
                <section className="bg-white/5 rounded-xl p-6">
                  <h2 className="font-koulen text-2xl mb-3">Transport</h2>
                  <ul className="list-disc list-inside text-white/80">
                    {plan.transport.map((t, i) => (
                      <li key={i}><span className="font-semibold">{t.route}</span> — {t.mode} ({t.time}) <span className="text-white/60">{t.notes}</span></li>
                    ))}
                  </ul>
                </section>
              )}

              {Array.isArray(plan.packingList) && plan.packingList.length > 0 && (
                <section className="bg-white/5 rounded-xl p-6">
                  <h2 className="font-koulen text-2xl mb-3">Packing List</h2>
                  <ul className="list-disc list-inside text-white/80">
                    {plan.packingList.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </section>
              )}

              {Array.isArray(plan.links) && plan.links.length > 0 && (
                <section className="bg-white/5 rounded-xl p-6">
                  <h2 className="font-koulen text-2xl mb-3">Helpful Links</h2>
                  <ul className="list-disc list-inside text-blue-300">
                    {plan.links.map((l, i) => (
                      <li key={i}><a href={l.url} target="_blank" rel="noreferrer" className="hover:underline">{l.title || l.url}</a></li>
                    ))}
                  </ul>
                </section>
              )}

              {plan.rawText && (
                <section className="bg-white/5 rounded-xl p-6">
                  <h2 className="font-koulen text-2xl mb-3">Plan</h2>
                  <pre className="text-white/80 whitespace-pre-wrap text-sm">{plan.rawText}</pre>
                </section>
              )}

              <div className="flex gap-3 justify-end">
                <button className="btn-secondary" onClick={() => window.print()}>Print</button>
                <button className="btn-secondary" onClick={() => {
                  if (navigator.share) navigator.share({ title: 'Your Travel Plan', text: 'Check out my travel plan!' }).catch(() => {});
                }}>Share</button>
                <button className="btn-primary" onClick={() => navigate('/travel-planner', { state: { form } })}>Edit Details</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
