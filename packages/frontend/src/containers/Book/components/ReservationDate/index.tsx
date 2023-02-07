import React from "react";

import { Text, Heading, Box, Input } from "@chakra-ui/react";
import { ReservationDateProps } from "containers/Book/types";

const ReservationDate = ({
  readonlyDate,
  date,
  onChangeDate,
}: ReservationDateProps) => (
  <Box>
    <Heading size="xs" textTransform="uppercase">
      Data
    </Heading>
    {readonlyDate ? (
      <Text>{readonlyDate.toLocaleDateString()}</Text>
    ) : (
      <Input
        value={date}
        onChange={onChangeDate}
        placeholder="Seleziona la data"
        size="md"
        type="date"
      />
    )}
  </Box>
);

export default ReservationDate;
