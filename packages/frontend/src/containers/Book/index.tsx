import React, { ChangeEvent, memo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
  Heading,
  Stack,
  StackDivider,
  Box,
  Select,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

import { routes } from "config";
import { createReservation } from "api/bookings";
import { useRequestReplayed } from "utils";

import { BookRouteState } from "./types";
import { desks, offices } from "./mocks";

const Book = () => {
  const history = useHistory();
  const location = useLocation();
  const state = location.state as BookRouteState;

  const [desk, setDesk] = useState<number>(0);
  const onChangeDesk = (event: ChangeEvent<HTMLSelectElement>) => {
    event.persist();
    setDesk(parseInt(event.target.value));
  };

  const onCancelClick = () => {
    history.goBack();
  };

  const toast = useToast();
  const onBookSuccess = () => {
    history.push(routes.RESERVATIONS);
    toast({
      position: 'top',
      title: "Scrivania prenotata",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }
  const onBookError = () => {
    toast({
      position: 'top',
      title: "In attesa della rete per prenotare la scrivania...",
      status: "loading",
      duration: 3000,
      isClosable: true,
    });
  }
  const onBookClick = () => {
    createReservation({ date: state.date, desk }).then(onBookSuccess).catch(onBookError);
  };

  useRequestReplayed(onBookSuccess);

  return (
    <Flex m="4rem auto" w={{ sm: "100%", lg: "50%" }} direction="column">
      <Card size="lg">
        <CardHeader>
          <Heading size="md">Prenotazione della scrivania</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Data
              </Heading>
              <Text>{state.date.toLocaleDateString()}</Text>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>
                  <Heading size="xs" textTransform="uppercase">
                    Scrivania
                  </Heading>
                </FormLabel>
                <Select value={desk} onChange={onChangeDesk}>
                  {desks.map((desk: number, i: number) => (
                    <option key={i} value={desk}>{desk}</option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>
                  <Heading size="xs" textTransform="uppercase">
                    Ufficio
                  </Heading>
                </FormLabel>
                <Select>
                  {offices.map((office: string, i: number) => (
                    <option key={i} selected value={office}>
                      {office}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Flex justifyContent="space-between" flex="1">
            <Button onClick={onCancelClick}>Annulla</Button>
            <Button colorScheme="teal" onClick={onBookClick}>Prenota</Button>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default memo(Book);
