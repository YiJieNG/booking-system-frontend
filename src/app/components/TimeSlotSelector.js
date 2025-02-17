import React from "react";

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(`${hour}`);
  }
  return slots;
};

export const TimeSlotSelector = ({ selectedDate, onSelectTime }) => {
  const timeSlots = generateTimeSlots();

  return (
    <div className="rounded-2xl bg-[--pink] pb-6 text-[--text-dark] shadow-xl h-full">
      <div className="sticky -top-px z-10 w-full rounded-t-2xl bg-[--pink] px-5 pt-7 border-b border-[--rose] pb-4 sm:px-8 sm:pt-8">
        <h2 className="text-lg font-semibold sm:text-xl">
          Available Times for {selectedDate}
        </h2>
      </div>
      <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">
        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              className="group relative h-12 sm:h-14 rounded-lg border border-[--rose] bg-[--peach] font-medium transition-all hover:z-20 hover:border-[--text-hover] hover:bg-[--green] flex items-center justify-center gap-2"
              onClick={() => onSelectTime(time)}
            >
              <svg
                className="w-4 h-4 text-[--text-dark]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeWidth="2" d="M12 6v6l4 4" />
              </svg>
              <span className="font-semibold text-[--text-dark]">
                {`${time}:00`}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;
