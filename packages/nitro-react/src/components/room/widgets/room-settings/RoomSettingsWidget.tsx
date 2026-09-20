import { RoomDoorModeEnum, SecurityLevelEnum } from '@nitrodevco/nitro-api';
import { AssignRightsComposer, DeleteRoomComposer, GetBannedUsersFromRoomComposer, GetFlatControllersComposer, GetRoomSettingsComposer, RemoveAllRightsComposer, RemoveRightsComposer, SaveRoomSettingsComposer, UnbanUserFromRoomComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorStore } from '#base/context/navigator';
import { useRoomSettingsFormActions, useRoomStore } from '#base/context/room';
import { useHomeRoomId, useIsWindowVisible, useTranslation, useWindowActions } from '#base/context/system';
import { useFriends, useOwnHasClub, useUserStore } from '#base/context/user';
import { RoomSettingsView } from '#base/views/room-widgets/room-settings/RoomSettingsView';

/** The first tab, which the window always opens on. */
const FIRST_TAB = 1;

/** The two tabs that need a list from the server before they can show anything. */
const TAB_ACCESS = 2;
const TAB_RIGHTS = 3;
const TAB_CLUB_AND_CHAT = 4;
const TAB_MODERATION = 5;

/**
 * `RoomSettingsCtrl.MAXIMUM_ROOM_VISITORS` / `HC_MAXIMUM_ROOM_VISITORS`: the highest visitor cap
 * offered without and with club (Flash's `hasVip`, which is `clubLevel >= 1`).
 * Checked against Flash by `scripts/drift/constants.py`.
 */
const MAXIMUM_ROOM_VISITORS = 50;
const HC_MAXIMUM_ROOM_VISITORS = 75;

/** `isIdleSleepTimeoutValid` / `isIdleAutokickTimeoutValid` / `isIdleAutokickOffsetValid`. */
const MIN_IDLE_SLEEP_TIMEOUT_SECONDS = 30;
const MAX_IDLE_SLEEP_TIMEOUT_SECONDS = 3600;
const MIN_IDLE_AUTOKICK_TIMEOUT_SECONDS = 60;
const MAX_IDLE_AUTOKICK_TIMEOUT_SECONDS = 36000;
const MIN_IDLE_AUTOKICK_OFFSET_SECONDS = 30;

/**
 * `RoomSettingsCtrl.refreshMaxVisitors`: the `maxvisitors` steps run from 10 to the cap by 5. The
 * room's own `maximumVisitorsLimit` plays no part in Flash. When the room's current maximum is
 * above the cap Flash appends the cap a second time and selects it - so the cap is what is saved,
 * not the room's larger value. Any other value that is not a step selects the first one.
 */
const visitorStepsFor = (hasClub: boolean): number[] => {
    const steps: number[] = [];
    const cap = hasClub ? HC_MAXIMUM_ROOM_VISITORS : MAXIMUM_ROOM_VISITORS;

    for (let step = 10; step <= cap; step += 5) steps.push(step);

    return steps;
};

/** `onRoomSettingsSaveError` / `handleCustomRoomSettingSaveError`: which tab a refusal belongs on. */
const tabForError = (error: string): number => {
    if (error.startsWith('navigator.roomsettings.password')) return TAB_ACCESS;
    if (error.startsWith('navigator.roomsettings.invalidconfirm')) return TAB_ACCESS;
    if (error.startsWith('navigator.roomsettings.idle_')) return TAB_CLUB_AND_CHAT;

    return FIRST_TAB;
};

/**
 * The room settings window - `RoomSettingsCtrl`. The form is asked for when the window opens and
 * thrown away when it closes, so a second visit always shows what the server has rather than what
 * was left behind.
 *
 * The password pair is held here rather than on the form: the server never sends the current one
 * back, so it only travels when it has actually been typed, and Flash refuses the whole save when
 * the two fields differ.
 */
