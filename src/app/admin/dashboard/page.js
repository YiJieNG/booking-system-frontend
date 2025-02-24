"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    time: "",
    familyName: "",
    refNumber: "",
  });
  const [editBooking, setEditBooking] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [sessionConfig, setSessionConfig] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    slot_limit: 5,
  });
  const [configStatus, setConfigStatus] = useState("");
  const [error, setError] = useState("");

  // Configure axios defaults for protected routes
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      fetchBookings();
    } else {
      // Redirect to login if no token found
      router.push("/admin/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAuthToken(null);
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/admin/bookings"
      );
      setBookings(response.data); // Updated to handle direct array response
      setFilteredBookings(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      }
      console.error("Error fetching bookings:", error);
    }
  };

  const handleSessionConfig = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/api/bkgSession", sessionConfig);
      setConfigStatus("Booking session configured successfully!");
      setTimeout(() => setConfigStatus(""), 3000);
    } catch (error) {
      console.error("Error configuring booking session:", error);
      setConfigStatus("Error configuring booking session. Please try again.");
      setTimeout(() => setConfigStatus(""), 3000);
    }
  };

  const handleFilter = () => {
    let filtered = bookings;

    if (filters.date) {
      filtered = filtered.filter((booking) =>
        booking.bkg_date.includes(filters.date)
      );
    }
    if (filters.time) {
      filtered = filtered.filter((booking) =>
        booking.bkg_time.includes(filters.time)
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

  const resetFilters = () => {
    setFilters({
      date: "",
      time: "",
      familyName: "",
      refNumber: "",
    });
    setFilteredBookings(bookings);
  };

  const handleDelete = async (refNum) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.delete(
          `http://127.0.0.1:5000/api/cancelBooking?ref_num=${refNum}`
        );
        fetchBookings();
      } catch (error) {
        console.error("Error canceling booking:", error);
      }
    }
  };

  const handleUpdate = async (updatedBooking) => {
    try {
      await axios.put(
        "http://127.0.0.1:5000/api/updateBooking",
        updatedBooking
      );
      setShowEditDialog(false);
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  if (!isAuthenticated) {
    return null; // Page will redirect before this is even rendered
  }

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Booking Management Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Session Configuration */}
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Configure Booking Session
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <input
                type="number"
                min="1"
                max="12"
                className="p-2 border rounded w-full"
                value={sessionConfig.month}
                onChange={(e) =>
                  setSessionConfig({
                    ...sessionConfig,
                    month: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                min="2024"
                className="p-2 border rounded w-full"
                value={sessionConfig.year}
                onChange={(e) =>
                  setSessionConfig({
                    ...sessionConfig,
                    year: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slot Limit
              </label>
              <input
                type="number"
                min="1"
                className="p-2 border rounded w-full"
                value={sessionConfig.slot_limit}
                onChange={(e) =>
                  setSessionConfig({
                    ...sessionConfig,
                    slot_limit: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <button
            onClick={handleSessionConfig}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Configure Session
          </button>
          {configStatus && (
            <p
              className={`mt-2 ${
                configStatus.includes("Error")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {configStatus}
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Filter by date (YYYY-MM-DD)"
            className="p-2 border rounded"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Filter by time (HH:MM)"
            className="p-2 border rounded"
            value={filters.time}
            onChange={(e) => setFilters({ ...filters, time: e.target.value })}
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
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset Filters
          </button>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border">Ref Number</th>
                <th className="p-2 text-left border">Family Name</th>
                <th className="p-2 text-left border">Phone</th>
                <th className="p-2 text-left border">Email</th>
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
                  <td className="p-2 border">{booking.phone}</td>
                  <td className="p-2 border">{booking.email}</td>
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
                  value={editBooking?.date || ""}
                  onChange={(e) =>
                    setEditBooking({
                      ...editBooking,
                      date: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Time (HH:MM)"
                  className="p-2 border rounded"
                  value={editBooking?.time || ""}
                  onChange={(e) =>
                    setEditBooking({
                      ...editBooking,
                      time: e.target.value,
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
};

export default Dashboard;
