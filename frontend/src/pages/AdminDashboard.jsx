import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAdminAuth } from "../context/AdminAuthContext";
import { API_BASE } from "../utils/apiBase";

function AdminDashboard() {
  const {
    adminUser,
    isAdminAuthenticated,
    adminLogout,
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
  const response = await fetch(`${API_BASE}/api/locations`);
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      } else {
        throw new Error("Failed to fetch locations");
      }
    } catch {
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
        ? `${API_BASE}/api/locations/${editingLocation.id}`
        : `${API_BASE}/api/locations`;
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
    } catch {
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
        `${API_BASE}/api/locations/${locationId}`,
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
    } catch {
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
    <div className="min-h-screen bg-bgC flex flex-col">
      <NavBar />

      <div className="app-container flex-1 py-10">
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
        <div className="mb-8 flex items-center gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Add New Location
          </button>
          <button
            onClick={fetchLocations}
            className="btn-secondary"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Add/Edit Location Form */}
        {showForm && (
          <div className="mb-10 form-card animate-fade-up">
            <h3 className="heading-xl font-koulen text-white mb-6 text-3xl">
              {editingLocation ? "Edit Location" : "Add New Location"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="label mb-1 block">Location Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter location name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>
                <div>
                  <label className="label mb-1 block">Description *</label>
                  <textarea
                    name="description"
                    placeholder="Enter location description"
                    value={form.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="textarea"
                  />
                </div>
                <div>
                  <label className="label mb-1 block">Image URL (optional)</label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label mb-1 block">Coordinates (optional)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      name="lat"
                      placeholder="Latitude"
                      value={form.coordinates.lat}
                      onChange={handleInputChange}
                      step="any"
                      className="input"
                    />
                    <input
                      type="number"
                      name="lng"
                      placeholder="Longitude"
                      value={form.coordinates.lng}
                      onChange={handleInputChange}
                      step="any"
                      className="input"
                    />
                  </div>
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
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
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="surface p-4 rounded-lg flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <div className="skel skel-line w-1/3 mb-2" />
                  <div className="skel skel-line w-5/6 mb-2" />
                  <div className="skel skel-line w-2/3" />
                </div>
                <div className="flex flex-col gap-2 w-28">
                  <div className="skel skel-line" />
                  <div className="skel skel-line" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Locations List */}
        {!loading && (
          <div className="space-y-6">
            <div className="surface p-6 rounded-xl">
              <h2 className="font-koulen text-3xl mb-6 heading-gradient">Manage Locations</h2>
              {locations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🏝️</div>
                  <h3 className="font-koulen text-2xl text-white mb-2">
                    No locations yet
                  </h3>
                  <p className="text-white/60 text-sm">
                    Add your first location to get started!
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className="surface-hover surface p-4 rounded-lg flex justify-between items-start"
                    >
                      <div className="flex-1 pr-4">
                        <h4 className="font-semibold text-white mb-1 tracking-wide">
                          {location.name}
                        </h4>
                        <p className="text-white/70 text-sm mb-2 leading-relaxed">
                          {location.description.substring(0, 140)}
                          {location.description.length > 140 && "…"}
                        </p>
                        {location.coordinates?.lat && location.coordinates?.lng && (
                          <p className="text-xs text-white/50">
                            📍 {location.coordinates.lat}, {location.coordinates.lng}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEdit(location)}
                          className="btn-secondary text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(location.id, location.name)}
                          className="btn-danger text-sm"
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
      <Footer />
    </div>
  );
}

export default AdminDashboard;