export const RoomSettingsWidget = () => {
    const isVisible = useIsWindowVisible('room_settings');
    const enteredRoom = useNavigatorStore(x => x.enteredRoom);
    const categories = useNavigatorStore(x => x.flatCategories);
    const roomId = enteredRoom?.info.roomId ?? 0;
    const form = useRoomStore(x => x.roomSettingsForm);
    const error = useRoomStore(x => x.roomSettingsFormError);
    const saving = useRoomStore(x => x.roomSettingsFormSaving);
    const controllers = useRoomStore(x => x.roomControllers);
    const bannedUsers = useRoomStore(x => x.roomBannedUsers);
    const { setRoomSettingsForm, updateRoomSettingsForm, setRoomSettingsFormError, setRoomSettingsFormSaving } = useRoomSettingsFormActions();
    // The friend list is kept by id; the rights tab wants it as a list to filter.
    const friends = useFriends();
    const hasClub = useOwnHasClub();
    const securityLevel = useUserStore(x => x.securityLevel);
    const accountSafetyLocked = useUserStore(x => x.accountSafetyLocked);
    const homeRoomId = useHomeRoomId();
    const { hideWindow, showAlert, showConfirm } = useWindowActions();
    const t = useTranslation();
    const { send } = useWebSocketContext();

    const [ tab, setTab ] = useState(FIRST_TAB);
    const [ password, setPassword ] = useState('');
    const [ passwordConfirm, setPasswordConfirm ] = useState('');
    const [ friendFilter, setFriendFilter ] = useState('');
    const [ selectedBannedUser, setSelectedBannedUser ] = useState(0);
    // The error the tab was last moved for, so a second identical refusal does not move it again.
    const [ shownError, setShownError ] = useState<string>();

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
    if (!isVisible && ((tab !== FIRST_TAB) || password.length || passwordConfirm.length || friendFilter.length || selectedBannedUser)) {
        setTab(FIRST_TAB);
        setPassword('');
        setPasswordConfirm('');
        setFriendFilter('');
        setSelectedBannedUser(0);
    }

    // `onRoomSettingsSaveError` shows the refusal on the tab the field it names lives on.
    if (error !== shownError) {
        setShownError(error);

        if (error) setTab(tabForError(error));
    }

    if (!isVisible || !form) return null;

    const groupId = enteredRoom?.info.groupId ?? -1;
    const visitorSteps = visitorStepsFor(hasClub);
    const visitorCap = visitorSteps[visitorSteps.length - 1];
    // `refreshMaxVisitors`: a room over the cap shows - and therefore saves - the cap itself.
    const selectedVisitors = visitorSteps.includes(form.maximumVisitors)
        ? form.maximumVisitors
        : ((form.maximumVisitors > visitorCap) ? visitorCap : visitorSteps[0]);

    /** `onDeleteButtonClick`: the home room and a group's base room cannot be deleted. */
    const deleteRoom = () => {
        if (form.roomId === homeRoomId) {
            showAlert(t('navigator.delete.homeroom.title'), t('navigator.delete.homeroom.body'));

            return;
        }

        if (groupId > 0) {
            showAlert(t('group.deletebase.title'), t('group.deletebase.body'));

            return;
        }

        showConfirm(t('navigator.roomsettings'), t('navigator.roomsettings.deleteroom.confirm.message', '', { room_name: form.name }), () => {
            send(new DeleteRoomComposer({ roomId: form.roomId }));
            hideWindow('room_settings');
        });
    };

    /** `RoomSettingsCtrl.save` - every rule that can refuse the save, in its order. */
    const save = () => {
        if (saving) return;

        const isPasswordDoor = Number(form.doorMode) === Number(RoomDoorModeEnum.Password);

        if (isPasswordDoor && (password !== passwordConfirm)) {
            setTab(TAB_ACCESS);
            setRoomSettingsFormError('navigator.roomsettings.invalidconfirm');

            return;
        }

        /*
         * The idle timeouts are only read - and only sent - for a club member; for anyone else the
         * whole behaviour block goes back as the server sent it, which is what the disabled
         * controls still hold (`refreshRoomBehaviorSettingsState` never lets them be changed).
         */
        if (hasClub) {
            const sleepTimeout = form.idleSleepEnabled ? form.idleSleepTimeoutSeconds : 0;
            const autokickTimeout = form.idleAutokickEnabled ? form.idleAutokickTimeoutSeconds : 0;

            if (form.idleSleepEnabled && ((sleepTimeout < MIN_IDLE_SLEEP_TIMEOUT_SECONDS) || (sleepTimeout > MAX_IDLE_SLEEP_TIMEOUT_SECONDS))) {
                setTab(TAB_CLUB_AND_CHAT);
                setRoomSettingsFormError('navigator.roomsettings.idle_sleep_timeout.invalid');

                return;
            }

            if (form.idleAutokickEnabled && ((autokickTimeout < MIN_IDLE_AUTOKICK_TIMEOUT_SECONDS) || (autokickTimeout > MAX_IDLE_AUTOKICK_TIMEOUT_SECONDS))) {
                setTab(TAB_CLUB_AND_CHAT);
                setRoomSettingsFormError('navigator.roomsettings.idle_autokick_timeout.invalid');

                return;
            }

            // The kick has to come at least half a minute after the sleep, or neither is applied.
            if (form.idleSleepEnabled && form.idleAutokickEnabled && (autokickTimeout < (sleepTimeout + MIN_IDLE_AUTOKICK_OFFSET_SECONDS))) {
                setTab(TAB_CLUB_AND_CHAT);
                setRoomSettingsFormError('navigator.roomsettings.idle_autokick_timeout.offset.invalid');

                return;
            }
        }

        setRoomSettingsFormError(undefined);
        setRoomSettingsFormSaving(true);

        send(new SaveRoomSettingsComposer({
            roomId: form.roomId,
            roomName: form.name,
            roomDescription: form.description,
            doorMode: form.doorMode,
            // Only a password door carries one, and only what was typed here.
            password: isPasswordDoor ? password : '',
            maxVisitors: selectedVisitors,
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
            idleSleepTimeoutSeconds: form.idleSleepEnabled ? form.idleSleepTimeoutSeconds : 0,
            idleAutokickEnabled: form.idleAutokickEnabled,
            idleAutokickTimeoutSeconds: form.idleAutokickEnabled ? form.idleAutokickTimeoutSeconds : 0,
            muteAllPets: form.muteAllPets,
        }));
    };

    return (
        <RoomSettingsView
            settings={form}
            categories={categories}
            controllers={controllers}
            bannedUsers={bannedUsers}
            selectedBannedUser={selectedBannedUser}
            friends={Object.values(friends)}
            friendFilter={friendFilter}
            password={password}
            passwordConfirm={passwordConfirm}
            visitorSteps={visitorSteps}
            selectedVisitors={selectedVisitors}
            hasClub={hasClub}
            isGroupRoom={groupId > 0}
            // `prepareWindow`: the delete link only exists while standing in the room it would delete.
            canDelete={!!enteredRoom && (enteredRoom.info.roomId === form.roomId)}
            deleteDisabled={accountSafetyLocked}
            isStaff={Number(securityLevel) >= Number(SecurityLevelEnum.Employee)}
            tab={tab}
            error={error}
            saving={saving}
            onChangeTab={setTab}
            onChange={updateRoomSettingsForm}
            onChangePassword={setPassword}
            onChangePasswordConfirm={setPasswordConfirm}
            onChangeFriendFilter={setFriendFilter}
            onGiveRights={userId => send(new AssignRightsComposer({ userId }))}
            onTakeRights={userId => send(new RemoveRightsComposer({ userIds: [ userId ] }))}
            onTakeAllRights={() => showConfirm(t('navigator.flatctrls.removeconfirm.title'), t('navigator.flatctrls.removeconfirm.info'), () => send(new RemoveAllRightsComposer({ roomId: form.roomId })))}
            onSelectBannedUser={setSelectedBannedUser}
            // `onUnbanClick`: nothing happens until a row has been picked out.
            onUnban={() => selectedBannedUser && send(new UnbanUserFromRoomComposer({ userId: selectedBannedUser, roomId: form.roomId }))}
            onDeleteRoom={deleteRoom}
            onSave={save}
            onClose={() => hideWindow('room_settings')}
        />
    );
};
