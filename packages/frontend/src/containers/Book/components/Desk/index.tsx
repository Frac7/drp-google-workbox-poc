import React from "react";

import { Box, Heading, Select, FormControl, FormLabel } from "@chakra-ui/react";
import { DeskProps } from "containers/Book/types";

const Desk = ({ desks, desk, onChangeDesk }: DeskProps) => (
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
