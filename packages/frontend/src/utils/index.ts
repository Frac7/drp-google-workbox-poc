import {
  registerRoutes as registerRoutesBackgroundSync,
  useRequestReplayed,
} from "./backgroundSync";
import {
  registerRoutes as registerRoutesBroadcastUpdate,
  useRevalidatedData,
} from "./broadcastUpdate";
import { listenForSyncEvents, useOnlineFeedback } from "./onlineFeedback";
import { useQuery, useMutation } from "./request";

export {
  registerRoutesBackgroundSync,
  useRequestReplayed,
  registerRoutesBroadcastUpdate,
  useRevalidatedData,
  listenForSyncEvents,
  useOnlineFeedback,
  useQuery,
  useMutation,
};
