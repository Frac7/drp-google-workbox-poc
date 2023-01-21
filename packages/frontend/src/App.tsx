import React, { memo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Home from "containers/Home";
import Book from "containers/Book";
import Reservations from "containers/Reservations";
import Reservation from "containers/Reservation";

import { routes } from "config";

const App = () => (
  <Box m="1rem">
    <BrowserRouter>
      <Switch>
        <Route path={routes.BOOK}>
          <Book />
        </Route>
        <Route path={routes.RESERVATION}>
          <Reservation />
        </Route>
        <Route path={routes.RESERVATIONS}>
          <Reservations />
        </Route>
        <Route path={routes.HOME}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  </Box>
);

export default memo(App);
