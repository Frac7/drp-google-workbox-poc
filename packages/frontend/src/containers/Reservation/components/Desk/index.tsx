import React from "react";

import { Text, Heading, Box, Skeleton } from "@chakra-ui/react";
import { DeskProps } from "containers/Reservation/types";

const Desk = ({ desk, isLoading }: DeskProps) => (
  <Box>
    <Skeleton isLoaded={!isLoading}>
      <Heading size="xs" textTransform="uppercase">
        Scrivania
      </Heading>
      <Text>{desk}</Text>
    </Skeleton>
  </Box>
);

export default Desk;
