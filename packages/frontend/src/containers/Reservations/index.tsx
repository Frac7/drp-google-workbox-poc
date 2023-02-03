import React, { useState, memo } from "react";
import { Flex, Spinner, Box } from "@chakra-ui/react";

import { getReservationsByMonth } from "api/bookings";

import Header from "./components/Header";
import Calendar from "./components/Calendar";

import { MONTHS } from "./constants";
import { Reservations as ReservationsType } from "types";

import { /* useRequestReplayed */ useRevalidatedData, useQuery } from "utils";

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
  const { isLoading } = useQuery(getReservationsByMonth, month, {
    onSuccess: setReservations,
    onError: () => setReservations([]),
    errorMessage: "Errore nel caricamento delle prenotazioni",
  });

  // useRequestReplayed(setReservations);
  useRevalidatedData(setReservations);

  return (
    <Flex
      w={{ sm: "100%", lg: "750px" }}
      m="4rem auto"
      direction="column"
      alignItems="center"
    >
      <Header month={month} onPrev={onPrev} onNext={onNext} onToday={onToday} />
      <Box my="2rem">
        {isLoading ? (
          <Spinner />
        ) : (
          <Calendar month={month} reservations={reservations} />
        )}
      </Box>
    </Flex>
  );
};

export default memo(Reservations);
