import { useShallow } from "zustand/shallow";

import { useNotificationContext } from "../useNotificationContext";

export const useNotificationActions = () => useNotificationContext(useShallow(x => ({
    addNotification: x.addNotification,
    setNotificationPhase: x.setNotificationPhase,
    setNotificationHovering: x.setNotificationHovering,
    expireNotification: x.expireNotification,
    clickNotification: x.clickNotification,
    removeNotification: x.removeNotification,
    setNotificationsDisabled: x.setNotificationsDisabled,
    setNotificationContainerHeight: x.setNotificationContainerHeight,
})));
