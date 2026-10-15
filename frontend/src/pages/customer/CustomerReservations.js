import React, { useContext, useEffect, useState } from "react";
import { ReservationContext } from "./context/ReservationContext";
import Toast from "../../components/Toast";

const CustomerReservations = () => {
  const {
    reservations,
    fetchReservations,
    createReservation,
    updateReservation,
  } = useContext(ReservationContext);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchReservations();
    const interval = setInterval(fetchReservations, 5000);
    return () => clearInterval(interval);
  }, []);

  const timeSlots = [
    "5:00 PM","5:30 PM","6:00 PM","6:30 PM",
    "7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM",
  ];

  const guestOptions = [1,2,3,4,5,6,7,8];

  const resetForm = () => {
    setDate("");
    setTime("");
    setGuests(2);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      Toast.error("Please select date and time");
      return;
    }

    const data = { date, time, guests };

    try {
      if (editId) {
        await updateReservation(editId, data);
        Toast.success("Reservation updated");
      } else {
        await createReservation(data);
        Toast.success("Reservation created");
      }

      await fetchReservations();
      resetForm();
    } catch (err) {
      Toast.error("Something went wrong");
    }
  };

  const handleEdit = (res) => {
    setDate(res.date.split("T")[0]);
    setTime(res.time);
    setGuests(res.guests);
    setEditId(res._id);
  };

  const handleCancel = async (id) => {
    try {
      await updateReservation(id, { status: "Cancelled" });
      fetchReservations();
      Toast.success("Cancelled");
    } catch {
      Toast.error("Failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 font-serif">
          {editId ? "Edit Reservation" : "Reserve Your Table"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* DATE */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Select Date
            </label>
            <input
              type="date"
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#EF6E2F] outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* TIME */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Select Time
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`px-4 py-2 rounded-full border transition ${
                    time === slot
                      ? "bg-[#EF6E2F] text-white shadow"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* GUESTS */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Guests
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {guestOptions.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGuests(g)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition ${
                    guests === g
                      ? "bg-[#EF6E2F] text-white shadow"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-[#EF6E2F] hover:bg-[#d95d23] text-white py-3 rounded-xl font-medium transition">
            {editId ? "Update Reservation" : "Confirm Reservation"}
          </button>
        </form>
      </div>

      {/* RESERVATIONS LIST */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 font-serif">
          My Reservations
        </h2>

        {reservations.length === 0 ? (
          <div className="text-gray-500 text-center py-10 bg-white rounded-xl shadow">
            No reservations yet 🍽️
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reservations.map((res) => (
              <div
                key={res._id}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <p className="font-semibold text-lg">
                    {new Date(res.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">{res.time}</p>
                  <p className="text-gray-600">
                    {res.guests} guests
                  </p>

                  <span
                    className={`inline-block text-xs px-3 py-1 rounded-full ${
                      res.status === "Confirmed"
                        ? "bg-green-100 text-green-600"
                        : res.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {res.status}
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(res)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm"
                  >
                    Edit
                  </button>

                  {res.status !== "Cancelled" && (
                    <button
                      onClick={() => handleCancel(res._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerReservations;