import React, { memo } from "react";
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
  Show,
} from "@chakra-ui/react";

import { dayNames } from "containers/Reservations/constants";
import { CalendarProps } from "containers/Reservations/types";
import { getWeeksByMonth } from "containers/Reservations/utils";

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

  const weeks = getWeeksByMonth(month);

  return (
    <TableContainer>
      <Table variant="simple">
        <Show above="lg">
          <Thead>
            <Tr>
              {dayNames.map((day: string, i: number) => (
                <Th key={i}>{day}</Th>
              ))}
            </Tr>
          </Thead>
        </Show>
        <Tbody>
          {weeks.map((days: Array<number | null>, i: number) => (
            <Tr key={i}>
              {days.map((day: number | null, j: number) => (
                <Td key={j} p="1rem">
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
