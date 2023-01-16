import { BackgroundSyncPlugin } from "workbox-background-sync";
import { registerRoute } from "workbox-routing";
import { HTTPMethod } from "workbox-routing/utils/constants";
import { NetworkFirst } from "workbox-strategies";

/**
 * A class implementing the fetchDidFail lifecycle callback. This makes it easier to add failed requests to a background sync Queue.
 * https://developer.chrome.com/docs/workbox/reference/workbox-background-sync/
 * https://developer.chrome.com/docs/workbox/modules/workbox-background-sync/
 */
const backgroundgSyncPlugin = new BackgroundSyncPlugin("bookings");

/**
 * Registers a route with the router.
 * https://developer.chrome.com/docs/workbox/reference/workbox-routing/#method-registerRoute
 */
const registerRouterToBackgroundSync = ({
  route,
  method,
}: {
  route: RegExp;
  method: HTTPMethod;
}) =>
  registerRoute(
    route,
    new NetworkFirst({
      plugins: [backgroundgSyncPlugin],
    }),
    method
  );

export const registerRoutes = () => {
  const escapedBaseUrl = String.raw`${process.env.REACT_APP_BASE_URL}`;

  registerRouterToBackgroundSync({
    route: new RegExp(`${escapedBaseUrl}/bookings\\?month=(\\d)+`),
    method: "GET",
  });
  registerRouterToBackgroundSync({
    route: new RegExp(`${escapedBaseUrl}/bookings/.*`),
    method: "GET",
  });
  registerRouterToBackgroundSync({
    route: new RegExp(`${escapedBaseUrl}/bookings`),
    method: "POST",
  });
  registerRouterToBackgroundSync({
    route: new RegExp(`${escapedBaseUrl}/bookings/.*`),
    method: "DELETE",
  });
};
