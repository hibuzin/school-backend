const express = require("express");
const Bus = require("../models/bus");


module.exports = (io) => {
    const router = express.Router();


    router.post("/location", async (req, res) => {
        try {
            const { busId, latitude, longitude } = req.body;

            const bus = await Bus.findOneAndUpdate(
                { busId },
                { latitude, longitude, updatedAt: new Date() },
                { upsert: true, new: true }
            );


            io.emit("location-update", bus);

            res.json({ success: true, bus });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
        busController.updateLocation(req, res, io);
    });


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



    router.get("/gps", async (req, res) => {
        const { busId, lat, lng } = req.query;

        const bus = await Bus.findOneAndUpdate(
            { busId },
            { latitude: lat, longitude: lng, updatedAt: new Date() },
            { upsert: true, new: true }
        );

        io.emit("location-update", bus);

        res.send("OK");
    });
    return router;
};