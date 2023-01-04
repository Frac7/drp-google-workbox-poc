import React, { memo } from "react";
import { useParams } from "react-router-dom";
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
} from "@chakra-ui/react";

const Reservation = () => {
  const params: ReservationRouteParams = useParams();
  const id = params.id;

  const reservation = { date: "2023-01-04", desk: "18", office: "Cagliari" };
  const onDeleteClick = () => {};

  return (
    <Flex m="auto" w={{ md: "100%", lg: "50%" }} direction="column">
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
              <Text>{new Date(reservation.date).toLocaleDateString()}</Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Scrivania
              </Heading>
              <Text>{reservation.desk}</Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Ufficio
              </Heading>
              <Text>{reservation.office}</Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button onClick={onDeleteClick}>Cancella</Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

type ReservationRouteParams = {
  id: string;
};

export default memo(Reservation);
