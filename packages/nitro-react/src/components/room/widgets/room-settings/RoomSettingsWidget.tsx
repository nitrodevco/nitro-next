import { RoomDoorModeEnum } from '@nitrodevco/nitro-api';
import { AssignRightsComposer, GetBannedUsersFromRoomComposer, GetFlatControllersComposer, GetRoomSettingsComposer, RemoveAllRightsComposer, RemoveRightsComposer, SaveRoomSettingsComposer, UnbanUserFromRoomComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorStore } from '#base/context/navigator';
import { useRoomSettingsFormActions, useRoomStore } from '#base/context/room';
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { useFriends } from '#base/context/user';
import { RoomSettingsView } from '#base/views/room-widgets/room-settings/RoomSettingsView';

/** The first tab, which the window always opens on. */
const FIRST_TAB = 1;

/** The two tabs that need a list from the server before they can show anything. */
const TAB_RIGHTS = 3;
const TAB_MODERATION = 5;

/**
 * The room settings window - `RoomSettingsCtrl`. The form is asked for when the window opens and
 * thrown away when it closes, so a second visit always shows what the server has rather than what
 * was left behind.
 *
 * The password is held here rather than on the form: the server never sends the current one back,
 * so it only travels when it has actually been typed.
 */
export const RoomSettingsWidget = () => {
    const isVisible = useIsWindowVisible('room_settings');
    const roomId = useNavigatorStore(x => x.enteredRoom?.info.roomId ?? 0);
    const form = useRoomStore(x => x.roomSettingsForm);
    const error = useRoomStore(x => x.roomSettingsFormError);
    const saving = useRoomStore(x => x.roomSettingsFormSaving);
    const controllers = useRoomStore(x => x.roomControllers);
    const bannedUsers = useRoomStore(x => x.roomBannedUsers);
    const { setRoomSettingsForm, updateRoomSettingsForm, setRoomSettingsFormSaving } = useRoomSettingsFormActions();
    // The friend list is kept by id; the rights tab wants it as a list to filter.
    const friends = useFriends();
    const { hideWindow } = useWindowActions();
    const { send } = useWebSocketContext();

    const [ tab, setTab ] = useState(FIRST_TAB);
    const [ password, setPassword ] = useState('');
    const [ friendFilter, setFriendFilter ] = useState('');

    useEffect(() => {
        if (!isVisible || !roomId) return;

        send(new GetRoomSettingsComposer({ roomId }));

        return () => {
            // Closing drops the form, so re-opening asks the server again rather than reusing it.
            setRoomSettingsForm(undefined);
        };
    }, [ isVisible, roomId, send, setRoomSettingsForm ]);

    /*
     * The rights and ban lists are asked for when their tab is opened rather than with the rest
     * of the settings, as `RoomSettingsCtrl` did - most visits never look at either.
     */
    useEffect(() => {
        if (!isVisible || !roomId) return;

        if (tab === TAB_RIGHTS) send(new GetFlatControllersComposer({ roomId }));
        if (tab === TAB_MODERATION) send(new GetBannedUsersFromRoomComposer({ roomId }));
    }, [ isVisible, roomId, tab, send ]);

    // A fresh window starts on the first tab with nothing typed into it.
    if (!isVisible && ((tab !== FIRST_TAB) || password.length || friendFilter.length)) {
        setTab(FIRST_TAB);
        setPassword('');
        setFriendFilter('');
    }

    if (!isVisible || !form) return null;

    const save = () => {
        if (saving) return;

        setRoomSettingsFormSaving(true);

        send(new SaveRoomSettingsComposer({
            roomId: form.roomId,
            roomName: form.name,
            roomDescription: form.description,
            doorMode: form.doorMode,
            // Only a password door carries one, and only what was typed here.
            password: (Number(form.doorMode) === Number(RoomDoorModeEnum.Password)) ? password : '',
            maxVisitors: form.maximumVisitors,
            categoryId: form.categoryId,
            tags: form.tags,
            tradeMode: form.tradeMode,
            allowPets: form.allowPets,
            allowFoodConsume: form.allowFoodConsume,
            allowWalkThrough: form.allowWalkThrough,
            hideWalls: form.hideWalls,
            wallThickness: form.wallThickness,
            floorThickness: form.floorThickness,
            whoCanMute: form.moderation.whoCanMute,
            whoCanKick: form.moderation.whoCanKick,
            whoCanBan: form.moderation.whoCanBan,
            chatFloodSensitivity: form.chatFloodSensitivity,
            leaveOnDoorTileEnabled: form.leaveOnDoorTileEnabled,
            idleSleepEnabled: form.idleSleepEnabled,
            idleSleepTimeoutSeconds: form.idleSleepTimeoutSeconds,
            idleAutokickEnabled: form.idleAutokickEnabled,
            idleAutokickTimeoutSeconds: form.idleAutokickTimeoutSeconds,
            muteAllPets: form.muteAllPets,
        }));
    };

    return (
        <RoomSettingsView
            settings={form}
            controllers={controllers}
            bannedUsers={bannedUsers}
            friends={Object.values(friends)}
            friendFilter={friendFilter}
            password={password}
            tab={tab}
            error={error}
            saving={saving}
            onChangeTab={setTab}
            onChange={updateRoomSettingsForm}
            onChangePassword={setPassword}
            onChangeFriendFilter={setFriendFilter}
            onGiveRights={userId => send(new AssignRightsComposer({ userId }))}
            onTakeRights={userId => send(new RemoveRightsComposer({ userIds: [ userId ] }))}
            onTakeAllRights={() => send(new RemoveAllRightsComposer({ roomId: form.roomId }))}
            onUnban={userId => send(new UnbanUserFromRoomComposer({ userId, roomId: form.roomId }))}
            onSave={save}
            onClose={() => hideWindow('room_settings')}
        />
    );
};
