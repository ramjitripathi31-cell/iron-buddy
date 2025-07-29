import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { logoutUser } from "@/utils/auth";

export default function Home() {
  const router = useRouter();
  const [timeSlot, setTimeSlot] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    const response = await fetch("/api/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ timeSlot, serviceType }),
    });

    const result = await response.json();
    alert(result.message);

    if (response.ok) {
      console.log("✅ Order saved:", result.order);
    } else {
      console.error("❌ Error saving order:", result.message);
    }
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          IronBuddy
        </h1>

        {isLoggedIn && (
          <div className="text-right mb-4">
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        )}

        <h2 className="text-lg font-semibold text-center mb-4">Schedule Pickup</h2>

        <div className="space-y-4">
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Time Slot</option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>

          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Service Type</option>
            <option value="wash">Wash</option>
            <option value="iron">Iron</option>
            <option value="dryclean">Dry Clean</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
}
