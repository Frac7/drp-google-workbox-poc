export type Reservations = {
  [dayOfTheMonth: number]: number; // dayOfTheMonth: bookingID
}

export type CalendarProps = {
  month: number;
  reservations: Reservations;
};

export type HeaderProps = {
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
};
