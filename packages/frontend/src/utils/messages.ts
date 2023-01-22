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