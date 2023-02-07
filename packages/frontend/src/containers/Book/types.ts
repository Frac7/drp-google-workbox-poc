import { ChangeEventHandler } from "react";

export type BookRouteState = {
  date: Date;
};

export type DeskProps = {
  desks: Array<number>;
  desk: number;
  onChangeDesk: ChangeEventHandler<HTMLSelectElement>;
};

export type ReservationDateProps = {
  readonlyDate?: Date;
  date?: string;
  onChangeDate?: ChangeEventHandler<HTMLInputElement>;
}
