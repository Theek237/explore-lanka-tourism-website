import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import LocationDetailSkeleton from "../components/LocationDetailSkeleton";

axios.defaults.withCredentials = true;

function LocationDetail() {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const { identifier } = useParams();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/locations/${identifier}`
        );
        if (active) {
          setLocation(res.data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message || "Failed to load location details"
          );
        }
      } finally {
        active && setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [identifier]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-bgC">
          <LocationDetailSkeleton />
        </div>
      </>
    );
  }

  if (error || !location) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center bg-bgC px-4">
          <div className="max-w-md text-center">
            <p className="text-red-400 mb-4">{error || "Location not found"}</p>
            <Link
              to="/locations"
              className="text-blue-300 hover:underline font-semibold"
            >
              ← Back to locations
            </Link>
          </div>
        </div>
      </>
    );
  }

  const gallery =
    Array.isArray(location.images) && location.images.length
      ? location.images
      : location.image
      ? [location.image]
      : [];

  const hasCoords =
    location.coordinates &&
    typeof location.coordinates.lat === "number" &&
    typeof location.coordinates.lng === "number";

  const mapSrc = hasCoords
    ? `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}&hl=en&z=10&output=embed`
    : null;

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-bgC text-gray-100 pb-16">
        <div className="max-w-5xl mx-auto px-4 pt-8">
          <div className="mb-6 flex items-center gap-3 text-sm">
            <Link
              to="/locations"
              className="text-blue-300 hover:underline font-medium"
            >
              ← All Locations
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-400 truncate max-w-[50%]">
              {location.name}
            </span>
          </div>

          <h1 className="font-koulen text-4xl md:text-5xl mb-6 text-blueC leading-none">
            {location.name}
          </h1>

          {gallery.length > 0 && (
            <div className="grid gap-4 mb-10 md:grid-cols-3">
              <div className="md:col-span-2 relative rounded-xl overflow-hidden">
                <img
                  src={gallery[0]}
                  alt={location.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>
              <div className="grid gap-4">
                {gallery.slice(1, 3).map((img, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl overflow-hidden h-38 md:h-38"
                  >
                    <img
                      src={img}
                      alt={location.name + " " + (i + 2)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="prose prose-invert max-w-none mb-10">
            <p className="text-gray-200 leading-relaxed whitespace-pre-line">
              {location.description}
            </p>
            {location.createdAt && (
              <p className="mt-4 text-xs text-gray-500">
                Added {new Date(location.createdAt).toLocaleString()}
              </p>
            )}
            {hasCoords && (
              <p className="mt-1 text-xs text-gray-500">
                Coordinates: {location.coordinates.lat.toFixed(4)},{" "}
                {location.coordinates.lng.toFixed(4)}
              </p>
            )}
          </div>

          {hasCoords && (
            <div className="mb-12">
              <h2 className="font-koulen text-2xl mb-4 text-blueC">
                Location Map
              </h2>
              <div className="rounded-xl overflow-hidden border border-gray-700 shadow">
                <iframe
                  title="Google Map"
                  src={mapSrc}
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-80"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          )}

          <div className="pt-4">
            <Link
              to="/locations"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200 transition-colors"
            >
              ← Back to Locations
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationDetail;
