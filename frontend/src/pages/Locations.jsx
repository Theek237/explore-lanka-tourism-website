import axios from "axios";
import { useEffect, useState } from "react";
import LocationCard from "../components/LocationCard";
import NavBar from "../components/NavBar";

// Configure axios defaults
axios.defaults.withCredentials = true;

function Locations() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/locations");
      if (Array.isArray(res.data)) {
        setLocations(res.data);
        setError(null);
      } else {
        setLocations([]);
        setError("API did not return an array. Check backend.");
      }
    } catch (err) {
      setError(
        `Failed to fetch locations: ${
          err.response?.data?.message || err.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-bgC py-8">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="headtext">
              Discover <span className="text-white">Sri Lanka</span>
            </h1>
            <p className="subtext">
              Explore the beautiful locations across the Pearl of the Indian
              Ocean
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 max-w-2xl mx-auto">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blueC"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {/* Locations Grid */}
          {!loading && (
            <>
              {locations.length === 0 ? (
                <div className="text-center flex-center py-12">
                  <div className="text-6xl mb-4">🏝️</div>
                  <h3 className="font-koulen text-2xl text-gray-700 mb-2">
                    No locations yet
                  </h3>
                  <p className="font-segoe text-gray-500">
                    Check back soon for amazing Sri Lankan destinations!
                  </p>
                </div>
              ) : (
                <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center place-items-center">
                  {Array.isArray(locations) &&
                    locations.map((loc) => (
                      <LocationCard key={loc.id || loc.slug} location={loc} />
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Locations;
