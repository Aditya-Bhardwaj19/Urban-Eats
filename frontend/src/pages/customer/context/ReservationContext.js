import { createContext, useState } from "react";
import axios from "axios";

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  const token = localStorage.getItem("token");

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // ✅ CREATE
  const createReservation = async (data) => {
    try {
      await axios.post(
        `${API_BASE}/reservations/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchReservations(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ GET MY
  const fetchReservations = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/reservations/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ UPDATE
  const updateReservation = async (id, updatedData) => {
    try {
      await axios.put(
        `${API_BASE}/reservations/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchReservations();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        createReservation,
        fetchReservations,
        updateReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};