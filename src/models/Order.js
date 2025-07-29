// src/models/Order.js

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  timeSlot: String,
  serviceType: String,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
