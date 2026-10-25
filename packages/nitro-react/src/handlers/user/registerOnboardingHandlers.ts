/**
 * The new user flow's answers - the message events `friendbar/onBoardingHc/NameChangeDialog` and
 * `onBoardingHcSteps/RoomPicker` listen to while the flow is up.
 *
 * - `CheckUserNameResult` (`NameChangeDialog.onCheckUserNameResult`): kept for the name box, which
 *   shows it only while it still holds that name.
 * - `SelectInitialRoom` (`RoomPicker.onSelectInitialRoomResponse`): a room made for the player
 *   becomes their home (`UpdateHomeRoom`) and the flow is over (`roomPickingCompleted`). The
 *   server's `FlatCreated` that follows takes them into it, as it does for any new room.
 *
 * - `TurboStarterRoomCameraMessage` / `TurboStarterRoomPictureResultMessage`: not Flash's - Turbo's
 *   starter room camera (`starter.rooms`) opens for the room, and closes once its picture is drawn.
 *
 * - `NewUserExperienceGiftOffer` (`HabboNuxDialogs.onNewUserExperienceGiftOfferMessage`): puts up the
 *   gift selection with the offer's steps, over one still up.
 *
 * `ChangeUserNameResult` needs nothing here: the flow does not wait for it (`claimName` moves on at
 * once), and `SessionDataManager`'s own listener renames the session.
 */
import { CheckUserNameResultMessage, NewUserExperienceGiftOfferMessage, SelectInitialRoomMessage, TurboStarterRoomCameraMessage, TurboStarterRoomPictureResultMessage, UpdateHomeRoomComposer } from '@nitrodevco/nitro-packets';

import { onNameChangeChecked } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { onboardingStore } from '#base/context/onboarding';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerOnboardingHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setNameCheck, finish, openStarterRoomCamera, setStarterRoomCameraStatus, closeStarterRoomCamera, setGiftOffer } = onboardingStore.getState();

    return subscribeAll(subscribe, [
        on(CheckUserNameResultMessage, (data) => {
            setNameCheck({ resultCode: data.resultCode, name: data.name });
            // The own avatar menu's name change, when it is open (`NameChangeController.onCheckUserNameResult`).
            onNameChangeChecked(data.resultCode, data.name, data.nameSuggestions);
        }),

        on(SelectInitialRoomMessage, (data) => {
            if (data.roomId > 0) send(new UpdateHomeRoomComposer({ roomId: data.roomId }));

            finish();
        }),

        on(NewUserExperienceGiftOfferMessage, data => setGiftOffer(data.giftOptions)),

        on(TurboStarterRoomCameraMessage, data => openStarterRoomCamera(data.roomId)),

        on(TurboStarterRoomPictureResultMessage, (data) => {
            if (onboardingStore.getState().starterRoomCamera?.roomId !== data.roomId) return;

            if (data.ok) closeStarterRoomCamera();
            else setStarterRoomCameraStatus('failed');
        }),
    ]);
};
