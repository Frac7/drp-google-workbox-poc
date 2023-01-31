import { useToast, CreateToastFnReturn } from "@chakra-ui/react";
import { sendMessageToClient } from "utils/messages";

import { SYNC } from "./constants";

const showSyncToast = (toast: CreateToastFnReturn, event: MessageEvent) => {
  if (event?.data?.type === SYNC) {
    toast({
      position: "top",
      duration: 3000,
      isClosable: true,
      title: "Sync event fired!",
      status: "info",
    });
  }
};

const showOnlineToast = (toast: CreateToastFnReturn, event: Event) => {
  if (event?.type === "online") {
    return toast({
      position: "top",
      duration: 3000,
      isClosable: true,
      title: "Sei online",
      status: "info",
    });
  }
  if (event?.type === "offline") {
    return toast({
      position: "top",
      duration: 3000,
      isClosable: true,
      title: "Sei offline",
      status: "warning",
    });
  }
};

export const useOnlineFeedback = () => {
  const toast = useToast();

  window.addEventListener("online", showOnlineToast.bind(null, toast));
  window.addEventListener("offline", showOnlineToast.bind(null, toast));

  navigator?.serviceWorker?.addEventListener(
    "message",
    showSyncToast.bind(null, toast)
  );
  return () =>
    navigator?.serviceWorker?.removeEventListener(
      "message",
      showSyncToast.bind(null, toast)
    );
};

export function listenForSyncEvents(this: ServiceWorkerGlobalScope) {
  this.addEventListener("sync", (event) => {
    console.log(event);
    sendMessageToClient.call(this, { type: SYNC });
  });
}
