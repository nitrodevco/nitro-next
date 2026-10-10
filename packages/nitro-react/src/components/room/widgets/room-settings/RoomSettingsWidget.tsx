import { RoomDoorModeEnum } from '@nitrodevco/nitro-api';
import { AssignRightsComposer, DeleteRoomComposer, GetBannedUsersFromRoomComposer, GetFlatControllersComposer, GetRoomSettingsComposer, RemoveAllRightsComposer, RemoveRightsComposer, RoomSettingsDataEventMessageType, SaveRoomSettingsComposer, UnbanUserFromRoomComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorStore } from '#base/context/navigator';
import { RoomSettingsErrorField, RoomSettingsFormError, useRoomSettingsFormActions, useRoomStore } from '#base/context/room';
import { useHomeRoomId, useIsWindowVisible, useTranslation, useWindowActions, useWindowParams } from '#base/context/system';
import { ClientGates, useClientGate, useFriends, useOwnHasClub, useUserStore } from '#base/context/user';
import { ROOM_SETTINGS_TAB_ACCESS, ROOM_SETTINGS_TAB_RIGHTS, RoomSettingsView } from '#base/views/room-widgets/room-settings/RoomSettingsView';

/** The first tab, which the window always opens on. */
const FIRST_TAB = 1;

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

