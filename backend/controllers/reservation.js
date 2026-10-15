import Reservation from "../models/Reservation.js";


// POST /api/reservations  → Create reservation
const createReservation = async (req, res) => {
  try {
    const { date, time, guests } = req.body;

    if (!date || !time || !guests) {
      return res.status(400).json({ message: "All fields required" });
    }

    const reservation = await Reservation.create({
      user: req.user._id,
      date,
      time,
      guests,
    });

    res.status(201).json({ message: "Reservation created", reservation });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET /api/reservations/my → My reservations
const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// PUT /api/reservations/:id → Update reservation
const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    const { date, time, guests, status } = req.body;

    if (date) reservation.date = date;
    if (time) reservation.time = time;
    if (guests) reservation.guests = guests;
    if (status) reservation.status = status;

    await reservation.save();

    res.json({ message: "Reservation updated", reservation });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("user", "name email");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const updateReservationStatus = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    reservation.status = status;

    await reservation.save();

    res.json({
      message: "Reservation status updated",
      reservation,
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
const totalReservations = async (req, res) => {
  try {
    const count = await Reservation.countDocuments(); 
    res.json({ totalReservations: count });
  } catch (error) {
    console.error("Total reservations error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export {
  createReservation,
  getMyReservations,
  updateReservation,
  getAllReservations,
  updateReservationStatus,
  totalReservations
};
