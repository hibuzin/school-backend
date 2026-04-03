const Bus = require("../models/bus");

// Update Location
exports.updateLocation = async (req, res) => {
    try {
        const { busId, latitude, longitude, speed } = req.body;

        const bus = await Bus.findOneAndUpdate(
            { busId },
            { latitude, longitude, speed, updatedAt: new Date() },
            { upsert: true, new: true }
        );

        res.json({ success: true, bus });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Single Bus
exports.getBus = async (req, res) => {
    const bus = await Bus.findOne({ busId: req.params.busId });
    res.json(bus);
};

// Get All Buses
exports.getAllBuses = async (req, res) => {
    const buses = await Bus.find();
    res.json(buses);
};