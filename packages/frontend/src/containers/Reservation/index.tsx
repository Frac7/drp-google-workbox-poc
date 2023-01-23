import React, { memo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  Skeleton,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { getReservationById, removeReservationById } from "api/bookings";
import { routes } from "config";
import { Reservation as ReservationType } from "types";

import { ReservationRouteParams } from "./types";
import { useQuery, useMutation, useRequestReplayed } from "utils";

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
            <Box>
              <Skeleton isLoaded={!isGetLoading}>
                <Heading size="xs" textTransform="uppercase">
                  Data
                </Heading>
                <Text>
                  {reservation?.date &&
                    new Date(reservation.date).toLocaleDateString()}
                </Text>
              </Skeleton>
            </Box>
            <Box>
              <Skeleton isLoaded={!isGetLoading}>
                <Heading size="xs" textTransform="uppercase">
                  Scrivania
                </Heading>
                <Text>{reservation?.desk}</Text>
              </Skeleton>
            </Box>
            <Box>
              <Skeleton isLoaded={!isGetLoading}>
                <Heading size="xs" textTransform="uppercase">
                  Ufficio
                </Heading>
                <Text>Cagliari</Text>
              </Skeleton>
            </Box>
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
