import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <NavBar />
      <div>
        <img src="#" alt="Hero image" />
        <h1>Discover The Wonders of Sri Lanka</h1>
        <p>
          Explore the rich culture, breath taking landscapes, and vibrant
          traditions of this island paradise.
        </p>
        <button>Plan your Advanture</button>
      </div>

      <div>
        <h2>
          Know before you go: <span>Sri Lanka</span> awaits.
        </h2>
        <img src="#" alt="image1" />
        <img src="#" alt="image2" />
      </div>

      <div>
        <img src="#" alt="backdrop" />
        <h1>
          What are you waiting for? <span>Join Us</span> Now!
        </h1>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
