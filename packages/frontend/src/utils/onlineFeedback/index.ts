import {
  useToast,
  CreateToastFnReturn,
  UseToastOptions,
} from "@chakra-ui/react";
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
  const options: UseToastOptions = {
    position: "top",
    duration: 3000,
    isClosable: true,
  };

  if (event?.type === "online") {
    options.status = "info";
    options.title = "Sei online";
  }
  
  if (event?.type === "offline") {
    options.title = "Sei offline";
    options.status = "warning";
  }
  return toast(options);
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
