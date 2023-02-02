import React from "react";

import { Text, Heading, Box, Skeleton } from "@chakra-ui/react";

const ReservationDate = ({
  isLoading,
  date,
}: {
  isLoading: boolean;
  date: string | undefined;
}) => (
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
