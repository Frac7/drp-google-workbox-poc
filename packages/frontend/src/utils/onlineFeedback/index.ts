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

  const onlineListener = showOnlineToast.bind(null, toast);
  window.addEventListener("online", onlineListener);
  window.addEventListener("offline", onlineListener);

  const syncListener = showSyncToast.bind(null, toast);
  navigator?.serviceWorker?.addEventListener("message", syncListener);
  return () => {
    navigator?.serviceWorker?.removeEventListener("message", syncListener);
    window.removeEventListener("online", onlineListener);
    window.removeEventListener("offline", onlineListener);
  };
};

export function listenForSyncEvents(this: ServiceWorkerGlobalScope) {
  this.addEventListener("sync", (event) => {
    console.log(event);
    sendMessageToClient.call(this, { type: SYNC });
  });
}
