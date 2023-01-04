import React, { useMemo, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { DAYS_IN_A_WEEK, dayNames } from "containers/Reservations/contants";

const Calendar = ({ month }: CalendarProps) => {
  const location = useLocation();
  const pathname = location.pathname;

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
            {dayNames.map((day) => (
              <Th>{day}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {weeks.map((days) => (
            <Tr>
              {days.map((day) => (
                <Td>
                  <Link to={`${pathname}/${day}`}>{day}</Link>
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

type CalendarProps = {
  month: number;
};

export default memo(Calendar);
