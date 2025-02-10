"use client"; // Add this line at the top

import React, { useState } from "react";

const TimeSlotPicker = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = [
    { time: "01:00 PM", available: 4 },
    { time: "02:30 PM", available: 2 },
    { time: "04:00 PM", available: 2 },
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
      <h2 className="text-white text-lg mb-4">Wed, Feb 19</h2>
      <div className="flex justify-between">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            onClick={() => setSelectedSlot(slot.time)}
            className={`p-4 rounded-lg w-32 text-white text-center border-2 
              ${
                selectedSlot === slot.time
                  ? "bg-blue-600 border-blue-500"
                  : "bg-gray-800 border-gray-700"
              }`}
          >
            <span className="block font-semibold">{slot.time}</span>
            <span className="block text-sm text-gray-400">
              {slot.available} available
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
