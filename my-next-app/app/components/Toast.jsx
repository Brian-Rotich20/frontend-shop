"use client";

export default function Toast({ status, message }) {
  const colorMap = {
    processing: "bg-yellow-500",
    awaiting: "bg-blue-500",
    success: "bg-green-600",
    error: "bg-red-600"
  };

  return (
    <div className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-lg text-white ${colorMap[status]}`}>
      <p className="text-sm">{message}</p>
    </div>
  );
}
