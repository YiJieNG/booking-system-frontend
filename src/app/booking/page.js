"use client";

import { useState, useEffect } from "react";
import { MonthlyCalendar } from "../components/MonthlyCalendar";
import { TimeSlotSelector } from "../components/TimeSlotSelector";
import { DetailsForm } from "../components/DetailsForm";
import { Loader2 } from "lucide-react";
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
  const [slotsData, setSlotsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return {
      month: today.getMonth(),
      year: today.getFullYear(),
    };
  });

  // Fetch slots data when month changes
  const fetchSlotsData = async (month, year) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/bookingSummary",
        {
          params: {
            month: month + 1,
            year: year,
          },
        }
      );
      setSlotsData(response.data);
    } catch (err) {
      console.error("Error fetching slots data:", err);
      setError("Failed to load availability data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlotsData(currentMonth.month, currentMonth.year);
  }, [currentMonth.month, currentMonth.year]);

  const handleMonthChange = (month, year) => {
    console.log("Month changed:", month, year);
    setCurrentMonth((prevState) => {
      if (prevState.month !== month || prevState.year !== year) {
        return { month, year };
      }
      return prevState;
    });
    setSelectedDate(null);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const calendarDayOnClickHandler = (day, month, year) => {
    const date = { year, month, day };
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
    setSelectedTime(time);
    setSelectedDateString(dateString);
    setShowModal(true);
  };

  return (
    <div className="h-full w-full p-4">
      <div className="container relative w-full mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <div
            className={`transition-all duration-500 ease-in-out w-full relative ${
              selectedDate ? "md:w-2/3" : "md:w-full"
            }`}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-50 flex items-center justify-center rounded-2xl">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  <p className="text-sm text-gray-500 font-medium">
                    Loading availability...
                  </p>
                </div>
              </div>
            )}
            <MonthlyCalendar
              onClick={calendarDayOnClickHandler}
              selectedDate={selectedDate}
              slotsData={slotsData}
              onMonthChange={handleMonthChange}
              error={error}
            />
          </div>

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
                availableSlots={
                  selectedDate
                    ? slotsData[
                        `${String(selectedDate.day).padStart(2, "0")}-${String(
                          selectedDate.month + 1
                        ).padStart(2, "0")}-${selectedDate.year}`
                      ]
                    : {}
                }
              />
            )}
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
              <div className="max-w-lg w-full">
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
