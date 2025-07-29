import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage(data.message || "Signup failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="p-2 border" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="p-2 border" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Create Account</button>
      </form>
      {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
    </div>
  );
}
