import { BannedUsersFromRoomEventMessage, FlatControllerAddedEventMessage, FlatControllerRemovedEventMessage, FlatControllersEventMessage, RoomSettingsDataEventMessage, RoomSettingsErrorEventMessage, RoomSettingsSavedEventMessage, RoomSettingsSaveErrorEventMessage, UserUnbannedFromRoomEventMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * `RoomSettingsCtrl.onRoomSettingsSaveError`: the server's code (and, for 16, the field it names)
 * turned into the text Flash shows beside that field. Flash also moves to the field's tab, which
 * the window does for itself from the key this returns.
 */
const roomSettingsSaveErrorKey = (errorCode: number, info: string): string => {
    switch (errorCode) {
        case 5: return 'navigator.roomsettings.passwordismandatory';
        case 7: return 'navigator.roomsettings.roomnameismandatory';
        case 8:
        case 10:
        case 11: return 'navigator.roomsettings.unacceptablewords';
        case 12: return 'navigator.roomsettings.nonuserchoosabletag';
        case 13: return 'navigator.roomsettings.toomanycharacters';
        case 16:
            if (info === 'idleSleepTimeoutSeconds') return 'navigator.roomsettings.idle_sleep_timeout.invalid';
            if (info === 'idleAutokickTimeoutSeconds') return 'navigator.roomsettings.idle_autokick_timeout.invalid';

            return `navigator.roomsettings.save.error.${errorCode}`;
        // `"Update failed: error " + code` in Flash - a key here, so a hotel can word it.
        default: return `navigator.roomsettings.save.error.${errorCode}`;
    }
};

/**
 * The room settings window's own round trips - `RoomSettingsCtrl`. A save the server refuses
 * leaves the window open showing what it said; one that goes through leaves it open too.
 */
export const registerRoomSettingsHandlers = ({ subscribe }: WebSocketConnection) => {
    const {
        setRoomSettingsForm, setRoomSettingsFormError, setRoomSettingsFormSaving,
        setRoomControllers, addRoomController, removeRoomController, setRoomBannedUsers, removeRoomBannedUser,
    } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(RoomSettingsDataEventMessage, (data) => {
            setRoomSettingsForm(data);
        }),

        // `IncomingMessages.onRoomSettingsSaved` reloads the room list and leaves the window open.
        on(RoomSettingsSavedEventMessage, () => {
            setRoomSettingsFormSaving(false);
        }),

        on(RoomSettingsSaveErrorEventMessage, (data) => {
            setRoomSettingsFormError(roomSettingsSaveErrorKey(data.errorCode, data.info));
        }),

        on(RoomSettingsErrorEventMessage, (data) => {
            setRoomSettingsFormError(`navigator.roomsettings.error.${data.errorCode}`);
        }),

        on(FlatControllersEventMessage, (data) => {
            setRoomControllers(data.controllers);
        }),

        // Rights given and taken away come back one at a time rather than as a fresh list.
        on(FlatControllerAddedEventMessage, (data) => {
            addRoomController(data.controller);
        }),

        on(FlatControllerRemovedEventMessage, (data) => {
            removeRoomController(data.userId);
        }),

        on(BannedUsersFromRoomEventMessage, (data) => {
            setRoomBannedUsers(data.bannedUsers);
        }),

        on(UserUnbannedFromRoomEventMessage, (data) => {
            removeRoomBannedUser(data.userId);
        }),
    ]);
};
