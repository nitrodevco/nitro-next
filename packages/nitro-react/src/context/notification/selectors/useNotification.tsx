import { useNotificationContext } from "../useNotificationContext";

export const useNotification = (id: number) => useNotificationContext(x => x.notifications.find(item => item.id === id));
