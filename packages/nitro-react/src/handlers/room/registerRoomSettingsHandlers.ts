import { BannedUsersFromRoomEventMessage, FlatControllerAddedEventMessage, FlatControllerRemovedEventMessage, FlatControllersEventMessage, RoomSettingsDataEventMessage, RoomSettingsErrorEventMessage, RoomSettingsSavedEventMessage, RoomSettingsSaveErrorEventMessage, UserUnbannedFromRoomEventMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { RoomSettingsFormError, roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * `RoomSettingsCtrl.onRoomSettingsSaveError`: the server's code (and, for 16, the field it names;
 * for the tag codes, the tag) turned into the text Flash shows and the input it shows it over.
 * Flash also moves to the field's tab, which the window does for itself from the field.
 */
const roomSettingsSaveError = (errorCode: number, info: string): RoomSettingsFormError => {
    switch (errorCode) {
        case 5: return { key: 'navigator.roomsettings.passwordismandatory', field: 'password' };
        case 7: return { key: 'navigator.roomsettings.roomnameismandatory', field: 'name' };
        case 8: return { key: 'navigator.roomsettings.unacceptablewords', field: 'name' };
        case 10: return { key: 'navigator.roomsettings.unacceptablewords', field: 'description' };
        case 11: return { key: 'navigator.roomsettings.unacceptablewords', field: 'tags', tag: info };
        case 12: return { key: 'navigator.roomsettings.nonuserchoosabletag', field: 'tags', tag: info };
        case 13: return { key: 'navigator.roomsettings.toomanycharacters', field: 'tags', tag: info };
        case 16:
            if (info === 'idleSleepTimeoutSeconds') return { key: 'navigator.roomsettings.idle_sleep_timeout.invalid', field: 'idleSleepTimeout' };
            if (info === 'idleAutokickTimeoutSeconds') return { key: 'navigator.roomsettings.idle_autokick_timeout.invalid', field: 'idleAutokickTimeout' };

            return { key: `navigator.roomsettings.save.error.${errorCode}`, field: 'name' };
        // `"Update failed: error " + code` over the name field in Flash - a key here, so a hotel can word it.
        default: return { key: `navigator.roomsettings.save.error.${errorCode}`, field: 'name' };
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
            setRoomSettingsFormError(roomSettingsSaveError(data.errorCode, data.info));
        }),

        on(RoomSettingsErrorEventMessage, (data) => {
            setRoomSettingsFormError({ key: `navigator.roomsettings.error.${data.errorCode}`, field: 'name' });
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
