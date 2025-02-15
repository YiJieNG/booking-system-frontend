import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";

const makeBooking = async (date, time, phone, email, familyName) => {
  // console.log("Sliced Date string: ", dateString.slice(0, 10));
  // console.log("Sliced Time string: ", dateString.slice(11, 19));
  // makeBooking(dateString.slice(0, 10), dateString.slice(11, 19));

  try {
    // const response = await axios.get("https://www./api/questions");
    const data = {
      bkg_date: date,
      bkg_time: time,
      phone: phone,
      email: email,
      family_name: familyName,
    };
    const response = await axios.post(
      "http://127.0.0.1:5000/api/makeBooking",
      data
    );
  } catch (error) {
    console.error("Error to book a session:", error);
  }
};

export const DetailsForm = ({ date, time, onClose }) => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    familyName: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validate phone number (basic validation for demonstration)
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate family name
    if (!formData.familyName) {
      newErrors.familyName = "Family name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await makeBooking(
          date,
          time,
          formData.phoneNumber,
          formData.email,
          formData.familyName
        );
        setIsSuccess(true);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (isSuccess) {
    return (
      <div className="transform transition-all duration-500 ease-in-out rounded-2xl bg-white pb-6 text-slate-800 shadow-xl h-full relative">
        <div className="p-6 flex flex-col items-center justify-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-semibold text-center">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 text-center">
            Your session has been successfully booked for {time} on {date}
          </p>
          <p className="text-gray-600 text-center">
            A confirmation email will be sent to {formData.email}
          </p>
          <button
            onClick={onClose}
            className="mt-4 w-full max-w-xs bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="transform transition-all duration-500 ease-in-out rounded-2xl bg-white pb-6 text-slate-800 shadow-xl h-full relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">
          Enter your information to book the slot on {date} at {time}
        </h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="familyName"
                className="block text-sm font-medium text-gray-700"
              >
                Family Name
              </label>
              <input
                type="text"
                id="familyName"
                name="familyName"
                value={formData.familyName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.familyName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.familyName && (
                <p className="text-red-500 text-sm mt-1">{errors.familyName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+1 234 567 8900"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-blue-400"
              >
                {isSubmitting ? "Booking..." : "Book Session"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
