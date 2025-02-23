import React from "react";
import { AlertTriangle, Calendar } from "lucide-react";
import moment from "moment";

export const ConfirmUpdate = ({
  currentDate,
  currentTime,
  newDate,
  newTime,
  onConfirm,
  onClose,
  isSubmitting,
  error,
}) => {
  return (
    <div className="rounded-2xl bg-[--blue1] text-[--text-dark] shadow-xl relative overflow-hidden">
      <div className="w-full rounded-t-2xl bg-[--blue1] px-5 pt-6 sm:px-8 sm:pt-6 border-b border-[--blue3]">
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold">Update Booking</h2>
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
        <div className="bg-[--blue2] rounded-lg p-4 space-y-4">
          <p className="text-lg font-medium text-[--text-hover]">
            Are you sure you want to update this booking?
          </p>
          <div className="space-y-2">
            <p className="text-sm text-[--text-dark]">
              From: {moment(currentDate).format("MMMM D, YYYY")} at{" "}
              {currentTime}
            </p>
            <p className="text-sm text-[--text-dark]">
              To: {moment(newDate).format("MMMM D, YYYY")} at {newTime}
            </p>
          </div>
        </div>
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 py-6 sm:px-8">
        <button
          onClick={onClose}
          className="py-3 px-4 rounded-lg border border-[--blue3] bg-[--blue2] text-[--text-dark] hover:bg-[--blue3] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 font-semibold text-lg"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isSubmitting}
          className="py-3 px-4 rounded-lg border border-[--blue3] bg-[--blue2] text-[--text-dark] hover:bg-[--green] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 font-semibold text-lg flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};
