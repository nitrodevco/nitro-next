import { FriendListWindowRect } from '#base/context/friend';

/** `Util.getLocationRelativeTo(null, ...)`: where an alert opens without the friend list window. */
const NO_WINDOW_POSITION = { x: 300, y: 200 };

/**
 * `AlertView.show`: the alert opens centred on the friend list window
 * (`Util.getLocationRelativeTo(mainWindow, width, height)`).
 */
export const friendListAlertPosition = (window: FriendListWindowRect | null, width: number, height: number) => {
    if (!window) return NO_WINDOW_POSITION;

    return { x: window.x + (0.5 * (window.width - width)), y: window.y + (0.5 * (window.height - height)) };
};
