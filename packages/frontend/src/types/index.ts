export type Reservation = {
  id: string;
  date: string;
  desk: number;
};

export type Reservations = {
  [dayOfTheMonth: number]: number; // dayOfTheMonth: bookingID
};
