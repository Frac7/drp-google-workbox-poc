import {
  registerRoutes as registerRoutesBackgroundSync,
  useRequestReplayed,
} from "./backgroundSync";
import {
  registerRoutes as registerRoutesBroadcastUpdate,
  useRevalidatedData,
} from "./broadcastUpdate";

export {
  registerRoutesBackgroundSync,
  useRequestReplayed,
  registerRoutesBroadcastUpdate,
  useRevalidatedData,
};
