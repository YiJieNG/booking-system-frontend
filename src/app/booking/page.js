"use client";

import { MonthlyCalendar } from "../components/MonthlyCalendar";

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
  const calendarDayOnClickHandler = (day, month, year) => {
    const snackMessage = `Clicked on ${monthNames[month]} ${day}, ${year}`;
    console.log(snackMessage);
  };

  return (
    <div className="h-full w-full p-4">
      <div className="h-full w-full max-w-3xl mx-auto">
        <MonthlyCalendar onClick={calendarDayOnClickHandler} />
      </div>
    </div>
  );
}
