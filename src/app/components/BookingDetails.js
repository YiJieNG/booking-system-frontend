import React, { useState } from "react";
import { ConfirmDelete } from "./ConfirmDelete";
import UpdateBookingForm from "./UpdateBookingForm";

export const BookingDetails = ({
  bkg_date,
  bkg_time,
  phone,
  email,
  family_name,
  refNumber,
  table_num,
  redirectUser,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div className="rounded-2xl bg-[--blue1] text-[--text-dark] shadow-xl mx-auto relative overflow-hidden w-full lg:w-1/2">
      <div className="w-full rounded-t-2xl bg-[--blue1] px-5 pt-7 sm:px-8 sm:pt-8 border-b border-[--blue3]">
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-1">
          <div>
            <h2 className="text-lg font-medium text-[--text-hover] mb-2">
              {`Welcome back, ${family_name}`}
            </h2>
            <h2 className="text-2xl font-bold">Your Booking Details</h2>
          </div>
          <div className="rounded-lg border border-[--blue3] bg-[--blue2] px-3 py-1.5 text-md font-medium italic">
            Ref No. {refNumber}
          </div>
        </div>
      </div>

      <div className="px-5 py-8 sm:px-8 border-b border-[--blue3]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-[--blue2] rounded-lg p-4 hover:bg-[--blue3] transition-colors">
            <div className="flex items-center mb-2">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium text-[--text-hover]">
                Date
              </span>
            </div>
            <p className="text-xl font-semibold">{bkg_date}</p>
          </div>

          <div className="bg-[--blue2] rounded-lg p-4 hover:bg-[--blue3] transition-colors">
            <div className="flex items-center mb-2">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-[--text-hover]">
                Time
              </span>
            </div>
            <p className="text-xl font-semibold">{bkg_time}</p>
          </div>

          <div className="bg-[--blue2] rounded-lg p-4 hover:bg-[--blue3] transition-colors">
            <div className="flex items-center mb-2">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 6v12M16 6v12"
                />
              </svg>
              <span className="text-sm font-medium text-[--text-hover]">
                Table Number
              </span>
            </div>
            <p className="text-lg font-semibold">{table_num}</p>
          </div>

          <div className="bg-[--blue2] rounded-lg p-4 hover:bg-[--blue3] transition-colors">
            <div className="flex items-center mb-2">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium text-[--text-hover]">
                Email
              </span>
            </div>
            <p className="text-lg font-semibold truncate">{email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-5 py-6 sm:px-8">
        <button
          type="button"
          onClick={() => setShowUpdateModal(true)}
          className="w-full py-3 px-4 rounded-lg border border-[--blue3] bg-[--blue2] text-[--text-dark] hover:bg-[--green] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 font-semibold text-lg flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Date/Time Change
        </button>
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="w-full py-3 px-4 rounded-lg border border-[--blue3] bg-[--blue2] text-[--text-dark] hover:bg-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 font-semibold text-lg flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Cancel Booking
        </button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="max-w-lg w-full">
            <ConfirmDelete
              refNumber={refNumber}
              onClose={() => setShowDeleteModal(false)}
              redirectUser={redirectUser}
            />
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="max-w-5xl w-full">
            <UpdateBookingForm
              currentDate={bkg_date}
              currentTime={bkg_time}
              refNumber={refNumber}
              onClose={() => setShowUpdateModal(false)}
              redirectUser={redirectUser}
            />
          </div>
        </div>
      )}
    </div>
  );
};
