import { BannedUsersFromRoomEventMessage, FlatControllerAddedEventMessage, FlatControllerRemovedEventMessage, FlatControllersEventMessage, RoomSettingsDataEventMessage, RoomSettingsErrorEventMessage, RoomSettingsSavedEventMessage, RoomSettingsSaveErrorEventMessage, UserUnbannedFromRoomEventMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The room settings window's own round trips - `RoomSettingsCtrl`. A save that goes through
 * closes the window; one the server refuses leaves it open with what it said.
 */
export const registerRoomSettingsHandlers = ({ subscribe }: WebSocketConnection) => {
    const {
        setRoomSettingsForm, setRoomSettingsFormError, setRoomSettingsFormSaving,
        setRoomControllers, addRoomController, removeRoomController, setRoomBannedUsers, removeRoomBannedUser,
    } = roomStore.getState();
    const { hideWindow } = systemStore.getState();

    return subscribeAll(subscribe, [
        on(RoomSettingsDataEventMessage, (data) => {
            setRoomSettingsForm(data);
        }),

        on(RoomSettingsSavedEventMessage, () => {
            setRoomSettingsFormSaving(false);
            hideWindow('room_settings');
        }),

        on(RoomSettingsSaveErrorEventMessage, (data) => {
            // The server names the field it refused; the code alone is all there is to show.
            setRoomSettingsFormError(`navigator.roomsettings.save.error.${data.errorCode}`);
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
