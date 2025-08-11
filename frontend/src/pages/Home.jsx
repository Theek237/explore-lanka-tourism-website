import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { authenticated, ready } = useAuth();
  const navigate = useNavigate();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    if (ready && authenticated) navigate("/dashboard");
  }, [ready, authenticated, navigate]);

  useGSAP(() => {
    gsap.from(titleRef.current, {
      yPercent: 50,
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
    });

    gsap.from([subtitleRef.current, buttonRef.current], {
      opacity: 0,
      delay: 1,
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.1,
    });
  }, []);

  return (
    <>
      <div
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/sigiriyahero.png')" }}
      >
        <NavBar />
        <div className="flex flex-col items-center container mx-auto text-center">
          <h1
            ref={titleRef}
            className="font-koulen text-5xl px-8 md:text-7xl pt-60 tracking-tight"
          >
            YOUR SRI LANKAN ADVENTURE BEGINS
          </h1>
          <p ref={subtitleRef} className="font-segoe text-sm md:text-base">
            A land of ancient ruins, misty mountains, and golden beaches is
            waiting. Let's start planning your unforgettable journey.
          </p>
          <button
            ref={buttonRef}
            aria-label="Start Your Journey"
            onClick={() => navigate("/login")}
            className="bg-blueC text-black font-semibold py-3 mt-5 px-4 rounded transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Start Your Journey
          </button>
        </div>
      </div>

      <div className="h-screen">
        <div className="flex flex-col text-center pt-8">
          <h2 className="text-6xl font-koulen tracking-tight leading-12">
            Know before you go
            <br />
            <span className="text-blueC">Sri Lanka</span> awaits.
          </h2>
          <div className="mt-10 flex mx-auto relative items-center">
            <img
              src="/images/Ellipse 1.png"
              alt="Decorative ellipse background left"
              className="absolute z-1 -left-35 -top-30 scale-200"
            />
            <img
              src="/images/Ellipse 2.png"
              alt="Decorative ellipse background right"
              className="absolute z-1 -right-35 top-40 scale-200"
            />
            <img
              src="/images/forthome.png"
              alt="Sri Lankan fort"
              className="absolute h-[297px] w-[201.77px] z-8 -left-44"
            />
            <img
              src="/images/elephant.png"
              alt="Sri Lankan elephant"
              className="h-[419px] w-[256.35px] z-10"
            />
            <img
              src="/images/train.png"
              alt="Sri Lankan train"
              className="absolute h-[297px] w-[201.77px] z-8 -right-44"
            />
          </div>
          <p className="text-sm opacity-80 px-10 md:px-40 mt-6 leading-4">
            Whether you're chasing the sun on pristine coastlines, seeking
            encounters with majestic wildlife, or riding through
            <br /> breathtaking highlands, every moment is a memory.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
