import { REQUEST_REPLAYED } from "global/constants";
import { useEffect } from "react";
import { BackgroundSyncPlugin } from "workbox-background-sync";
import { registerRoute } from "workbox-routing";
import {
  NetworkOnly,
  NetworkFirst,
  CacheFirst,
  CacheOnly,
} from "workbox-strategies";

/**
 * A class implementing the fetchDidFail lifecycle callback. This makes it easier to add failed requests to a background sync Queue.
 * https://developer.chrome.com/docs/workbox/reference/workbox-background-sync/
 *
 * When you send data to a web server, sometimes the requests will fail.
 * It may be because the user has lost connectivity, or it may be because the server is down; in either case you often want to try sending the requests again later.
 * https://developer.chrome.com/docs/workbox/modules/workbox-background-sync/
 */
function getBackgroundSyncPlugin(this: ServiceWorkerGlobalScope) {
  return new BackgroundSyncPlugin("bookings", {
    // If this callback is not specified, the browser replays the request on its own
    onSync: async ({ queue }) => {
      let entries = await queue.getAll();
      // Explicit replay requests
      for (let i = 0; i < entries.length; i++) {
        try {
          const response = await fetch(entries[i].request);
          const jsonData = await response.json();

          await queue.shiftRequest();

          await sendMessageToClient.call(this, {
            type: REQUEST_REPLAYED,
            payload: jsonData,
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
  });
}

/**
 * Registers a route with the router.
 * https://developer.chrome.com/docs/workbox/reference/workbox-routing/#method-registerRoute
 */
export function registerRoutes(this: ServiceWorkerGlobalScope) {
  const escapedBaseUrl = String.raw`${process.env.REACT_APP_BASE_URL}`;

  const plugins = [getBackgroundSyncPlugin.call(this)];
  // const handler = new CacheOnly({
  //   plugins,
  // });
  // const handler = new CacheFirst({
  //   plugins,
  // });
  // const handler = new NetworkOnly({
  //   plugins,
  // });
  const handler = new NetworkFirst({
    plugins,
  });

  registerRoute(
    new RegExp(`${escapedBaseUrl}/bookings\\?month=(\\d)+`),
    handler,
    "GET"
  );
}

/**
 * Implementation of SW -> Client communication using messages from ClientAPI
 * https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage
 */
export function sendMessageToClient(
  this: ServiceWorkerGlobalScope,
  message: { type: string; payload: object }
) {
  return this.clients
    .matchAll({ includeUncontrolled: true, type: "window" })
    .then((clients: readonly WindowClient[]) =>
      clients?.forEach((client: WindowClient) => client.postMessage(message))
    );
}

/**
 * Hook for listening to messages from SW related to request replay using the ClientAPI
 * https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage
 */
export const useRequestReplayed = (setData: Function) => {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event?.data?.type === REQUEST_REPLAYED) {
        setData(event.data.payload);
      }
    };
    navigator.serviceWorker.addEventListener("message", listener);
    return () =>
      navigator.serviceWorker.removeEventListener("message", listener);
  }, [setData]);
};
