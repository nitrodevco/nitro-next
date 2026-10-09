/**
 * `RaidProtectionSettingsController` - the room's raid protection, which its owner opens from the
 * room info window (`navigator/raidprotection/<roomId>`) while the hotel has `raid.protection.enabled`
 * and the server said they may manage it (`RaidProtectionCapabilityMessage`).
 *
 * Every step checks that the room is still the one the user is in: the capability, the window, a
 * request and a save all belong to the live current room (`isLiveCurrentRoom`: the navigator's
 * current room, with its session started) or the entered one (`isCurrentEnteredRoom`: and its
 * room info in), and anything for another room is dropped. Turning protection on asks first
 * (`raid.protection.settings.confirm.active` while a raid is on, `.inactive` otherwise), and the
 * save it confirms says so (`confirmed`). A save that comes back with result 0 closes the window;
 * any other result keeps it open on the settings the server sent back.
 */
import type { IRaidProtectionSettings } from '@nitrodevco/nitro-packets';
import { GetRaidProtectionSettingsComposer, SaveRaidProtectionSettingsComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { navigatorStore } from '#base/context/navigator';
import { RaidProtectionDraft, raidProtectionStore } from '#base/context/raid-protection';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';

type Send = WebSocketConnection['send'];

/** `SENSITIVITY_VALUES`: low, medium, high. */
export const RAID_PROTECTION_SENSITIVITY_VALUES = [ 0, 1, 2 ];
/** `ACTION_VALUES`: kick, temporary ban. */
export const RAID_PROTECTION_ACTION_VALUES = [ 0, 1 ];
/** `ACTION_KICK`. */
export const RAID_PROTECTION_ACTION_KICK = 0;
/** `BAN_DURATION_VALUES`, in seconds. */
export const RAID_PROTECTION_BAN_DURATION_VALUES = [ 300, 900, 1800, 3600, 10800, 21600, 43200, 86400, 259200, 604800 ];
/** `GUARD_DURATION_VALUES`, in seconds. */
export const RAID_PROTECTION_GUARD_DURATION_VALUES = [ 300, 900, 1800, 3600, 10800 ];

/** `MAX_ROOM_ID` in `openFromLink`: an int. */
const MAX_ROOM_ID = 2147483647;

const raid = () => raidProtectionStore.getState();

/** `isFeatureEnabled`: the hotel's `raid.protection.enabled`. */
export const isRaidProtectionEnabled = () => systemStore.getState().config['raid.protection.enabled'] === true;

/** `isLiveCurrentRoom`: the navigator's current room, with its session started. */
const isLiveCurrentRoom = (roomId: number) => (roomId > 0) && (navigatorStore.getState().currentRoomId === roomId) && (roomStore.getState().room?.roomId === roomId);

/** `isCurrentEnteredRoom`: the live current room, whose room info is in. */
const isCurrentEnteredRoom = (roomId: number) => isLiveCurrentRoom(roomId) && (navigatorStore.getState().enteredRoom?.info.roomId === roomId);

/** `canManage`. */
export const canManageRaidProtection = (roomId: number) => isRaidProtectionEnabled() && isLiveCurrentRoom(roomId) && raid().capabilities.includes(roomId);

/** `RaidProtectionSettingsView.isShowingRoom`. */
const isShowingRoom = (roomId: number) => raid().view?.settings.roomId === roomId;

/** `valid`: every value one the window offers. */
const isValid = (settings: RaidProtectionDraft) => RAID_PROTECTION_SENSITIVITY_VALUES.includes(settings.detectionSensitivity)
    && RAID_PROTECTION_ACTION_VALUES.includes(settings.actionType)
    && RAID_PROTECTION_BAN_DURATION_VALUES.includes(settings.banDurationSeconds)
    && RAID_PROTECTION_GUARD_DURATION_VALUES.includes(settings.guardDurationSeconds)
    && RAID_PROTECTION_SENSITIVITY_VALUES.includes(settings.guardSensitivity);

/** `completePendingSave`. */
const completePendingSave = () => {
    raid().setSavingRoomId(0);
    raid().setSaveOutstanding(false);
};

/** `cancelConfirmation`: the dialog taken down without an answer. */
const cancelConfirmation = () => {
    const { confirmation, savingRoomId } = raid();

    if (confirmation) systemStore.getState().closeDialog(confirmation.dialogId);

    raid().setConfirmation(undefined);

    if (savingRoomId === 0) raid().setSaveOutstanding(false);
};

/** `clearRoom`: what is known of a room, and the window if it shows it. */
const clearRoom = (roomId: number) => {
    raid().forgetRoom(roomId);

    if (raid().requestedRoomId === roomId) raid().setRequestedRoomId(0);

    if (raid().savingRoomId === roomId) completePendingSave();

    if (raid().confirmation?.draft.roomId === roomId) cancelConfirmation();

    if (isShowingRoom(roomId)) raid().hideView();
};

/** `clearOtherRooms`: everything that is not `roomId`'s. */
const clearOtherRooms = (roomId: number) => {
    const { capabilities, settings } = raid();

    for (const id of new Set([ ...capabilities, ...Object.keys(settings).map(Number) ])) {
        if (id !== roomId) clearRoom(id);
    }

    if ((raid().requestedRoomId !== 0) && (raid().requestedRoomId !== roomId)) raid().setRequestedRoomId(0);

    if ((raid().savingRoomId !== 0) && (raid().savingRoomId !== roomId)) completePendingSave();

    if (raid().confirmation && (raid().confirmation?.draft.roomId !== roomId)) cancelConfirmation();
};

/** `clearAll`. */
export const clearAllRaidProtection = () => {
    cancelConfirmation();
    raid().resetRaidProtection();
};

/** `sendSave`. */
const sendSave = (send: Send, settings: IRaidProtectionSettings, confirmed: boolean) => {
    raid().setSavingRoomId(settings.roomId);
    raid().setSaveOutstanding(true);

    const { roomId, enabled, detectionSensitivity, actionType, banDurationSeconds, guardEnabled, guardDurationSeconds, guardSensitivity } = settings;

    send(new SaveRaidProtectionSettingsComposer({ roomId, enabled, detectionSensitivity, actionType, banDurationSeconds, guardEnabled, guardDurationSeconds, guardSensitivity, confirmed }));
};

/** `openFromLink`: asks for the room's settings; the answer opens the window. */
export const openRaidProtectionFromLink = (send: Send, value: string | undefined) => {
    if ((value === undefined) || !/^\d+$/.test(value)) return;

    const roomId = Number(value);

    if ((roomId <= 0) || (roomId > MAX_ROOM_ID)) return;

    if (!isRaidProtectionEnabled() || !isCurrentEnteredRoom(roomId) || !canManageRaidProtection(roomId) || (raid().requestedRoomId === roomId)) return;

    raid().setRequestedRoomId(roomId);
    raid().hideView();
    send(new GetRaidProtectionSettingsComposer({ roomId }));
};

/** `onConfirmation`: OK saves with `confirmed` when nothing changed meanwhile; anything else frees the save button. */
const onConfirmation = (send: Send, ok: boolean) => {
    const confirmation = raid().confirmation;

    raid().setConfirmation(undefined);

    if (ok && confirmation && (raid().settings[confirmation.draft.roomId] === confirmation.previous) && !confirmation.previous.enabled
        && isRaidProtectionEnabled() && isCurrentEnteredRoom(confirmation.draft.roomId) && canManageRaidProtection(confirmation.draft.roomId) && (raid().savingRoomId === 0)) {
        sendSave(send, confirmation.draft, true);

        return;
    }

    if (raid().savingRoomId === 0) raid().setSaveOutstanding(false);
};

/** `RaidProtectionSettingsView.onSave` -> `collectDraft` -> `requestSave`. */
export const requestRaidProtectionSave = (send: Send) => {
    const view = raid().view;

    if (!view) return;

    const draft: IRaidProtectionSettings = { ...view.settings, ...view.draft };
    const stored = raid().settings[draft.roomId];

    if (!stored || !isValid(draft)) return;

    if (!isRaidProtectionEnabled() || !isCurrentEnteredRoom(draft.roomId) || !canManageRaidProtection(draft.roomId)) {
        clearRoom(draft.roomId);

        return;
    }

    if (raid().savingRoomId !== 0) return;

    if (!stored.enabled && draft.enabled) {
        const { interpolate, getLocalizationValue, showConfirm } = systemStore.getState();
        const message = getLocalizationValue(stored.incidentActive ? 'raid.protection.settings.confirm.active' : 'raid.protection.settings.confirm.inactive');
        // `WE_OK`, or `WE_CANCEL` (the cancel link and the header close).
        const dialogId = showConfirm(interpolate('${raid.protection.settings.confirm.title}'), message, () => onConfirmation(send, true), { onCancel: () => onConfirmation(send, false) });

        raid().setConfirmation({ draft, previous: stored, dialogId });
        raid().setSaveOutstanding(true);

        return;
    }

    sendSave(send, draft, false);
};

/** `close`: the cancel button, the frame's close, and a save that went through. */
export const closeRaidProtection = () => {
    raid().setRequestedRoomId(0);
    cancelConfirmation();
    raid().hideView();
};

/** `onCapability`. */
export const onRaidProtectionCapability = (roomId: number, canManage: boolean) => {
    if (!isRaidProtectionEnabled() || !isLiveCurrentRoom(roomId)) return;

    clearOtherRooms(roomId);

    if (canManage) raid().setCapability(roomId, true);
    else clearRoom(roomId);
};

/** `onSettings`: stored, and shown when it is the room the window was asked for or shows. */
export const onRaidProtectionSettings = (settings: IRaidProtectionSettings) => {
    if (!isRaidProtectionEnabled() || !isCurrentEnteredRoom(settings.roomId) || !canManageRaidProtection(settings.roomId)) return;

    cancelConfirmation();
    raid().setSettings(settings);

    if (raid().requestedRoomId === settings.roomId) {
        raid().setRequestedRoomId(0);
        raid().showView(settings);
    } else if (isShowingRoom(settings.roomId)) {
        raid().updateView(settings);
    }
};

/** `onResult`: the save is done; result 0 closes the window. */
export const onRaidProtectionSettingsResult = (resultCode: number, settings: IRaidProtectionSettings) => {
    if ((settings.roomId !== raid().savingRoomId) || !isRaidProtectionEnabled() || !isCurrentEnteredRoom(settings.roomId) || !canManageRaidProtection(settings.roomId)) return;

    completePendingSave();
    raid().setSettings(settings);

    if (isShowingRoom(settings.roomId)) {
        raid().updateView(settings);

        if (resultCode === 0) closeRaidProtection();
    }
};

/** `onSession`: a room that ends is forgotten; one that starts drops every other room and hides the window. */
export const onRaidProtectionRoomChanged = (roomId: number | undefined, previousRoomId: number | undefined) => {
    if (roomId === undefined) {
        if (previousRoomId !== undefined) clearRoom(previousRoomId);

        return;
    }

    clearOtherRooms(roomId);
    cancelConfirmation();
    raid().hideView();
};
