import React, { memo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { getReservationById, removeReservationById } from "api/bookings";
import { routes } from "config";
import { Reservation as ReservationType } from "types";

import { ReservationRouteParams } from "./types";
import { useQuery, useMutation, useRequestReplayed } from "utils";

import ReservationDate from "./components/ReservationDate";
import Desk from "./components/Desk";

const Reservation = () => {
  const history = useHistory();
  const params: ReservationRouteParams = useParams();
  const id = params.id;

  const onBackClick = () => {
    history.goBack();
  };

  const toast = useToast();
  const onDeleteSuccess = () => {
    history.push(routes.RESERVATIONS);
    toast({
      position: "top",
      title: "Prenotazione cancellata",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const [reservation, setReservation] = useState<ReservationType | null>(null);
  const { isLoading: isGetLoading } = useQuery(getReservationById, id, {
    onSuccess: setReservation,
    errorMessage: "Errore nel caricamento della prenotazione",
  });
  const { isLoading: isDeleteLoading, mutate } = useMutation(
    removeReservationById,
    id,
    {
      onSuccess: onDeleteSuccess,
      errorMessage: "Errore nella cancellazione della prenotazione",
    }
  );

  const onDeleteClick = () => {
    mutate();
  };

  useRequestReplayed(onDeleteSuccess);

  return (
    <Flex m="4rem auto" w={{ sm: "100%", lg: "50%" }} direction="column">
      <Card size="lg">
        <CardHeader>
          <Heading size="md">Scrivania prenotata</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <ReservationDate
              isLoading={isGetLoading}
              date={reservation?.date}
            />
            <Desk desk={reservation?.desk} isLoading={isGetLoading} />
          </Stack>
        </CardBody>
        <CardFooter>
          <Flex justifyContent="space-between" flex="1">
            <Button onClick={onBackClick}>Indietro</Button>
            <Button
              disabled={isGetLoading || isDeleteLoading}
              colorScheme="red"
              onClick={onDeleteClick}
            >
              Rimuovi
              {isDeleteLoading && (
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

export default memo(Reservation);
