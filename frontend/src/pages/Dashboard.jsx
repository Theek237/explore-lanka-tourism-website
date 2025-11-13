import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Dashboard() {
  return (
    //#
    <div className="min-h-screen bg-bgC text-white">
      <NavBar />
      <div className="container mx-auto px-4 pt-16">
        <div className="text-center mb-16">
          <h1 className="font-koulen text-6xl md:text-8xl tracking-tight mb-6 bg-gradient-to-r from-blueC to-blue-300 bg-clip-text text-transparent">
            Welcome Back, Explorer...
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Your Sri Lankan adventure awaits. Discover hidden gems, plan your
            perfect itinerary, and explore the pearl of the Indian Ocean.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-koulen text-4xl text-blueC mb-10 text-center">
            Quick Actions
          </h2>
          <div className="flex justify-center">
            <Link
              to="/locations"
              className="group bg-gradient-to-br from-slate-800/70 to-slate-900 border border-slate-700/60 rounded-xl p-8 hover:-translate-y-1 hover:border-slate-600 transition-all duration-300 block max-w-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blueC/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🗺️</span>
                </div>
                <div>
                  <h3 className="font-koulen text-xl text-white group-hover:text-blueC transition-colors">
                    Browse Locations
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Discover amazing destinations across Sri Lanka
                  </p>
                </div>
              </div>
              <div className="text-blue-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Explore now →
              </div>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="font-koulen text-4xl text-blueC mb-10 text-center">
            What You Can Do
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blueC/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏛️</span>
              </div>
              <h3 className="font-koulen text-lg text-white mb-2">
                Cultural Sites
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Explore ancient temples, historical monuments, and UNESCO World
                Heritage sites
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌴</span>
              </div>
              <h3 className="font-koulen text-lg text-white mb-2">
                Natural Wonders
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Discover pristine beaches, lush rainforests, and breathtaking
                mountain landscapes
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🐘</span>
              </div>
              <h3 className="font-koulen text-lg text-white mb-2">
                Wildlife Adventures
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Encounter elephants, leopards, and exotic birds in their natural
                habitats
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pb-16">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-blueC/10 to-blue-300/10 border border-blueC/30 rounded-xl p-8">
            <h3 className="font-koulen text-2xl text-white mb-3">
              Ready to Explore?
            </h3>
            <p className="text-gray-300 mb-6">
              Start your journey by browsing our curated collection of Sri
              Lankan destinations.
            </p>
            <Link
              to="/locations"
              className="inline-flex items-center gap-2 bg-blueC text-black font-semibold py-3 px-6 rounded-lg hover:bg-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <span>View All Locations</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
