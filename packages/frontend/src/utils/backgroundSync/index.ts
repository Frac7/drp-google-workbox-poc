import { REQUEST_REPLAYED } from "utils/backgroundSync/constants";
import { useEffect } from "react";
import { BackgroundSyncPlugin } from "workbox-background-sync";
import { registerRoute } from "workbox-routing";
import {
  // NetworkOnly,
  NetworkFirst,
  // CacheFirst,
  // CacheOnly,
} from "workbox-strategies";
import { sendMessageToClient } from "utils/messages";

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
          const request = entries[i].request;
          const response = await fetch(request);
          const jsonData = await response.json();

          await queue.shiftRequest();

          await sendMessageToClient.call(this, {
            type: REQUEST_REPLAYED,
            key: `${request.method}-${request.url}`,
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

  registerRoute(new RegExp(`${escapedBaseUrl}/bookings/(.)+`), handler, "GET");
  registerRoute(new RegExp(`${escapedBaseUrl}/bookings`), handler, "POST");
  registerRoute(new RegExp(`${escapedBaseUrl}/bookings`), handler, "DELETE");
}

/**
 * Hook for listening to messages from SW related to request replay using the ClientAPI
 * https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage
 */
export const useRequestReplayed = ({
  cb,
  key,
}: {
  cb: Function;
  key: string;
}) => {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event?.data?.type === REQUEST_REPLAYED && event?.data?.key === key) {
        cb(event.data.payload);
      }
    };
    navigator?.serviceWorker?.addEventListener("message", listener);
    return () =>
      navigator?.serviceWorker?.removeEventListener("message", listener);
  }, [cb, key]);
};
