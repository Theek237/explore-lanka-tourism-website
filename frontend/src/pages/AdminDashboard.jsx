import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useAdminAuth } from "../context/AdminAuthContext";

function AdminDashboard() {
  const {
    adminUser,
    isAdminAuthenticated,
    logout: adminLogout,
  } = useAdminAuth();
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    coordinates: { lat: "", lng: "" },
  });

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchLocations();
    }
  }, [isAdminAuthenticated]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/locations");
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      } else {
        throw new Error("Failed to fetch locations");
      }
    } catch (error) {
      setError("Failed to load locations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "lat" || name === "lng") {
      setForm((prev) => ({
        ...prev,
        coordinates: { ...prev.coordinates, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
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

      const token = localStorage.getItem("adminToken");
      const url = editingLocation
        ? `http://localhost:5000/api/locations/${editingLocation.id}`
        : "http://localhost:5000/api/locations";
      const method = editingLocation ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(locationData),
      });

      if (response.ok) {
        await fetchLocations();
        setShowForm(false);
        setEditingLocation(null);
        setForm({
          name: "",
          description: "",
          image: "",
          coordinates: { lat: "", lng: "" },
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save location");
      }
    } catch (error) {
      setError("Failed to save location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (location) => {
    setEditingLocation(location);
    setForm({
      name: location.name,
      description: location.description,
      image: location.image || "",
      coordinates: {
        lat: location.coordinates?.lat || "",
        lng: location.coordinates?.lng || "",
      },
    });
    setShowForm(true);
  };

  const handleDelete = async (locationId, locationName) => {
    if (!window.confirm(`Are you sure you want to delete "${locationName}"?`)) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/api/locations/${locationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchLocations();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete location");
      }
    } catch (error) {
      setError("Failed to delete location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingLocation(null);
    setForm({
      name: "",
      description: "",
      image: "",
      coordinates: { lat: "", lng: "" },
    });
    setError("");
  };

  const handleLogout = () => {
    adminLogout();
  };

  if (!isAdminAuthenticated) {
    return null; // Will redirect
  }

  if (loading && locations.length === 0) {
    return (
      <div className="min-h-screen bgC flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bgC">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="headtext text-white mb-4">Admin Dashboard</h1>
          <div className="flex justify-between items-center">
            <p className="subtext text-gray-300">
              Welcome, {adminUser?.firstName} {adminUser?.lastName}
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors text-white font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/20 border border-red-600 text-red-400 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Add/Edit Location Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blueC hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Add New Location
          </button>
        </div>

        {/* Add/Edit Location Form */}
        {showForm && (
          <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600">
            <h3 className="headtext text-white mb-4">
              {editingLocation ? "Edit Location" : "Add New Location"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block subtext text-gray-300 mb-1">
                  Location Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter location name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueC focus:border-blueC text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block subtext text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  placeholder="Enter location description"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueC focus:border-blueC resize-none text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block subtext text-gray-300 mb-1">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueC focus:border-blueC text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block subtext text-gray-300 mb-1">
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
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueC focus:border-blueC text-white placeholder-gray-400"
                  />
                  <input
                    type="number"
                    name="lng"
                    placeholder="Longitude"
                    value={form.coordinates.lng}
                    onChange={handleInputChange}
                    step="any"
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueC focus:border-blueC text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blueC hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editingLocation
                    ? "Update Location"
                    : "Save Location"}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blueC"></div>
            <p className="mt-2 text-gray-400">Loading...</p>
          </div>
        )}

        {/* Locations List */}
        {!loading && (
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-600">
            <div className="px-6 py-4 bg-gray-700">
              <h2 className="headtext text-white">Manage Locations</h2>
            </div>
            <div className="p-6">
              {locations.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🏝️</div>
                  <h3 className="headtext text-gray-300 mb-2">
                    No locations yet
                  </h3>
                  <p className="subtext text-gray-400">
                    Add your first location to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className="bg-gray-700 p-4 rounded-lg border border-gray-600 flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <h4 className="subtext font-semibold text-white mb-1">
                          {location.name}
                        </h4>
                        <p className="text-gray-300 text-sm mb-2">
                          {location.description.substring(0, 100)}
                          {location.description.length > 100 && "..."}
                        </p>
                        {location.coordinates?.lat &&
                          location.coordinates?.lng && (
                            <p className="text-gray-400 text-xs">
                              📍 {location.coordinates.lat},{" "}
                              {location.coordinates.lng}
                            </p>
                          )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(location)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(location.id, location.name)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
