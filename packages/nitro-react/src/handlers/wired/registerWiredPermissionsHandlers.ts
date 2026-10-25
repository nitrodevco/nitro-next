/**
 * What `WiredMenuController` learns from the server about this user: the room's wired
 * permissions (`WiredPermissions`, re-sent whenever the room's masks or the user's rights
 * change) and the wired part of `AccountPreferences`. The rest of that packet is the account's
 * business and is handled in `handlers/user/registerUserInfoHandlers.ts`.
 */
import { AccountPreferencesEventMessage, WiredPermissionsEventMessage } from '@nitrodevco/nitro-packets';

import { setWiredPlayTestMode, setWiredUiStyle } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { wiredStore } from '#base/context/wired';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerWiredPermissionsHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setWiredPermissions, setWiredPreferences } = wiredStore.getState();

    return subscribeAll(subscribe, [
        on(WiredPermissionsEventMessage, data => setWiredPermissions(data.canModify, data.canRead)),

        // `onAccountPreferences`. `setPlayTestMode(value)` without `notify` only reaches the room's session: see `WiredPreferencesSlice`.
        on(AccountPreferencesEventMessage, (data) => {
            setWiredPlayTestMode(send, data.playTestMode);
            setWiredPreferences({
                wiredMenuButton: data.wiredMenuButton,
                wiredInspectButton: data.wiredInspectButton,
                wiredWhisperDisabled: data.wiredWhisperDisabled,
                showAllNotifications: data.showAllNotifications,
            });

            setWiredUiStyle(data.wiredUIStyle);
        }),
    ]);
};
