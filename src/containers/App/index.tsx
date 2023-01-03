import React, { memo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ReservationFlow from "containers/ReservationFlow";
import ReservationList from "containers/ReservationList";

import { routes } from "./constants";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={routes.RESERVATION_FLOW}>
        <ReservationFlow />
      </Route>
      <Route path={routes.RESERVATION_LIST}>
        <ReservationList />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default memo(App);
