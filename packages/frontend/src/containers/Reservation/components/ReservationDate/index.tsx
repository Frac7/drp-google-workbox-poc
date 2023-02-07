import React from "react";

import { Text, Heading, Box, Skeleton } from "@chakra-ui/react";
import { ReservationDateProps } from "containers/Reservation/types";

const ReservationDate = ({ isLoading, date }: ReservationDateProps) => (
  <Box>
    <Skeleton isLoaded={!isLoading}>
      <Heading size="xs" textTransform="uppercase">
        Data
      </Heading>
      {date && <Text>{new Date(date).toLocaleDateString()}</Text>}
    </Skeleton>
  </Box>
);

export default ReservationDate;
