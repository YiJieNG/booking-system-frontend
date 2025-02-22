import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
      <div className="rounded-2xl bg-[--blue1] pb-6 text-[--text-dark] shadow-xl h-full relative">
        <div className="p-6 flex flex-col items-center justify-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-[--emerald]" />
          <h2 className="text-2xl font-semibold text-center">
            Booking Deleted!
          </h2>
          <p className="text-[--text-dark] text-center">
            Your session has been deleted!
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 w-full max-w-xs bg-[--blue2] text-[--text-dark] py-2 px-4 rounded-md hover:bg-[--blue3] focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 transition-colors duration-200"
          >
            Return to HomePage
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

      <div className="p-6 border-[--blue3]">
        <h2 className="text-lg font-semibold pr-4">
          Are you sure you want to cancel the booking?
          <br />
        </h2>
        <button
          type="cancel"
          disabled={isSubmitting}
          onClick={handleCancelBooking}
          className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 transition-colors duration-200 ${"bg-[--blue2] text-[--text-dark] border hover:border-[--text-hover] hover:bg-[--green]"}`}
        >
          <h2 className="text-lg font-semibold">
            {isSubmitting ? "Cancelling..." : "Cancel"}
          </h2>
        </button>
      </div>
    </div>
  );
};
