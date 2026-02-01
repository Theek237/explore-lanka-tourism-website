import { Link } from "react-router-dom";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

// Featured destinations data
const featuredDestinations = [
  {
    name: "Sigiriya",
    description: "Ancient rock fortress rising 200m above the jungle",
    image: "/images/sigiriyahero.png",
    tag: "UNESCO Heritage",
  },
  {
    name: "Ella",
    description: "Scenic hill country with iconic Nine Arch Bridge",
    image: "/images/train.png",
    tag: "Hill Country",
  },
  {
    name: "Galle Fort",
    description: "Colonial charm meets coastal beauty",
    image: "/images/forthome.png",
    tag: "Historical",
  },
];

// Experience categories
const experiences = [
  {
    icon: "🏛️",
    title: "Cultural Heritage",
    description: "Ancient cities, sacred temples, and UNESCO World Heritage sites spanning over 2,500 years of history",
    color: "from-amber-500/20 to-orange-600/10",
    border: "border-amber-500/30",
    count: "8 Sites",
  },
  {
    icon: "🏖️",
    title: "Pristine Beaches",
    description: "From the surf breaks of Arugam Bay to the golden sands of Unawatuna and Mirissa",
    color: "from-cyan-500/20 to-blue-600/10",
    border: "border-cyan-500/30",
    count: "15+ Beaches",
  },
  {
    icon: "🌿",
    title: "Nature & Wildlife",
    description: "Leopard safaris in Yala, whale watching in Mirissa, and elephant gatherings in Minneriya",
    color: "from-emerald-500/20 to-green-600/10",
    border: "border-emerald-500/30",
    count: "12 Parks",
  },
  {
    icon: "🚂",
    title: "Scenic Railways",
    description: "One of the world's most beautiful train journeys through misty tea plantations",
    color: "from-purple-500/20 to-indigo-600/10",
    border: "border-purple-500/30",
    count: "3 Routes",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);
  const destinationsRef = useRef(null);
  const experiencesRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Hero animations
    tl.from(".hero-title", { y: 60, opacity: 0, duration: 1 })
      .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");

    // Stats cards stagger
    tl.from(".stat-card", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
    }, "-=0.3");

    // Action cards
    tl.from(".action-card", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
    }, "-=0.3");

    // Destinations
    gsap.from(".destination-card", {
      scrollTrigger: {
        trigger: ".destinations-section",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    });

    // Experiences
    gsap.from(".experience-card", {
      scrollTrigger: {
        trigger: ".experiences-section",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
    });
  }, []);

  const firstName = user?.name?.split(' ')[0] || 'Explorer';

  return (
    <div className="min-h-screen bg-bgC text-white overflow-x-hidden">
      <NavBar />
      
      <main>
        {/* Hero Section with Background */}
        <section 
          ref={heroRef}
          className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        >
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-transparent to-[#0c0c0c] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c]/90 via-[#0c0c0c]/40 to-[#0c0c0c]/90 z-10" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blueC/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blueC/5 rounded-full blur-3xl" />
          </div>

          {/* Hero content */}
          <div className="relative z-20 app-container text-center py-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 hero-cta">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-white/70">Ready to explore</span>
            </div>
            
            <h1 className="hero-title font-koulen text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6">
              <span className="text-white">Welcome back,</span>
              <br />
              <span className="heading-gradient">{firstName}</span>
            </h1>
            
            <p className="hero-subtitle text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Your next adventure in Sri Lanka awaits. Discover ancient wonders, 
              pristine beaches, and unforgettable experiences.
            </p>

            <div className="hero-cta flex flex-wrap justify-center gap-4">
              <Link to="/travel-planner" className="btn-primary text-base px-8 py-4 shadow-lg shadow-blueC/25">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Plan Your Trip
              </Link>
              <Link to="/locations" className="btn-secondary text-base px-8 py-4 flex items-center gap-2">
                Explore Locations
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c0c0c] to-transparent z-10" />
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="app-container -mt-10 relative z-30 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Destinations", value: "50+", icon: "📍" },
              { label: "Experiences", value: "100+", icon: "✨" },
              { label: "Happy Travelers", value: "10K+", icon: "😊" },
              { label: "5-Star Reviews", value: "4.9", icon: "⭐" },
            ].map((stat, i) => (
              <div key={i} className="stat-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6 hover:border-blueC/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blueC/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <span className="text-2xl mb-2 block">{stat.icon}</span>
                  <div className="font-koulen text-3xl md:text-4xl text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section ref={cardsRef} className="app-container mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-koulen text-3xl md:text-4xl">
              <span className="text-white">Quick</span>{" "}
              <span className="text-blueC">Actions</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/travel-planner" className="action-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blueC/20 via-cyan-600/10 to-transparent border border-blueC/20 p-8 hover:border-blueC/40 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blueC/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blueC/20 transition-all duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-blueC/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-blueC" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="font-koulen text-2xl md:text-3xl text-white mb-3 group-hover:text-blueC transition-colors">
                  AI Travel Planner
                </h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Get a personalized itinerary crafted by AI based on your preferences, budget, and travel dates.
                </p>
                <div className="inline-flex items-center gap-2 text-blueC font-medium">
                  Start Planning
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link to="/locations" className="action-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-green-600/10 to-transparent border border-emerald-500/20 p-8 hover:border-emerald-500/40 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-koulen text-2xl md:text-3xl text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  Explore Destinations
                </h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Browse through curated locations featuring beaches, mountains, ancient ruins, and hidden gems.
                </p>
                <div className="inline-flex items-center gap-2 text-emerald-400 font-medium">
                  View All Locations
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Featured Destinations */}
        <section ref={destinationsRef} className="destinations-section app-container mb-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blueC/10 border border-blueC/20 text-blueC text-sm font-medium mb-4">
              Featured Destinations
            </span>
            <h2 className="font-koulen text-4xl md:text-5xl mb-4">
              <span className="text-white">Iconic Places to</span>{" "}
              <span className="heading-gradient">Discover</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              From ancient rock fortresses to colonial-era charm, these destinations define the Sri Lankan experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredDestinations.map((dest, i) => (
              <Link 
                to="/locations" 
                key={i} 
                className="destination-card group relative h-80 rounded-2xl overflow-hidden"
              >
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${dest.image})` }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/90">
                  {dest.tag}
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-koulen text-2xl text-white mb-2 group-hover:text-blueC transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2">
                    {dest.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-blueC opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium">Explore</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Experience Categories */}
        <section ref={experiencesRef} className="experiences-section relative py-20 mb-10">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blueC/5 to-transparent" />
          
          <div className="app-container relative">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium mb-4">
                Curated Experiences
              </span>
              <h2 className="font-koulen text-4xl md:text-5xl mb-4">
                <span className="text-white">What Will You</span>{" "}
                <span className="heading-gradient">Experience?</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Sri Lanka packs incredible diversity into a small island. Choose your adventure.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {experiences.map((exp, i) => (
                <div 
                  key={i}
                  className={`experience-card group relative overflow-hidden rounded-2xl bg-gradient-to-br ${exp.color} border ${exp.border} p-6 hover:border-opacity-60 transition-all duration-500 hover:-translate-y-1`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="text-4xl mb-4">{exp.icon}</div>
                    <div className="text-xs text-white/50 mb-2">{exp.count}</div>
                    <h3 className="font-koulen text-xl text-white mb-2">{exp.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="app-container mb-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blueC/20 via-cyan-600/10 to-blueC/20 border border-blueC/20 p-10 md:p-16">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blueC/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            
            <div className="relative text-center">
              <h2 className="font-koulen text-3xl md:text-5xl text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-8">
                Let our AI craft the perfect Sri Lankan adventure tailored just for you.
              </p>
              <Link to="/travel-planner" className="btn-primary text-lg px-10 py-4 shadow-lg shadow-blueC/30">
                Create Your Itinerary
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
