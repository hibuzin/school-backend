const Bus = require("../models/bus");

// ✅ io parameter add செய்
exports.updateLocation = async (req, res, io) => {
  try {
    const { busId, latitude, longitude, speed } = req.body;

    const bus = await Bus.findOneAndUpdate(
      { busId },
      { latitude, longitude, speed, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    // ✅ live update
    io.emit("location-update", bus);

    res.json({ success: true, bus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ try/catch add செய்
exports.getBus = async (req, res) => {
  try {
    const bus = await Bus.findOne({ busId: req.params.busId });
    if (!bus) {
      return res.status(404).json({ success: false, message: "Bus not found" });
    }
    res.json({ success: true, bus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json({ success: true, buses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};