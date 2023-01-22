import { useEffect } from "react";
import { BroadcastUpdatePlugin } from "workbox-broadcast-update";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { CACHE_UPDATED } from "./constants";

/**
 * Registers a route with the router.
 * https://developer.chrome.com/docs/workbox/reference/workbox-routing/#method-registerRoute
 */
export function registerRoutes(this: ServiceWorkerGlobalScope) {
  const escapedBaseUrl = String.raw`${process.env.REACT_APP_BASE_URL}`;

  /**
   * This plugin will automatically broadcast a message whenever a cached response is updated.
   * https://developer.chrome.com/docs/workbox/reference/workbox-broadcast-update/
   *
   * When responding to requests with cached entries, while being fast, it comes with a tradeoff that users may end up seeing stale data.
   * https://developer.chrome.com/docs/workbox/modules/workbox-broadcast-update/
   */
  const plugins = [
    new BroadcastUpdatePlugin({
      // Payload customization for the CACHE_UPDATED message
      generatePayload: ({ newResponse }) => {
        return newResponse;
      },
    }),
  ];
  const handler = new StaleWhileRevalidate({
    plugins,
  });

  registerRoute(
    new RegExp(`${escapedBaseUrl}/bookings\\?month=(\\d)+`),
    handler,
    "GET"
  );
}

/**
 * Hook for listening to messages from SW related to cached response update using the ClientAPI
 * https://developer.chrome.com/docs/workbox/modules/workbox-broadcast-update/#using-broadcast-update
 */
export const useRevalidatedData = (cb: Function) => {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      console.log(event);
      if (event?.data?.type === CACHE_UPDATED) {
        event.data.payload
          .json()
          .then((res: { [key: number]: string }) => cb(res));
      }
    };
    navigator?.serviceWorker?.addEventListener("message", listener);
    return () =>
      navigator?.serviceWorker?.removeEventListener("message", listener);
  }, [cb]);
};
