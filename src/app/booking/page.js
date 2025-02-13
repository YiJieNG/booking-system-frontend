// app/booking/page.jsx
"use client";

import { useState } from "react";
import { MonthlyCalendar } from "../components/MonthlyCalendar";
import { TimeSlotSelector } from "../components/TimeSlotSelector";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(null);

  const calendarDayOnClickHandler = (day, month, year) => {
    const dateString = `${monthNames[month]} ${day}, ${year}`;
    setSelectedDate(dateString);
  };

  const handleTimeSelection = (time) => {
    console.log(`Selected time: ${time} on ${selectedDate}`);
    // Here you would typically handle the booking logic
  };

  return (
    <div className="h-full w-full p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-5">
        <div className="w-full md:max-w-3xl">
          <MonthlyCalendar onClick={calendarDayOnClickHandler} />
        </div>
        {selectedDate && (
          <div className="w-full md:max-w-3xl">
            <TimeSlotSelector
              selectedDate={selectedDate}
              onSelectTime={handleTimeSelection}
            />
          </div>
        )}
      </div>
    </div>
  );
}
