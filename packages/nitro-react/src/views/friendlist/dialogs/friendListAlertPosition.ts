import { FriendListWindowRect } from '#base/context/friend';

/** `Util.getLocationRelativeTo(null, ...)`: where an alert opens without the friend list window. */
const NO_WINDOW_POSITION = { x: 300, y: 200 };

/**
 * `AlertView.show`: the alert opens centred on the friend list window
 * (`Util.getLocationRelativeTo(mainWindow, width, height)`). The half of an odd difference is cut
 * off as the alert's `x` and `y` take it: `WindowController.set x(int)` / `set y(int)`. A half
 * pixel left the alert drawn blurred over two pixels until a drag snapped it to whole ones.
 */
export const friendListAlertPosition = (window: FriendListWindowRect | null, width: number, height: number) => {
    if (!window) return NO_WINDOW_POSITION;

    return { x: Math.trunc(window.x + (0.5 * (window.width - width))), y: Math.trunc(window.y + (0.5 * (window.height - height))) };
};
