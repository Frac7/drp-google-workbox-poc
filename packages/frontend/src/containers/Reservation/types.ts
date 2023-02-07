export type ReservationRouteParams = {
  id: string;
};

export type DeskProps = {
  desk: number | undefined;
  isLoading: boolean;
};

export type ReservationDateProps = {
  isLoading: boolean;
  date: string | undefined;
};
