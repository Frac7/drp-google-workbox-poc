import React from "react";

import { Text, Heading, Box, Skeleton } from "@chakra-ui/react";

const Desk = ({
  desk,
  isLoading,
}: {
  desk: number | undefined;
  isLoading: boolean;
}) => (
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
