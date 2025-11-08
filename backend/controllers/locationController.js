import { Location } from "../models/Location.js";

// Get all locations
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    res.json(locations);
  } catch (err) {
    console.error("Error fetching locations:", err);
    res.status(500).json({ message: "Failed to fetch locations" });
  }
};

// Add a new location (Admin only)
export const addLocation = async (req, res) => {
  try {
    const { name, description, image, images, coordinates } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }

    const locationData = {
      name: name.trim(),
      description: description.trim(),
    };

    if (image && image.trim()) {
      locationData.image = image.trim();
    }

    if (Array.isArray(images) && images.length) {
      locationData.images = images
        .filter((u) => typeof u === "string" && u.trim())
        .map((u) => u.trim());
    }

    if (
      coordinates &&
      coordinates.lat !== undefined &&
      coordinates.lng !== undefined
    ) {
      // Validate coordinates
      const lat = parseFloat(coordinates.lat);
      const lng = parseFloat(coordinates.lng);

      if (isNaN(lat) || isNaN(lng)) {
        return res
          .status(400)
          .json({ message: "Invalid coordinates provided" });
      }

      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        return res
          .status(400)
          .json({ message: "Coordinates out of valid range" });
      }

      locationData.coordinates = { lat, lng };
    }

    const location = new Location(locationData);
    await location.save();

    res.status(201).json(location);
  } catch (err) {
    console.error("Error adding location:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Failed to add location" });
  }
};

// Update a location (Admin only)
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, images, coordinates } = req.body;

    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    const updateData = {};

    if (name && name.trim()) {
      updateData.name = name.trim();
    }

    if (description && description.trim()) {
      updateData.description = description.trim();
    }

    if (image !== undefined) {
      updateData.image = image ? image.trim() : "";
    }

    if (Array.isArray(images)) {
      updateData.images = images
        .filter((u) => typeof u === "string" && u.trim())
        .map((u) => u.trim());
    }

    if (coordinates) {
      if (coordinates.lat !== undefined && coordinates.lng !== undefined) {
        const lat = parseFloat(coordinates.lat);
        const lng = parseFloat(coordinates.lng);

        if (isNaN(lat) || isNaN(lng)) {
          return res
            .status(400)
            .json({ message: "Invalid coordinates provided" });
        }

        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
          return res
            .status(400)
            .json({ message: "Coordinates out of valid range" });
        }

        updateData.coordinates = { lat, lng };
      }
    }

    const updatedLocation = await Location.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json(updatedLocation);
  } catch (err) {
    console.error("Error updating location:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Failed to update location" });
  }
};

// Delete a location (Admin only)
export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    await Location.findByIdAndDelete(id);

    res.json({ message: "Location deleted successfully" });
  } catch (err) {
    console.error("Error deleting location:", err);
    res.status(500).json({ message: "Failed to delete location" });
  }
};

// New: get single location by id
export const getLocationById = async (req, res) => {
  try {
    const loc = await Location.findById(req.params.id);
    if (!loc) return res.status(404).json({ message: "Location not found" });
    res.json(loc);
  } catch (err) {
    console.error("Error fetching location:", err);
    res.status(500).json({ message: "Failed to fetch location" });
  }
};
