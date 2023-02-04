import React, { ChangeEvent, memo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Stack,
  StackDivider,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import { routes } from "config";
import { createReservation } from "api/bookings";
import { useMutation, useRequestReplayed } from "utils";

import { BookRouteState } from "./types";
import { desks } from "./mocks";
import ReservationDate from "./components/ReservationDate";
import Desk from "./components/Desk";
import { CREATE_RESERVATION } from "./constants";

const Book = () => {
  const history = useHistory();
  const location = useLocation();
  const state = location.state as BookRouteState;

  const [date, setDate] = useState<string>("");
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
      position: "top",
      title: "Scrivania prenotata",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const { isLoading, mutate } = useMutation(
    createReservation,
    { date: state?.date || date, desk },
    {
      onSuccess: onBookSuccess,
      errorMessage: "Errore nella prenotazione della scrivania",
    }
  );
  const onBookClick = () => {
    mutate();
  };

  useRequestReplayed({ cb: onBookSuccess, key: CREATE_RESERVATION });

  return (
    <Flex m="4rem auto" w={{ sm: "100%", lg: "50%" }} direction="column">
      <Card size="lg">
        <CardHeader>
          <Heading size="md">Prenotazione della scrivania</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <ReservationDate
              readonlyDate={state?.date}
              date={date}
              onChangeDate={onChangeDate}
            />
            <Desk desks={desks} desk={desk} onChangeDesk={onChangeDesk} />
          </Stack>
        </CardBody>
        <CardFooter>
          <Flex justifyContent="space-between" flex="1">
            <Button onClick={onCancelClick}>Annulla</Button>
            <Button
              disabled={isLoading}
              colorScheme="teal"
              onClick={onBookClick}
            >
              Prenota
              {isLoading && (
                <>
                  &nbsp;
                  <Spinner />
                </>
              )}
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default memo(Book);
