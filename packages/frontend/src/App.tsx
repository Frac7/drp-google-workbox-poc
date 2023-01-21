import React, { memo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Book from "containers/Book";
import Reservations from "containers/Reservations";
import Reservation from "containers/Reservation";

import { routes } from "config";
import Home from "containers/Home";

const App = () => (
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
);

export default memo(App);
