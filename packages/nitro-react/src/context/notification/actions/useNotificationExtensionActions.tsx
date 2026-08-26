import { useShallow } from "zustand/shallow";

import { useNotificationContext } from "../useNotificationContext";

export const useNotificationExtensionActions = () => useNotificationContext(useShallow(x => ({
    attachExtension: x.attachExtension,
    detachExtension: x.detachExtension,
    revealExtensionLink: x.revealExtensionLink,
})));
