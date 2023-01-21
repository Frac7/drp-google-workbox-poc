import React, { useState, memo, useEffect } from "react";
import { Flex } from "@chakra-ui/react";

import { getReservationsByMonth } from "api/bookings";

import Header from "./components/Header";
import Calendar from "./components/Calendar";

import { MONTHS } from "./constants";
import { Reservations as ReservationsType } from "types";
import { useRequestReplayed } from "utils";

const Reservations = () => {
  const [month, setMonth] = useState<number>(1);
  const onPrev = () =>
    setMonth((currentMonth: number) =>
      Math.max(0, (currentMonth - 1) % MONTHS)
    );
  const onNext = () =>
    setMonth((currentMonth: number) => Math.min(MONTHS - 1, currentMonth + 1));
  const onToday = () => setMonth(new Date().getMonth());

  const [reservations, setReservations] = useState<ReservationsType>([]);
  useEffect(() => {
    getReservationsByMonth(month).then(setReservations).catch(() => setReservations([]));
  }, [month]);

  useRequestReplayed(setReservations);

  return (
    <Flex w={{ sm: "100%", lg: "max-content" }} m="4rem auto" direction="column">
      <Header month={month} onPrev={onPrev} onNext={onNext} onToday={onToday} />
      <Calendar month={month} reservations={reservations} />
    </Flex>
  );
};

export default memo(Reservations);
