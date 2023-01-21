import React, { memo } from "react";
import { Flex, Button, Text, Center } from "@chakra-ui/react";

import { monthNames } from "containers/Reservations/constants";
import { HeaderProps } from "containers/Reservations/types";

const Header = ({ month, onPrev, onNext, onToday }: HeaderProps) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
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

export default memo(Header);
