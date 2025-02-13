"use client";

import { MonthlyCalendar } from "../components/MonthlyCalendar";
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
  const onClickHandler = (day, month, year) => {
    const snackMessage = `Clicked on ${monthNames[month]} ${day}, ${year}`;
    console.log(snackMessage); // To do
    makeBooking(day, month, year);
  };

  return (
    <div className="h-full w-full p-4">
      <div className="h-full w-full max-w-3xl mx-auto">
        <MonthlyCalendar onClick={onClickHandler} />
      </div>
    </div>
  );
}
