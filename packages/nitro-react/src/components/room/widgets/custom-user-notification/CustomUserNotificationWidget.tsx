import { useRoomCustomUserNotificationActions, useRoomStore } from '#base/context/room';
import { CustomUserNotificationView } from '#base/views/room-widgets/custom-user-notification/CustomUserNotificationView';

/** `RWE_CUSTOM_USER_NOTIFICATION`: the window the last `CustomUserNotification` opened, if any. */
export const CustomUserNotificationWidget = () => {
    const type = useRoomStore(x => x.customUserNotification);
    const { closeCustomUserNotification } = useRoomCustomUserNotificationActions();

    if (!type) return null;

    return (
        <CustomUserNotificationView
            type={type}
            onClose={closeCustomUserNotification}
        />
    );
};
