import connectDB from "@/lib/db"
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  const { email, password } = req.body;

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "User exists" });

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
