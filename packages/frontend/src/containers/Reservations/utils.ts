import { DAYS_IN_A_WEEK } from "containers/Reservations/constants";

export const getWeeksByMonth = (month: number) => {
  const today = new Date();

  const startingCell = new Date(today.getFullYear(), month, 1).getDay(); // 0-6
  const totalDays = new Date(today.getFullYear(), month + 1, 0).getDate(); // 28-31
  const totalCells = totalDays + startingCell; // 28-31 + padding
  const totalRows = Math.ceil(totalCells / DAYS_IN_A_WEEK);

  const weeks = Array(totalRows)
    .fill([])
    .map((_, week) => {
      return Array(DAYS_IN_A_WEEK)
        .fill(null)
        .map((_, day) => {
          const currentRowFirstDay = week * DAYS_IN_A_WEEK;
          const currentRowRelativeDay = day + 1; // +1 because index ranges from 0-6
          const dayToReturn =
            currentRowFirstDay + currentRowRelativeDay - startingCell;
          return dayToReturn < 1 || dayToReturn > totalDays
            ? null
            : dayToReturn;
        });
    });
  return weeks;
}