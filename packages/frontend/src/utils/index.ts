import {
  registerRoutes as registerRoutesBackgroundSync,
  useRequestReplayed,
} from "./backgroundSync";
import {
  registerRoutes as registerRoutesBroadcastUpdate,
  useRevalidatedData,
} from "./broadcastUpdate";

import { useQuery, useMutation } from "./request";

export {
  registerRoutesBackgroundSync,
  useRequestReplayed,
  registerRoutesBroadcastUpdate,
  useRevalidatedData,
  useQuery,
  useMutation,
};
