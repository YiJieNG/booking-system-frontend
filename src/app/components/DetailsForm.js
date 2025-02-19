import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";

const makeBooking = async (date, time, phone, email, familyName) => {
  try {
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
    return response;
  } catch (error) {
    console.error("Error to book a session:", error);
    throw error;
  }
};

const requestOtp = async (email) => {
  try {
    const data = { email: email };
    const response = await axios.post(
      "http://127.0.0.1:5000/api/request-otp",
      data
    );
    return response;
  } catch (error) {
    console.error("Error requesting OTP:", error);
    throw error;
  }
};

const verifyOtp = async (email, otp) => {
  try {
    const data = {
      email: email,
      otp: otp,
    };
    const response = await axios.post(
      "http://127.0.0.1:5000/api/verify-otp",
      data
    );
    return response;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const DetailsForm = ({ date, time, onClose }) => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    familyName: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

  const validateEmail = () => {
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate phone number
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

  const handleSendOtp = async () => {
    if (!validateEmail()) return;

    setSendingOtp(true);
    setOtpMessage("");

    try {
      await requestOtp(formData.email);
      setOtpSent(true);
      setOtpMessage("OTP sent successfully. Please check your email.");
    } catch (error) {
      setOtpMessage("Failed to send OTP. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp) {
      setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      return;
    }

    setVerifyingOtp(true);
    setOtpMessage("");
    setErrors((prev) => ({ ...prev, otp: "" })); // Clear previous errors

    try {
      const response = await verifyOtp(formData.email, formData.otp);

      // Check the success flag in the response
      if (response.data.success) {
        setOtpVerified(true);
        setOtpMessage("Email verified successfully!");
      } else {
        // Handle unsuccessful verification
        setErrors((prev) => ({ ...prev, otp: response.data.message }));
      }
    } catch (error) {
      // This would only happen for network errors now
      setErrors((prev) => ({
        ...prev,
        otp: "Network error. Please check your connection.",
      }));
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setOtpMessage("Please verify your email with OTP before booking");
      return;
    }

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
      <div className="rounded-2xl bg-[--blue1] pb-6 text-[--text-dark] shadow-xl h-full relative">
        <div className="p-6 flex flex-col items-center justify-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-[--emerald]" />
          <h2 className="text-2xl font-semibold text-center">
            Booking Confirmed!
          </h2>
          <p className="text-[--text-dark] text-center">
            Your session has been successfully booked for {time} on {date}
          </p>
          {/* <p className="text-[--text-dark] text-center">
            A confirmation email will be sent to {formData.email}
          </p> */}
          <button
            onClick={onClose}
            className="mt-4 w-full max-w-xs bg-[--blue2] text-[--text-dark] py-2 px-4 rounded-md hover:bg-[--blue3] focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[--blue1] text-[--text-dark] shadow-xl h-full relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-[--text-dark] hover:text-[--text-hover]"
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

      <div className="p-6 border-b border-[--blue3]">
        <h2 className="text-lg font-semibold pr-4">
          Enter your information to book the slot on <br />
          <span className="text-[--text-hover]">{date}</span> at{" "}
          <span className="text-[--text-hover]">{time}</span>
        </h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="familyName"
                className="block text-sm font-medium text-[--text-dark]"
              >
                Family Name
              </label>
              <input
                type="text"
                id="familyName"
                name="familyName"
                value={formData.familyName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-[--blue3] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--blue3] ${
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
                className="block text-sm font-medium text-[--text-dark]"
              >
                Email
              </label>
              <div className="flex space-x-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={otpVerified}
                  className={`flex-1 px-3 py-2 border border-[--blue3] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--blue3] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } ${otpVerified ? "bg-gray-100" : ""}`}
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={sendingOtp || otpVerified}
                  className="px-3 py-2 bg-[--blue2] text-[--text-dark] border hover:border-[--text-hover] rounded-md hover:bg-[--green] focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 transition-colors duration-200 disabled:bg-gray-300"
                >
                  {sendingOtp
                    ? "Sending..."
                    : otpVerified
                    ? "Verified"
                    : "Send OTP"}
                </button>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {otpSent && !otpVerified && (
              <div className="space-y-2">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-[--text-dark]"
                >
                  Enter OTP
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    className={`flex-1 px-3 py-2 border border-[--blue3] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--blue3] ${
                      errors.otp ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter OTP from email"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={verifyingOtp || !formData.otp}
                    className="px-3 py-2 bg-[--blue2] text-[--text-dark] border hover:border-[--text-hover] rounded-md hover:bg-[--green] focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 transition-colors duration-200 disabled:bg-gray-300 disabled:border-none disabled:cursor-not-allowed"
                  >
                    {verifyingOtp ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                )}
              </div>
            )}

            {otpMessage && (
              <div
                className={`p-2 rounded ${
                  otpVerified
                    ? "bg-green-100 text-green-800"
                    : otpSent
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {otpMessage}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-[--text-dark]"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-[--blue3] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--blue3] ${
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

            <button
              type="submit"
              disabled={isSubmitting || !otpVerified}
              className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 transition-colors duration-200 ${
                otpVerified
                  ? "bg-[--blue2] text-[--text-dark] border hover:border-[--text-hover] hover:bg-[--green]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <h2 className="text-lg font-semibold">
                {isSubmitting ? "Booking..." : "Book Session"}
              </h2>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
