"use client";

import { useState } from "react";
import axios from "axios";
import { DetailsForm } from "../components/DetailsForm";

export default function BookingDetails() {
  return (
    <div className="h-full w-full p-4">
      <div className="container relative w-full mx-auto">
        {/* Stack vertically on mobile, side by side on desktop */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Details container */}
          <div
            className={`transition-all duration-500 ease-in-out w-full ${"md:w-full"}`}
          >
            <DetailsForm />
          </div>
        </div>
      </div>
    </div>
  );
}
