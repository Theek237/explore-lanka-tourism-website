import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-bgC text-white">
      <NavBar />
      <main>
        {/* Hero */}
        <section className="app-container pt-14 pb-10">
          <div className="text-center">
            <h1 className="font-koulen text-5xl md:text-7xl tracking-tight mb-4 heading-gradient">
              Welcome back, Explorer
            </h1>
            <p className="subtext max-w-2xl mx-auto">
              Pick up where you left off, plan a new trip, or jump straight into
              Sri Lanka’s best spots.
            </p>
          </div>
        </section>

        {/* Stats + Quick actions */}
        <section className="app-container">
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="text-white/60 text-sm">Visited locations</div>
              <div className="mt-2 font-koulen text-4xl">0</div>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="text-white/60 text-sm">Saved plans</div>
              <div className="mt-2 font-koulen text-4xl">0</div>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="text-white/60 text-sm">Days planned</div>
              <div className="mt-2 font-koulen text-4xl">0</div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-16">
            <Link to="/travel-planner" className="group bg-gradient-to-br from-slate-800/70 to-slate-900 border border-slate-700/60 rounded-xl p-6 hover:-translate-y-1 hover:border-slate-600 transition-all duration-300 block">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-blueC/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🧭</span>
                </div>
                <div>
                  <h3 className="font-koulen text-2xl text-white group-hover:text-blueC transition-colors">Plan a Trip</h3>
                  <p className="text-white/70">Get a tailored itinerary based on your dates, budget, and interests.</p>
                </div>
              </div>
              <div className="text-blue-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Start planning →</div>
            </Link>

            <Link to="/locations" className="group bg-gradient-to-br from-slate-800/70 to-slate-900 border border-slate-700/60 rounded-xl p-6 hover:-translate-y-1 hover:border-slate-600 transition-all duration-300 block">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-blueC/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🗺️</span>
                </div>
                <div>
                  <h3 className="font-koulen text-2xl text-white group-hover:text-blueC transition-colors">Browse Locations</h3>
                  <p className="text-white/70">Explore beaches, hill country escapes, and cultural hotspots.</p>
                </div>
              </div>
              <div className="text-blue-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Explore now →</div>
            </Link>
          </div>
        </section>

        {/* Highlights */}
        <section className="app-container pb-16">
          <h2 className="font-koulen text-3xl text-blueC mb-6 text-center">Popular themes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-blueC/20 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">�️</span></div>
              <h3 className="font-koulen text-lg mb-2">Cultural Sites</h3>
              <p className="text-white/70 text-sm">Ancient cities, temples, and UNESCO heritage spots.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">🌴</span></div>
              <h3 className="font-koulen text-lg mb-2">Nature & Beaches</h3>
              <p className="text-white/70 text-sm">From surf towns to misty tea country and waterfalls.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">🐘</span></div>
              <h3 className="font-koulen text-lg mb-2">Wildlife</h3>
              <p className="text-white/70 text-sm">Safaris, whale watching, and birding adventures.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
