/** Mounts the friend bar's epic popup while `registerSingularNotificationHandlers` holds one up. */
import { useSingularNotificationActions, useSingularNotificationStore } from '#base/context/singular-notifications';
import { EpicPopupView } from '#base/views/notifications/EpicPopupView';

export const EpicPopupComponent = () => {
    const imageUri = useSingularNotificationStore(x => x.epicPopupImageUri);
    const { closeEpicPopup } = useSingularNotificationActions();

    if (imageUri === undefined) return null;

    return (
        <EpicPopupView
            key={imageUri}
            imageUri={imageUri}
            onClose={closeEpicPopup}
        />
    );
};
