"use client";

import { useState } from "react";
import { MonthlyCalendar } from "../components/MonthlyCalendar";
import { TimeSlotSelector } from "../components/TimeSlotSelector";
import axios from "axios";

const moment = require("moment");

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

const makeBooking = async (date, time) => {
  try {
    // const response = await axios.get("https://www./api/questions");
    const data = {
      bkg_date: date,
      bkg_time: time,
      phone: "0123456789",
      email: "wassup@gmail.com",
    };
    const response = await axios.post(
      "http://127.0.0.1:5000/api/makeBooking",
      data
    );
  } catch (error) {
    console.error("Error to book a session:", error);
  }
};

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(null);

  const calendarDayOnClickHandler = (day, month, year) => {
    const date = { year: year, month: month, day: day };
    setSelectedDate(date);
  };

  const handleTimeSelection = (time) => {
    const dateObject = new Date(
      selectedDate.year,
      selectedDate.month,
      selectedDate.day,
      time
    );

    const dateString = moment(dateObject).utcOffset(0, true).format();
    // console.log("Date string: ", dateString);
    // console.log("Sliced Date string: ", dateString.slice(0, 10));
    // console.log("Sliced Time string: ", dateString.slice(11, 19));
    makeBooking(dateString.slice(0, 10), dateString.slice(11, 19));
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
                selectedDate={`${monthNames[selectedDate.month]} ${
                  selectedDate.day
                }, ${selectedDate.year}`}
                onSelectTime={handleTimeSelection}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
