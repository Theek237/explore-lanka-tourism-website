import { Location } from "../models/Location.js";

// Get all locations
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    console.log("getLocations called: res = ", locations); // Sort by newest first
    res.json(locations);
  } catch (err) {
    console.error("Error fetching locations:", err);
    res.status(500).json({ message: "Failed to fetch locations" });
  }
};

// Add a new location
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

// // Seed sample locations (for testing)
// export const seedLocations = async (req, res) => {
//   try {
//     // Check if locations already exist
//     const existingCount = await Location.countDocuments();
//     if (existingCount > 0) {
//       return res.json({
//         message: "Locations already exist, no seeding needed",
//       });
//     }

//     const sampleLocations = [
//       {
//         name: "Sigiriya Rock Fortress",
//         description:
//           "An ancient palace and fortress complex located in the central Matale District of Sri Lanka, surrounded by the remains of an extensive network of gardens, reservoirs, and other structures.",
//         image:
//           "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&q=80",
//         coordinates: { lat: 7.9569, lng: 80.7603 },
//       },
//       {
//         name: "Temple of the Sacred Tooth Relic",
//         description:
//           "A Buddhist temple in Kandy, which houses the relic of the tooth of the Buddha. It was designated a UNESCO World Heritage Site in 1988.",
//         image:
//           "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=500&q=80",
//         coordinates: { lat: 7.2936, lng: 80.6411 },
//       },
//       {
//         name: "Galle Dutch Fort",
//         description:
//           "A historical fortress built by the Portuguese in 1588, later fortified by the Dutch. It's a fine example of European architecture in South and Southeast Asia.",
//         image:
//           "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=500&q=80",
//         coordinates: { lat: 6.0367, lng: 80.217 },
//       },
//       {
//         name: "Ella Nine Arch Bridge",
//         description:
//           "A viaduct bridge located in Demodara, between Ella and Demodara railway stations. It's one of the most visited tourist attractions in the area.",
//         image:
//           "https://images.unsplash.com/photo-1578498395157-f7bf7a0c9c7b?w=500&q=80",
//         coordinates: { lat: 6.8663, lng: 81.0455 },
//       },
//     ];

//     const createdLocations = await Location.insertMany(sampleLocations);
//     res.status(201).json({
//       message: "Sample locations seeded successfully",
//       count: createdLocations.length,
//       locations: createdLocations,
//     });
//   } catch (err) {
//     console.error("Error seeding locations:", err);
//     res.status(500).json({ message: "Failed to seed locations" });
//   }
// };
