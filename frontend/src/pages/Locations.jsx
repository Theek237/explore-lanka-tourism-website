import axios from "axios";
import { useEffect, useState } from "react";
import LocationCard from "../components/LocationCard";
import NavBar from "../components/NavBar";

// Configure axios defaults
axios.defaults.withCredentials = true;

function Locations() {
  const [locations, setLocations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    coordinates: { lat: "", lng: "" },
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/locations");
      if (Array.isArray(res.data)) {
        setLocations(res.data);
        setError(null);
        console.log("Fetched locations:", res.data);
      } else {
        setLocations([]);
        setError("API did not return an array. Check backend.");
        console.error("API did not return an array:", res.data);
      }
    } catch (err) {
      setError(
        `Failed to fetch locations: ${
          err.response?.data?.message || err.message
        }`
      );
      console.error("Failed to fetch locations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description) return;

    setLoading(true);
    try {
      const locationData = {
        name: form.name,
        description: form.description,
        image: form.image || undefined,
        coordinates:
          form.coordinates.lat && form.coordinates.lng
            ? {
                lat: parseFloat(form.coordinates.lat),
                lng: parseFloat(form.coordinates.lng),
              }
            : undefined,
      };

      const res = await axios.post(
        "http://localhost:5000/api/locations",
        locationData
      );
      setLocations((prev) => [...prev, res.data]);
      setForm({
        name: "",
        description: "",
        image: "",
        coordinates: { lat: "", lng: "" },
      });
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError(
        `Failed to add location: ${err.response?.data?.message || err.message}`
      );
      console.error("Failed to add location:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "lat" || name === "lng") {
      setForm((prev) => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: value,
        },
      }));
    } else {
      setForm({ ...form, [name]: value });
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

          {/* Add Function -  no need here */}
          <div className="text-center mb-8 space-x-4">
            <button
              onClick={() => setShowForm((v) => !v)}
              className="bg-blueC text-black font-semibold py-3 px-6 rounded-lg transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {showForm ? "Cancel" : "Add New Location"}
            </button>
          </div>

          {/* Add Location Form */}
          {showForm && (
            <div className="max-w-md mx-auto mb-8 bg-white p-6 rounded-lg shadow-md border">
              <h3 className="font-koulen text-2xl mb-4 text-center text-gray-800">
                Add New Location
              </h3>
              <form onSubmit={handleAddLocation} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter location name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueC text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter location description"
                    value={form.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueC resize-none text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL (optional)
                  </label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueC text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coordinates (optional)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      name="lat"
                      placeholder="Latitude"
                      value={form.coordinates.lat}
                      onChange={handleInputChange}
                      step="any"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueC text-gray-900 placeholder-gray-500"
                    />
                    <input
                      type="number"
                      name="lng"
                      placeholder="Longitude"
                      value={form.coordinates.lng}
                      onChange={handleInputChange}
                      step="any"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueC text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blueC text-black font-semibold py-3 px-4 rounded-lg transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Location"}
                </button>
              </form>
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
                    Be the first to add a beautiful Sri Lankan location!
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
