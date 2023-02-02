import React, { ChangeEventHandler } from "react";

import { Box, Heading, Select, FormControl, FormLabel } from "@chakra-ui/react";

const Desk = ({
  desks,
  desk,
  onChangeDesk,
}: {
  desks: Array<number>;
  desk: number;
  onChangeDesk: ChangeEventHandler<HTMLSelectElement>;
}) => (
  <Box>
    <FormControl isRequired>
      <FormLabel>
        <Heading size="xs" textTransform="uppercase">
          Scrivania
        </Heading>
      </FormLabel>
      <Select value={desk} onChange={onChangeDesk}>
        {desks.map((desk: number, i: number) => (
          <option key={i} value={desk}>
            {desk}
          </option>
        ))}
      </Select>
    </FormControl>
  </Box>
);

export default Desk;
