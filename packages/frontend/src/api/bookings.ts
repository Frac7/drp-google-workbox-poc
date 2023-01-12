import { Reservation, Reservations } from "types";

const getReservationsByMonth: (month: number) => Promise<Reservations> = (
  month: number
) =>
  fetch(
    `${process.env.REACT_APP_BASE_URL}/bookings?month=${month}`
  ).then((res) => res.json());

const getReservationById: (id: string) => Promise<Reservation> = (id: string) =>
  fetch(`${process.env.REACT_APP_BASE_URL}/bookings/${id}`).then((res) =>
    res.json()
  );

const createReservation: (reservation: {
  date: Date;
  desk: number;
}) => Promise<{}> = (reservation: { date: Date; desk: number }) =>
  fetch(`${process.env.REACT_APP_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservation),
  }).then((res) => res.json());

const removeReservationById: (id: string) => Promise<{}> = (id: string) =>
  fetch(`${process.env.REACT_APP_BASE_URL}/bookings/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());

export {
  getReservationsByMonth,
  getReservationById,
  createReservation,
  removeReservationById,
};
