import { useShallow } from "zustand/shallow";

import { useNotificationContext } from "../useNotificationContext";

export const useNotificationExtensions = () => useNotificationContext(useShallow(x => x.extensions));
