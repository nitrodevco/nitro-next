import { useShallow } from "zustand/shallow";

import { useNotificationContext } from "../useNotificationContext";

export const useNotificationIds = () => useNotificationContext(useShallow(x => x.notifications.map(item => item.id)));
