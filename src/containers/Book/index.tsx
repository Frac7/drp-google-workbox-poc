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

import { BookRouteState } from "./types";
import { routes } from "containers/App/constants";

const Book = () => {
  const history = useHistory();
  const onCancelClick = () => {
    history.goBack();
  };

  const toast = useToast();
  const onBookClick = () => {
    history.push(routes.RESERVATIONS);
    toast({
      title: "Scrivania prenotata",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const location = useLocation();
  const state = location.state as BookRouteState;

  const [desk, setDesk] = useState("");
  const [office, setOffice] = useState("");

  const onChangeDesk = (event: ChangeEvent<HTMLSelectElement>) => {
    event.persist();
    setDesk(event.target.value);
  };
  const onChangeOffice = (event: ChangeEvent<HTMLSelectElement>) => {
    event.persist();
    setOffice(event.target.value);
  };

  const desks = Array(50)
    .fill(0)
    .map((_, i) => i);
  const offices = [
    "Cagliari",
    "Bari",
    "Baronissi",
    "Roma",
    "Firenze",
    "Maranello",
    "Ivrea",
    "Torino",
    "Milano",
  ];

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
                  {desks.map((desk: number) => (
                    <option value={desk}>{desk}</option>
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
                <Select value={office} onChange={onChangeOffice}>
                  {offices.map((office: string) => (
                    <option value={office}>{office}</option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Flex justifyContent="space-between" flex="1">
            <Button onClick={onCancelClick}>Annulla</Button>
            <Button onClick={onBookClick}>Prenota</Button>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default memo(Book);
