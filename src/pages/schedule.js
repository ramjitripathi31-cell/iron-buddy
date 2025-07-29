import useAuthRedirect from "@/hooks/useAuthRedirect";

export default function SchedulePage() {
  useAuthRedirect(); // 🚫 redirect if not logged in

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Schedule Pickup</h1>
      {/* Your form goes here */}
    </div>
  );
}
