import React from "react";

export const TimeSlotSelector = ({
  selectedDate,
  onSelectTime,
  availableSlots = {},
}) => {
  const timeSlots = Object.entries(availableSlots || {})
    .map(([time, slotsLeft]) => ({
      time: time,
      slotsLeft: slotsLeft,
    }))
    .sort((a, b) => a.time.localeCompare(b.time));

  const noSlotsAvailable = !timeSlots || timeSlots.length === 0;

  return (
    <div className="rounded-2xl bg-[--blue1] pb-6 text-[--text-dark] shadow-xl h-full">
      <div className="sticky -top-px z-10 w-full rounded-t-2xl bg-[--blue1] px-5 pt-7 border-b border-[--blue3] pb-4 sm:px-8 sm:pt-8">
        <h2 className="text-lg font-semibold sm:text-xl">
          Available Times for{" "}
          <span className="text-[--text-hover]">{selectedDate}</span>
        </h2>
      </div>
      <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">
        {noSlotsAvailable ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500 text-center">
              No available time slots for this date.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map(({ time, slotsLeft }) => (
              <button
                key={time}
                className={`group relative h-16 sm:h-20 rounded-lg border border-[--blue3] font-medium transition-all hover:z-20 hover:border-[--text-hover] hover:bg-[--green] flex flex-col items-center justify-center gap-1
      ${
        slotsLeft > 0
          ? "bg-[--blue2]"
          : "disabled cursor-not-allowed opacity-30 hover:bg-[--blue1]"
      }`}
                onClick={() =>
                  slotsLeft > 0 &&
                  onSelectTime(parseInt(time.split(":")[0], 10))
                }
                disabled={slotsLeft <= 0}
              >
                <div className="flex items-center gap-1">
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
                    {time}
                  </span>
                </div>
                <div
                  className={`text-sm sm:text-base font-semibold text-[--text-hover] group-hover:text-[--text-dark] flex items-center`}
                >
                  {slotsLeft > 0 ? (
                    <>
                      <svg
                        className="w-4 h-4 mr-1 inline lg:hidden"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                        />
                      </svg>
                      <span className="">{slotsLeft}</span>
                      <span className="hidden lg:inline ml-1">
                        {slotsLeft === 1 ? " slot" : " slots"}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-500">Not available</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
