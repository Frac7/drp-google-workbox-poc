import { BackgroundSyncPlugin } from "workbox-background-sync";
import { registerRoute } from "workbox-routing";
import { HTTPMethod } from "workbox-routing/utils/constants";
import { NetworkOnly } from "workbox-strategies";

/**
 * A class implementing the fetchDidFail lifecycle callback. This makes it easier to add failed requests to a background sync Queue.
 * https://developer.chrome.com/docs/workbox/reference/workbox-background-sync/
 * https://developer.chrome.com/docs/workbox/modules/workbox-background-sync/
 */
const backgroundgSyncPlugin = new BackgroundSyncPlugin("bookings", {
  maxRetentionTime: 5, // Retry for max of 5 minutes,
  onSync: (options) => {
    console.log("onSync", options);
  },
});

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
    new NetworkOnly({
      plugins: [backgroundgSyncPlugin],
    }),
    method
  );

export const registerRoutes = () => {
  registerRouterToBackgroundSync({ route: /bookings\*/, method: "GET" });
  registerRouterToBackgroundSync({ route: /bookings\*/, method: "POST" });
  registerRouterToBackgroundSync({ route: /bookings\*/, method: "PUT" });
  registerRouterToBackgroundSync({ route: /bookings\*/, method: "DELETE" });
};
