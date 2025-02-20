"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const getBooking = async (refNumber) => {
  try {
    console.log(refNumber);
    const response = await axios.get("http://127.0.0.1:5000/api/getBooking", {
      params: {
        ref_num: refNumber,
      },
    });
    // setBookedData(response.data);
    return response;
  } catch (err) {
    console.error("Error fetching booked data:", err);
    setError("Failed to load availability data");
    throw err;
  }
};

export default function BookedSession() {
  const [errors, setErrors] = useState({});
  const [refNumber, setRefNumber] = useState("");
  const [bookedData, setBookedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!refNumber) {
      newErrors.refNumber = "Reference number is required";
    } else if (!/^.{6}$/.test(refNumber)) {
      newErrors.refNumber = "Please enter a valid reference number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await getBooking(refNumber);
        console.log(response.data);
        if (response.data.success) {
          setIsLogin(true);
        } else {
          // Handle unsuccessful verification
          setErrors((prev) => ({ ...prev, refNumber: response.data.message }));
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRefNumber(value);
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        refNumber: "",
      }));
    }
  };

  return (
    <div className="h-full w-full p-4">
      <div className="container relative w-full mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          {isLogin ? (
            <div
              className={`transition-all duration-500 ease-in-out w-full relative md:w-full`}
            >
              Login successfully
            </div>
          ) : (
            <div
              className={`transition-all duration-500 ease-in-out w-full relative md:w-full`}
            >
              <div className="p-6 border-b border-[--blue3]">
                <h2 className="text-lg font-semibold pr-4">
                  Check / Update your booked session
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="referenceNumber"
                        className="block text-sm font-medium text-[--text-dark]"
                      >
                        Please enter your reference number
                      </label>
                      <input
                        type="text"
                        id="refNumber"
                        name="refNumber"
                        value={refNumber}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border border-[--blue3] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--blue3] ${
                          errors.refNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.refNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.refNumber}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 transition-colors duration-200 bg-[--blue2] text-[--text-dark] border hover:border-[--text-hover] hover:bg-[--green]`}
                    >
                      <h2 className="text-lg font-semibold">
                        {isSubmitting ? "Verifying..." : "Login"}
                      </h2>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
