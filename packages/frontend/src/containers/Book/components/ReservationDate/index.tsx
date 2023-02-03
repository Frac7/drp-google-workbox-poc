import React, { ChangeEventHandler } from "react";

import { Text, Heading, Box, Input } from "@chakra-ui/react";

const ReservationDate = ({
  readonlyDate,
  date,
  onChangeDate,
}: {
  readonlyDate?: Date;
  date?: string;
  onChangeDate?: ChangeEventHandler<HTMLInputElement>;
}) => (
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
