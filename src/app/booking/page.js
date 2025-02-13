"use client";

import { useState } from "react";
import { MonthlyCalendar } from "../components/MonthlyCalendar";
import { TimeSlotSelector } from "../components/TimeSlotSelector";
import axios from "axios";

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

const makeBooking = async (day, month, year) => {
  try {
    console.log(day + "-" + month + "-" + year);
    // const response = await axios.get("https://www./api/questions");
    const data = {
      bkg_date: "2025-07-12",
      bkg_time: "12:00:00",
      phone: "0123456789",
      email: "wassup@gmail.com",
    };
    const response = await axios.post(
      "http://127.0.0.1:5000/api/makeBooking",
      data
    );
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

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
      <div className="container relative w-full mx-auto">
        {/* Stack vertically on mobile, side by side on desktop */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Calendar container */}
          <div
            className={`transition-all duration-500 ease-in-out w-full ${
              selectedDate ? "md:w-2/3" : "md:w-full"
            }`}
          >
            <MonthlyCalendar onClick={calendarDayOnClickHandler} />
          </div>

          {/* Time slot selector container */}
          <div
            className={`transition-all duration-300 ease-in-out w-full ${
              selectedDate
                ? "md:w-1/3 opacity-100 translate-x-0"
                : "md:w-0 opacity-0 h-0 md:h-auto pointer-events-none"
            }`}
          >
            {selectedDate && (
              <TimeSlotSelector
                selectedDate={selectedDate}
                onSelectTime={handleTimeSelection}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
