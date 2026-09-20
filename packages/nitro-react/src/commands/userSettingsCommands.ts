/**
 * The account switches of the toolbar's "other settings" window (`toolbar/extensions/settings/OtherSettingsView`):
 * each is kept where Flash kept it (the messenger, the session data manager, the wired menu) and
 * saved at once. The wired whisper switch is `setWiredWhisperDisabled` in `wiredPreferencesCommands.ts`.
 */
import { ResetPhoneNumberStateComposer, SetIgnoreRoomInvitesComposer, SetOnlineIndicatorPreferenceComposer, SetRoomCameraPreferencesComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

type Send = WebSocketConnection['send'];

/** `ignore_room_invites_checkbox`: `messenger.setRoomInvitesIgnored` + `SetIgnoreRoomInvitesMessageComposer`. */
export const setRoomInvitesIgnored = (send: Send, roomInvitesIgnored: boolean) => {
    userStore.getState().setRoomInvitesIgnored(roomInvitesIgnored);

    send(new SetIgnoreRoomInvitesComposer({ roomInvitesIgnored }));
};

/** `disable_room_camera_follow_checkbox`: `SetRoomCameraPreferencesMessageComposer` + `sessionDataManager.setRoomCameraFollowDisabled`. */
export const setRoomCameraFollowDisabled = (send: Send, cameraFollowDisabled: boolean) => {
    send(new SetRoomCameraPreferencesComposer({ cameraFollowDisabled }));

    userStore.getState().setRoomCameraFollowDisabled(cameraFollowDisabled);
};

/** `onOnlineIndicatorPreferenceChanged`: `messenger.setOnlineIndicatorPreference` + `SetOnlineIndicatorPreferenceMessageComposer`; no selection is ignored. */
export const setOnlineIndicatorPreference = (send: Send, selection: number) => {
    if (selection < 0) return;

    userStore.getState().setOnlineIndicatorPreference(selection);

    send(new SetOnlineIndicatorPreferenceComposer({ selection }));
};

/** `btn_reset_phone_number_collection`: the phone number collection starts over (`§_-7V§`). */
export const resetPhoneNumberCollection = (send: Send) => send(new ResetPhoneNumberStateComposer({}));
