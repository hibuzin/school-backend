const express = require("express");
const Bus = require("../models/bus");

// ✅ io-ஐ parameter-ஆக receive செய்
module.exports = (io) => {
    const router = express.Router();

    // Driver → location update
    router.post("/location", async (req, res) => {
        try {
            const { busId, latitude, longitude } = req.body;

            const bus = await Bus.findOneAndUpdate(
                { busId },
                { latitude, longitude, updatedAt: new Date() },
                { upsert: true, new: true }
            );

            // ✅ Parents-க்கு live update
            io.emit("location-update", bus);

            res.json({ success: true, bus });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    });

    // Parent → latest location
    router.get("/location/:busId", async (req, res) => {
        try {
            const bus = await Bus.findOne({ busId: req.params.busId });
            if (!bus) {
                return res.status(404).json({ success: false, message: "Bus not found" });
            }
            res.json({ success: true, bus });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    });

    return router;
};