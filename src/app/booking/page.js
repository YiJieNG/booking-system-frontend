"use client";

import { useState } from "react";
import { MonthlyCalendar } from "../components/MonthlyCalendar";
import { TimeSlotSelector } from "../components/TimeSlotSelector";
import { DetailsForm } from "../components/DetailsForm";
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

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateString, setSelectedDateString] = useState("");

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
    // pass dateString to bookingDetails
    // console.log("Date string: ", dateString);
    setSelectedTime(time);
    setSelectedDateString(dateString);
    setShowModal(true);
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

          {/* Modal Overlay */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
              {/* Modal Content */}
              <div className="max-w-md w-full">
                <DetailsForm
                  date={selectedDateString.slice(0, 10)}
                  time={selectedDateString.slice(11, 19)}
                  onClose={() => setShowModal(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
