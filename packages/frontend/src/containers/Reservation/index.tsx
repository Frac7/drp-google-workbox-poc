import React, { memo, useEffect, useState } from "react";
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
  useToast,
  Skeleton,
} from "@chakra-ui/react";

import { getReservationById, removeReservationById } from "api/bookings";
import { routes } from "containers/App/constants";
import { Reservation as ReservationType } from "types";

import { ReservationRouteParams } from "./types";

const Reservation = () => {
  const params: ReservationRouteParams = useParams();
  const id = params.id;

  const [reservation, setReservation] = useState<ReservationType | null>(null);
  useEffect(() => {
    getReservationById(id).then(setReservation);
  }, [id]);

  const toast = useToast();
  const history = useHistory();
  const onDeleteClick = () => {
    removeReservationById(id).then(() => {
      history.push(routes.RESERVATIONS);
      toast({
        title: "Prenotazione cancellata",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const onBackClick = () => {
    history.goBack();
  };

  return (
    <Flex m="auto" w={{ md: "100%", lg: "50%" }} direction="column">
      <Card size="lg">
        <CardHeader>
          <Heading size="md">Scrivania prenotata</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Skeleton isLoaded={!!reservation}>
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
              <Skeleton isLoaded={!!reservation}>
                <Heading size="xs" textTransform="uppercase">
                  Scrivania
                </Heading>
                <Text>{reservation?.desk}</Text>
              </Skeleton>
            </Box>
            <Box>
              <Skeleton isLoaded={!!reservation}>
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
            <Button onClick={onDeleteClick}>Cancella</Button>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default memo(Reservation);
