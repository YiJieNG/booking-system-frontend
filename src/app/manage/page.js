"use client";

import { useState, useEffect } from "react";
import { UpdateBooking } from "../components/UpdateBooking";
import axios from "axios";

const getBooking = async (refNumber, familyName) => {
  try {
    console.log(`Verifying booking: ${refNumber} for ${familyName}`);
    const response = await axios.get("http://127.0.0.1:5000/api/getBooking", {
      params: {
        ref_num: refNumber,
        family_name: familyName,
      },
    });
    return response;
  } catch (err) {
    console.error("Error fetching booked data:", err);
    throw err;
  }
};

export default function BookedSession() {
  const [formData, setFormData] = useState({
    refNumber: "",
    familyName: "",
  });
  const [errors, setErrors] = useState({});
  const [bookedData, setBookedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validate reference number
    if (!formData.refNumber) {
      newErrors.refNumber = "Reference number is required";
    } else if (!/^.{6}$/.test(formData.refNumber)) {
      newErrors.refNumber = "Please enter a valid reference number";
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
        const response = await getBooking(
          formData.refNumber,
          formData.familyName
        );
        console.log(response.data);
        if (response.data.success) {
          setBookedData(response.data);
          setIsLogin(true);
        } else {
          // Handle unsuccessful verification
          setErrors((prev) => ({
            ...prev,
            form:
              response.data.message ||
              "Invalid reference number or family name",
          }));
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors((prev) => ({
          ...prev,
          form: "Failed to verify booking. Please try again.",
        }));
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
        form: "", // Clear general form error as well
      }));
    }
  };

  return (
    <div className="h-full w-full p-4">
      <div className="container relative w-full mx-auto">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {isLogin ? (
            <UpdateBooking
              bkg_date={bookedData.bkg_date}
              bkg_time={bookedData.bkg_time}
              phone={bookedData.phone}
              email={bookedData.email}
              family_name={bookedData.family_name}
              refNumber={formData.refNumber}
              table_num={bookedData.table_num}
              redirectUser={() => setIsLogin(false)}
            />
          ) : (
            <div
              className={`bg-[--blue1] transition-all duration-500 ease-in-out w-full relative lg:w-1/2 border border-[--blue3] rounded-xl shadow-xl`}
            >
              <div className="p-6 border-b border-[--blue3]">
                <h2 className="text-3xl font-bold pr-4">
                  Check / Update your booked session
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Reference Number Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="refNumber"
                        className="block text-lg font-semibold text-[--text-dark]"
                      >
                        Reference Number
                      </label>
                      <input
                        type="text"
                        id="refNumber"
                        name="refNumber"
                        value={formData.refNumber}
                        onChange={handleChange}
                        placeholder="6-digit reference"
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

                    {/* Family Name Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="familyName"
                        className="block text-lg font-semibold text-[--text-dark]"
                      >
                        Family Name
                      </label>
                      <input
                        type="text"
                        id="familyName"
                        name="familyName"
                        value={formData.familyName}
                        onChange={handleChange}
                        className={`text-lg w-full px-3 py-2 border border-[--blue3] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--blue3] ${
                          errors.familyName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.familyName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.familyName}
                        </p>
                      )}
                    </div>

                    {/* General Form Error Message */}
                    {errors.form && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600 text-sm">{errors.form}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 transition-colors duration-200 bg-[--blue2] text-[--text-dark] border hover:border-[--text-hover] hover:bg-[--green] disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      <h2 className="text-lg font-semibold">
                        {isSubmitting
                          ? "Verifying..."
                          : "Retrieve Your Booking"}
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
