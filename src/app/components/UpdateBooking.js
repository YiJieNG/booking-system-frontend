import React, { useState } from "react";
import { ConfirmDelete } from "./ConfirmDelete";

export const UpdateBooking = ({
  bkg_date,
  bkg_time,
  phone,
  email,
  family_name,
  refNumber,
  table_num,
  redirectUser,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="p-6">
      <div
        className={`transition-all duration-500 ease-in-out w-full relative md:w-full p-6 border border-[--blue3] rounded-md`}
      >
        <h2 className="text-xl font-semibold mb-4">Hello {family_name}</h2>
        <h4 className="text-xl font-semibold mb-4">Your Booking Details:</h4>
        <div className="space-y-3">
          <p>
            <span className="font-medium">Reference Number:</span> {refNumber}
          </p>
          <p>
            <span className="font-medium">Family Name:</span> {family_name}
          </p>
          {/* Display other booking details here */}
          <p>
            <span className="font-medium">Date:</span> {bkg_date}
          </p>
          <p>
            <span className="font-medium">Time:</span> {bkg_time}
          </p>
        </div>
        <button
          type="cancel"
          onClick={() => setShowModal(true)}
          className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[--blue3] focus:ring-offset-2 transition-colors duration-200 ${"bg-[--blue2] text-[--text-dark] border hover:border-[--text-hover] hover:bg-[--green]"}`}
        >
          <h2 className="text-lg font-semibold">Cancel</h2>
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="max-w-lg w-full">
            <ConfirmDelete
              refNumber={refNumber}
              onClose={() => setShowModal(false)}
              redirectUser={redirectUser}
            />
          </div>
        </div>
      )}
    </div>
  );
};
