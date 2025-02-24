"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Configure axios base URL
// const api = axios.create({
//   baseURL: 'http://localhost:5000'  // Assuming your Flask backend runs on port 5000
// });

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    familyName: "",
    refNumber: "",
  });
  const [editBooking, setEditBooking] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/getAllBookings"
      );
      setBookings(response.data);
      setFilteredBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleFilter = () => {
    let filtered = bookings;

    if (filters.date) {
      filtered = filtered.filter((booking) =>
        booking.bkg_date.includes(filters.date)
      );
    }

    if (filters.familyName) {
      filtered = filtered.filter((booking) =>
        booking.family_name
          .toLowerCase()
          .includes(filters.familyName.toLowerCase())
      );
    }

    if (filters.refNumber) {
      filtered = filtered.filter((booking) =>
        booking.ref_num.toLowerCase().includes(filters.refNumber.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  };

  const handleDelete = async (refNum) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.delete(`/api/cancelBooking?ref_num=${refNum}`);
        fetchBookings();
      } catch (error) {
        console.error("Error canceling booking:", error);
      }
    }
  };

  const handleUpdate = async (updatedBooking) => {
    try {
      await axios.put("/api/updateBooking", updatedBooking);
      setShowEditDialog(false);
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">
          Booking Management Dashboard
        </h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Filter by date (YYYY-MM-DD)"
            className="p-2 border rounded"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Filter by family name"
            className="p-2 border rounded"
            value={filters.familyName}
            onChange={(e) =>
              setFilters({ ...filters, familyName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Filter by reference number"
            className="p-2 border rounded"
            value={filters.refNumber}
            onChange={(e) =>
              setFilters({ ...filters, refNumber: e.target.value })
            }
          />
        </div>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600"
        >
          Apply Filters
        </button>

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border">Ref Number</th>
                <th className="p-2 text-left border">Family Name</th>
                <th className="p-2 text-left border">Date</th>
                <th className="p-2 text-left border">Time</th>
                <th className="p-2 text-left border">Table</th>
                <th className="p-2 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.ref_num} className="border-b">
                  <td className="p-2 border">{booking.ref_num}</td>
                  <td className="p-2 border">{booking.family_name}</td>
                  <td className="p-2 border">{booking.bkg_date}</td>
                  <td className="p-2 border">{booking.bkg_time}</td>
                  <td className="p-2 border">{booking.table_num}</td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => {
                          setEditBooking(booking);
                          setShowEditDialog(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(booking.ref_num)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Dialog */}
        {showEditDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Edit Booking</h2>
              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Date (YYYY-MM-DD)"
                  className="p-2 border rounded"
                  value={editBooking?.bkg_date || ""}
                  onChange={(e) =>
                    setEditBooking({
                      ...editBooking,
                      bkg_date: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Time (HH:MM)"
                  className="p-2 border rounded"
                  value={editBooking?.bkg_time || ""}
                  onChange={(e) =>
                    setEditBooking({
                      ...editBooking,
                      bkg_time: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Table Number"
                  className="p-2 border rounded"
                  value={editBooking?.table_num || ""}
                  onChange={(e) =>
                    setEditBooking({
                      ...editBooking,
                      table_num: e.target.value,
                    })
                  }
                />
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setShowEditDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleUpdate(editBooking)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
