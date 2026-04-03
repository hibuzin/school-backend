const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
    busId: String,
    speed: Number,
    latitude: Number,
    longitude: Number,
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bus", BusSchema);