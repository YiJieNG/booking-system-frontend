import React, { useState, useEffect } from "react";
import { MonthlyCalendar } from "./MonthlyCalendar";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { ConfirmUpdate } from "./ConfirmUpdate";
import { Loader2 } from "lucide-react";
import axios from "axios";
import moment from "moment";

const UpdateBookingForm = ({
  currentDate,
  currentTime,
  refNumber,
  onClose,
  redirectUser,
}) => {
  const initialDate = new Date(currentDate);
  const [selectedDate, setSelectedDate] = useState({
    day: initialDate.getDate(),
    month: initialDate.getMonth(),
    year: initialDate.getFullYear(),
  });

  const [selectedTime, setSelectedTime] = useState(currentTime);
  const [selectedDateString, setSelectedDateString] = useState("");
  const [slotsData, setSlotsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState({
    month: initialDate.getMonth(),
    year: initialDate.getFullYear(),
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
      setError("Failed to load availability data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlotsData(currentMonth.month, currentMonth.year);
  }, [currentMonth.month, currentMonth.year]);

  const handleMonthChange = (month, year) => {
    setCurrentMonth({ month, year });
    setSelectedDate(null);
  };

  const handleDayClick = (day, month, year) => {
    setSelectedDate({ day, month, year });
  };

  const handleTimeSelection = (time) => {
    const dateObject = new Date(
      selectedDate.year,
      selectedDate.month,
      selectedDate.day,
      time
    );
    console.log(time);
    const dateString = moment(dateObject).utcOffset(0, true).format();
    setSelectedTime(time);
    setSelectedDateString(dateString);
    setShowConfirmModal(true); // Show confirmation modal when time is selected
  };

  const handleConfirmUpdate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create date object from selected date and time
      const dateObject = new Date(
        selectedDate.year,
        selectedDate.month,
        selectedDate.day
      );

      // Format date as YYYY-MM-DD
      const formattedDate = dateObject.toISOString().split("T")[0];

      // Format time as HH:MM:SS
      const formattedTime = `${selectedTime}:00`;

      const response = await axios.put(
        "http://127.0.0.1:5000/api/updateBooking",
        {
          ref_num: refNumber,
          bkg_date: formattedDate,
          bkg_time: formattedTime,
          // Note: other fields (phone, email, family_name, table) can be added here
          // if they need to be updated as well
        }
      );

      if (response.status === 201) {
        redirectUser("/booking-success");
      } else {
        throw new Error("Failed to update booking");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to update booking. Please try again."
      );
      setIsLoading(false);
    }
  };

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

  return (
    <div className="bg-[--white] rounded-2xl shadow-xl max-h-[90vh] overflow-hidden">
      <div className="sticky top-0 z-20 bg-[--white] p-6 border-b border-[--blue3]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-[--text-dark]">
            Update Booking
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-[--blue3] transition-colors"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="text-sm text-[--text-hover]">
          Current booking: {moment(currentDate).format("MMMM D, YYYY")} at{" "}
          {currentTime}
        </div>
      </div>

      <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
        <div className="flex flex-col gap-6">
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  <p className="text-sm text-gray-500 font-medium">
                    Loading availability...
                  </p>
                </div>
              </div>
            )}

            <MonthlyCalendar
              onClick={handleDayClick}
              selectedDate={selectedDate}
              slotsData={slotsData}
              onMonthChange={handleMonthChange}
            />
            <div className="py-6">
              {selectedDate && (
                <TimeSlotSelector
                  selectedDate={`${monthNames[selectedDate.month]} ${
                    selectedDate.day
                  }, ${selectedDate.year}`}
                  onSelectTime={handleTimeSelection}
                  availableSlots={
                    selectedDate
                      ? slotsData[
                          `${String(selectedDate.day).padStart(
                            2,
                            "0"
                          )}-${String(selectedDate.month + 1).padStart(
                            2,
                            "0"
                          )}-${selectedDate.year}`
                        ]
                      : {}
                  }
                />
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-100 p-3 text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-lg w-full mx-4">
            <ConfirmUpdate
              currentDate={currentDate}
              currentTime={currentTime}
              newDate={
                new Date(
                  selectedDate.year,
                  selectedDate.month,
                  selectedDate.day
                )
              }
              newTime={selectedTime}
              onConfirm={handleConfirmUpdate}
              onClose={() => setShowConfirmModal(false)}
              isSubmitting={isLoading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBookingForm;
