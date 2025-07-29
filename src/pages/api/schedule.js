import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { verifyToken } from "@/middleware/auth";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      verifyToken(req); // 🔐 verify the JWT

      const { timeSlot, serviceType } = req.body;
      await connectDB();
      const newOrder = await Order.create({ timeSlot, serviceType });

      return res.status(201).json({
        message: "Pickup scheduled and saved!",
        order: newOrder,
      });
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: err.message || "Unauthorized" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}