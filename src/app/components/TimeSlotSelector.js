// components/TimeSlotSelector.jsx
import React from "react";

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(`${hour}:00`);
  }
  return slots;
};

export const TimeSlotSelector = ({ selectedDate, onSelectTime }) => {
  const timeSlots = generateTimeSlots();

  return (
    <div className="transform transition-all duration-500 ease-in-out rounded-2xl bg-white pb-6 text-slate-800 shadow-xl h-full">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">
          Available Times for {selectedDate}
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              className="flex items-center justify-center gap-2 py-6 px-4 border rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors"
              onClick={() => onSelectTime(time)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeWidth="2" d="M12 6v6l4 4" />
              </svg>
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
