import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, Trash2 } from "lucide-react";
import axios from "axios";

const cancelBooking = async (refNumber) => {
  try {
    const response = await axios.delete(
      "http://127.0.0.1:5000/api/cancelBooking",
      {
        params: {
          ref_num: refNumber,
        },
      }
    );
    return response;
  } catch (err) {
    console.error("Error deleting data:", err);
    throw err;
  }
};

export const ConfirmDelete = ({ refNumber, onClose, redirectUser }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleCancelBooking = async () => {
    setIsSubmitting(true);
    try {
      const response = await cancelBooking(refNumber);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setErrors((prev) => ({
        ...prev,
        cancel: "Failed to cancel booking. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl bg-[--blue1] text-[--text-dark] shadow-xl relative overflow-hidden">
        <div className="w-full rounded-t-2xl bg-[--blue1] px-5 pt-7 sm:px-8 sm:pt-8">
          <div className="flex w-full items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-[--emerald]" />
          </div>
        </div>

        <div className="px-5 py-8 sm:px-8 border-b border-[--blue3]">
          <h2 className="text-2xl font-bold text-center mb-4">
            Booking Deleted!
          </h2>
          <p className="text-[--text-dark] text-center text-lg">
            Your session has been successfully cancelled.
          </p>
        </div>

        <div className="px-5 py-6 sm:px-8">
          <button
            onClick={redirectUser}
            className="w-full py-3 px-4 rounded-lg border border-[--blue3] bg-[--blue2] text-[--text-dark] hover:bg-[--green] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 font-semibold text-lg"
          >
            Return to HomePage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[--blue1] text-[--text-dark] shadow-xl relative overflow-hidden">
      <div className="w-full rounded-t-2xl bg-[--blue1] px-5 pt-6 sm:px-8 sm:pt-6 border-b border-[--blue3]">
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold">Cancel Booking</h2>
          <button
            onClick={onClose}
            className="rounded-lg border border-[--blue3] bg-[--blue2] p-2 text-[--text-dark] hover:bg-[--green] transition-colors duration-200"
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
        </div>
      </div>

      <div className="px-5 py-8 sm:px-8 border-b border-[--blue3]">
        <div className="flex flex-col items-center justify-center mb-6">
          <AlertTriangle className="w-16 h-16 text-[--text-hover] mb-4" />
        </div>
        <div className="bg-[--blue2] rounded-lg p-4">
          <p className="text-lg font-medium text-[--text-hover]">
            Are you sure you want to cancel this booking?
          </p>
        </div>
        {errors?.cancel && (
          <p className="mt-4 text-red-600 text-center">{errors.cancel}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 px-5 py-6 sm:px-8">
        <button
          onClick={handleCancelBooking}
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-lg border border-[--blue3] bg-[--blue2] text-[--text-dark] hover:bg-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 font-semibold text-lg flex items-center justify-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          {isSubmitting ? "Cancelling..." : "Cancel Booking"}
        </button>
      </div>
    </div>
  );
};
