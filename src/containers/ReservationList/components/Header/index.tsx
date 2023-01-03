import React from "react";
import { Flex, Button, Text, Center } from "@chakra-ui/react";

import { monthNames } from "containers/ReservationList/contants";

const Header = ({ month, onPrev, onNext, onToday }: HeaderProps) => {
  return (
    <Flex justifyContent="space-between">
      <Flex justifyContent="space-evenly" alignItems="center">
        <Button onClick={onPrev}>&lt;</Button>
        <Center w="100px">
          <Text>{monthNames[month]}</Text>
        </Center>
        <Button onClick={onNext}>&gt;</Button>
      </Flex>
      <Text>{new Date().toLocaleDateString()}</Text>
      <Button onClick={onToday}>Oggi</Button>
    </Flex>
  );
};

type HeaderProps = {
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
};

export default Header;
