import React, { useState, memo } from "react";
import { Flex } from "@chakra-ui/react";

import Header from "./components/Header";
import Calendar from "./components/Calendar";

import { MONTHS } from "./contants";

const ReservationList = () => {
  const [month, setMonth] = useState(0);
  const onPrev = () =>
    setMonth((currentMonth: number) =>
      Math.max(0, (currentMonth - 1) % MONTHS)
    );
  const onNext = () =>
    setMonth((currentMonth: number) => Math.min(MONTHS - 1, currentMonth + 1));
  const onToday = () => setMonth(new Date().getMonth());

  return (
    <Flex w="max-content" m="auto" direction="column">
      <Header month={month} onPrev={onPrev} onNext={onNext} onToday={onToday} />
      <Calendar month={month} />
    </Flex>
  );
};

export default memo(ReservationList);
