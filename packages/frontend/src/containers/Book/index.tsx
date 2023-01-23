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
  Input,
  Spinner,
} from "@chakra-ui/react";

import { routes } from "config";
import { createReservation } from "api/bookings";
import { useMutation, useRequestReplayed } from "utils";

import { BookRouteState } from "./types";
import { desks, offices } from "./mocks";

const Book = () => {
  const history = useHistory();
  const location = useLocation();
  const state = location.state as BookRouteState;

  const [date, setDate] = useState<string>('');
  const onChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setDate(event.target.value);
  };

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
  const { isLoading, mutate } = useMutation(createReservation, { date: state?.date || date, desk }, {
    onSuccess: onBookSuccess,
    errorMessage: "Errore nella prenotazione della scrivania"
  });
  const onBookClick = () => {
    mutate();
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
              {state?.date ?
                <Text>{state.date.toLocaleDateString()}</Text> :
                <Input
                  value={date}
                  onChange={onChangeDate}
                  placeholder="Seleziona la data"
                  size="md"
                  type="date"
                />}
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
            <Button disabled={isLoading} colorScheme="teal" onClick={onBookClick}>Prenota{isLoading && <>&nbsp;<Spinner /></>}</Button>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default memo(Book);
