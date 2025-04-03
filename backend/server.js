import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const getCompanyType = (tags) => {
    // Check for various tags that might indicate e-waste recycling
    if (tags["recycling:ewaste"] === "yes" || 
        tags["recycling:electronics"] === "yes" ||
        tags["recycling_type"] === "container" ||
        tags["amenity"] === "recycling" ||
        tags["recycling:electrical"] === "yes" ||
        tags["recycling:electrical_appliances"] === "yes") {
        return "E-Waste";
    }
    return null;
};

const getCompanyName = (tags, type) => {
    if (tags.name) return tags.name;
    if (tags.operator) return `${tags.operator} - E-Waste Recycling`;
    return "E-Waste Recycling Center";
};

app.get("/api/nearby", async (req, res) => {
    try {
        const lat = req.query.lat || 19.076; // Default: Mumbai
        const lon = req.query.lon || 72.8777;
        const radius = 100000; // Increased to 100km radius

        // Expanded query to include more potential e-waste recycling facilities
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];
            (
                node["recycling:ewaste"="yes"](around:${radius},${lat},${lon});
                node["recycling:electronics"="yes"](around:${radius},${lat},${lon});
                node["recycling:electrical"="yes"](around:${radius},${lat},${lon});
                node["recycling:electrical_appliances"="yes"](around:${radius},${lat},${lon});
                node["amenity"="recycling"](around:${radius},${lat},${lon});
                node["recycling_type"="container"](around:${radius},${lat},${lon});
            );
            out;`;

        const response = await fetch(overpassUrl);
        const data = await response.json();

        if (!data.elements || data.elements.length === 0) {
            return res.json([]);
        }

        const companies = data.elements
            .map((node) => {
                const type = getCompanyType(node.tags);
                if (!type) return null;
                
                return {
                    name: getCompanyName(node.tags, type),
                    latitude: node.lat,
                    longitude: node.lon,
                    type: type,
                    tags: node.tags
                };
            })
            .filter(company => company !== null);

        res.json(companies);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/nearby", async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const lat = latitude || 19.076; // Default: Mumbai
        const lon = longitude || 72.8777;
        const radius = 50000; // Increased to 100km radius

        // Expanded query to include more potential e-waste recycling facilities
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];
            (
                node["recycling:ewaste"="yes"](around:${radius},${lat},${lon});
                node["recycling:electronics"="yes"](around:${radius},${lat},${lon});
                node["recycling:electrical"="yes"](around:${radius},${lat},${lon});
                node["recycling:electrical_appliances"="yes"](around:${radius},${lat},${lon});
                node["amenity"="recycling"](around:${radius},${lat},${lon});
                node["recycling_type"="container"](around:${radius},${lat},${lon});
            );
            out;`;

        const response = await fetch(overpassUrl);
        const data = await response.json();

        if (!data.elements || data.elements.length === 0) {
            return res.json([]);
        }

        const companies = data.elements
            .map((node) => {
                const type = getCompanyType(node.tags);
                if (!type) return null;
                
                return {
                    name: getCompanyName(node.tags, type),
                    latitude: node.lat,
                    longitude: node.lon,
                    type: type,
                    tags: node.tags
                };
            })
            .filter(company => company !== null);

        res.json(companies);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
