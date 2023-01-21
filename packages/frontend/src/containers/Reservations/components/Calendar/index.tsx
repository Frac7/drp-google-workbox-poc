import React, { useMemo, memo } from "react";
import { useHistory } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";

import { DAYS_IN_A_WEEK, dayNames } from "containers/Reservations/constants";
import { CalendarProps } from "containers/Reservations/types";

import { routes } from "config";

const Calendar = ({ month, reservations }: CalendarProps) => {
  const history = useHistory();
  const handleBooking = (day: number) => {
    const date = new Date();
    date.setDate(day);
    date.setMonth(month);

    history.push(routes.BOOK, { date });
  };
  const handleShowReservation = (id: number) => {
    history.push(`${routes.RESERVATIONS}/${id}`);
  };

  const weeks = useMemo(() => {
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
  }, [month]);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {dayNames.map((day: string, i: number) => (
              <Th key={i}>{day}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {weeks.map((days: Array<number | null>, i: number) => (
            <Tr key={i}>
              {days.map((day: number | null, j: number) => (
                <Td key={j}>
                  {day ? (
                    <Text
                      cursor="pointer"
                      onClick={
                        reservations[day]
                          ? () => handleShowReservation(reservations[day])
                          : () => handleBooking(day)
                      }
                      color={reservations[day] ? "orange" : "unset"}
                    >
                      {day}
                    </Text>
                  ) : null}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default memo(Calendar);