/** `onRoomSettingsSaveError` / `save`: the tab of the field a refusal is shown on (`switchToTab`). */
const tabForField = (field: RoomSettingsErrorField): number => {
    if ((field === 'password') || (field === 'passwordConfirm')) return ROOM_SETTINGS_TAB_ACCESS;
    if ((field === 'idleSleepTimeout') || (field === 'idleAutokickTimeout')) return TAB_CLUB_AND_CHAT;

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
 *
 * There is no Save button, as in Flash: a pick saves at once and a text field saves when it is left
 * (`onUnfocus`), and a refusal is shown over the field it is about.
 */
export const RoomSettingsWidget = () => {
    const isVisible = useIsWindowVisible('room_settings');
    const params = useWindowParams('room_settings');
    const enteredRoom = useNavigatorStore(x => x.enteredRoom);
    const categories = useNavigatorStore(x => x.flatCategories);
    // `startRoomSettingsEditFromNavigator(flatId, groupId)` names the room; `startRoomSettingsEdit` is the one you are in.
    const roomId = params.roomId ?? enteredRoom?.info.roomId ?? 0;
    const groupId = (params.roomId !== undefined) ? (params.groupId ?? -1) : (enteredRoom?.info.groupId ?? -1);
    // `_removeTabsForNavigatorView`: any room but the one you are standing in.
    const removeTabsForNavigatorView = !enteredRoom || (enteredRoom.info.roomId !== roomId);
    const storedForm = useRoomStore(x => x.roomSettingsForm);
    // `onRoomSettings`: settings for any room but the one asked for are not this window's.
    const form = (storedForm && (storedForm.roomId === roomId)) ? storedForm : undefined;
    const error = useRoomStore(x => x.roomSettingsFormError);
    const controllers = useRoomStore(x => x.roomControllers);
    const bannedUsers = useRoomStore(x => x.roomBannedUsers);
    const { setRoomSettingsForm, updateRoomSettingsForm, setRoomSettingsFormError, setRoomSettingsFormSaving } = useRoomSettingsFormActions();
    // The friend list is kept by id; the rights tab wants it as a list to filter.
    const friends = useFriends();
    const hasClub = useOwnHasClub();
    const isStaff = useClientGate(ClientGates.RoomSettingsStaff);
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
    // The refusal the tab was last moved for: each refusal moves it once, as `switchToTab` does.
    const [ shownError, setShownError ] = useState<RoomSettingsFormError>();
    // The room the window was last showing: another one starts it afresh (`close()` then the new edit).
    const [ shownRoomId, setShownRoomId ] = useState(roomId);

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

        if (tab === ROOM_SETTINGS_TAB_RIGHTS) send(new GetFlatControllersComposer({ roomId }));
        if (tab === TAB_MODERATION) send(new GetBannedUsersFromRoomComposer({ roomId }));
    }, [ isVisible, roomId, tab, send ]);

    if (roomId !== shownRoomId) {
        setShownRoomId(roomId);
        setTab(FIRST_TAB);
        setPassword('');
        setPasswordConfirm('');
        setFriendFilter('');
        setSelectedBannedUser(0);
    }

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

        if (error) setTab(tabForField(error.field));
    }

    if (!isVisible || !form) return null;

    const visitorSteps = visitorStepsFor(hasClub);
    const visitorCap = visitorSteps[visitorSteps.length - 1];
    // `refreshMaxVisitors`: a room over the cap shows - and therefore saves - the cap itself; any other value that is not a step, the first.
    const selectedVisitorsFor = (maximumVisitors: number) => (visitorSteps.includes(maximumVisitors)
        ? maximumVisitors
        : ((maximumVisitors > visitorCap) ? visitorCap : visitorSteps[0]));
    const selectedVisitors = selectedVisitorsFor(form.maximumVisitors);

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

    /**
     * `isRoomBehaviorSettingsReadyForSave`: a room behaviour switch only saves once both timeouts
     * it turns on are in range - until then it waits, without an error, for the field to be fixed.
     */
    const behaviourError = (next: RoomSettingsDataEventMessageType): RoomSettingsFormError | undefined => {
        if (!hasClub) return undefined;

        const sleepTimeout = next.idleSleepEnabled ? next.idleSleepTimeoutSeconds : 0;
        const autokickTimeout = next.idleAutokickEnabled ? next.idleAutokickTimeoutSeconds : 0;

        if (next.idleSleepEnabled && ((sleepTimeout < MIN_IDLE_SLEEP_TIMEOUT_SECONDS) || (sleepTimeout > MAX_IDLE_SLEEP_TIMEOUT_SECONDS))) return { key: 'navigator.roomsettings.idle_sleep_timeout.invalid', field: 'idleSleepTimeout' };

        if (next.idleAutokickEnabled && ((autokickTimeout < MIN_IDLE_AUTOKICK_TIMEOUT_SECONDS) || (autokickTimeout > MAX_IDLE_AUTOKICK_TIMEOUT_SECONDS))) return { key: 'navigator.roomsettings.idle_autokick_timeout.invalid', field: 'idleAutokickTimeout' };

        // The kick has to come at least half a minute after the sleep, or neither is applied.
        if (next.idleSleepEnabled && next.idleAutokickEnabled && (autokickTimeout < (sleepTimeout + MIN_IDLE_AUTOKICK_OFFSET_SECONDS))) return { key: 'navigator.roomsettings.idle_autokick_timeout.offset.invalid', field: 'idleAutokickTimeout' };

        return undefined;
    };

    /**
     * `RoomSettingsCtrl.save` - every rule that can refuse the save, in its order - over the form
     * with `changes` on top: a pick saves in the same handler that makes it, before the store has
     * re-rendered.
     */
    const save = (changes: Partial<RoomSettingsDataEventMessageType> = {}) => {
        const next = { ...form, ...changes };
        const isPasswordDoor = Number(next.doorMode) === Number(RoomDoorModeEnum.Password);

        if (isPasswordDoor && (password !== passwordConfirm)) {
            setRoomSettingsFormError({ key: 'navigator.roomsettings.invalidconfirm', field: 'passwordConfirm' });

            return;
        }

        /*
         * The idle timeouts are only read - and only sent - for a club member; for anyone else the
         * whole behaviour block goes back as the server sent it, which is what the disabled
         * controls still hold (`refreshRoomBehaviorSettingsState` never lets them be changed).
         */
        const refused = behaviourError(next);

        if (refused) {
            setRoomSettingsFormError(refused);

            return;
        }

        // `clearErrors`: a save that is sent takes every marked field back to normal.
        setRoomSettingsFormError(undefined);
        setRoomSettingsFormSaving(true);

        send(new SaveRoomSettingsComposer({
            roomId: next.roomId,
            roomName: next.name,
            roomDescription: next.description,
            doorMode: next.doorMode,
            // Only a password door carries one, and only what was typed here.
            password: isPasswordDoor ? password : '',
            // `save()` reads the menu's selection, so the capped value is what is sent.
            maxVisitors: selectedVisitorsFor(next.maximumVisitors),
            categoryId: next.categoryId,
            tags: next.tags,
            tradeMode: next.tradeMode,
            allowPets: next.allowPets,
            allowFoodConsume: next.allowFoodConsume,
            allowWalkThrough: next.allowWalkThrough,
            hideWalls: next.hideWalls,
            wallThickness: next.wallThickness,
            floorThickness: next.floorThickness,
            whoCanMute: next.moderation.whoCanMute,
            whoCanKick: next.moderation.whoCanKick,
            whoCanBan: next.moderation.whoCanBan,
            chatFloodSensitivity: next.chatFloodSensitivity,
            leaveOnDoorTileEnabled: next.leaveOnDoorTileEnabled,
            idleSleepEnabled: next.idleSleepEnabled,
            idleSleepTimeoutSeconds: next.idleSleepEnabled ? next.idleSleepTimeoutSeconds : 0,
            idleAutokickEnabled: next.idleAutokickEnabled,
            idleAutokickTimeoutSeconds: next.idleAutokickEnabled ? next.idleAutokickTimeoutSeconds : 0,
            muteAllPets: next.muteAllPets,
        }));
    };

    /** `onUnfocus` on a dropmenu, switch or door mode: the pick is made and saved at once. */
    const selectSetting = (changes: Partial<RoomSettingsDataEventMessageType>) => {
        updateRoomSettingsForm(changes);
        save(changes);
    };

    /** `onRoomBehaviorSettingsChanged`: the switch always changes; it saves only when the timeouts allow it. */
    const selectBehaviour = (changes: Partial<RoomSettingsDataEventMessageType>) => {
        updateRoomSettingsForm(changes);

        if (!behaviourError({ ...form, ...changes })) save(changes);
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
            isStaff={isStaff}
            tab={tab}
            removeTabsForNavigatorView={removeTabsForNavigatorView}
            error={error}
            onChangeTab={setTab}
            onChange={updateRoomSettingsForm}
            onSelectSetting={selectSetting}
            onSelectBehaviour={selectBehaviour}
            onCommit={() => save()}
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
            onClose={() => hideWindow('room_settings')}
        />
    );
};
