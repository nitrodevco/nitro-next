/**
 * The new user flow's requests - what `friendbar/onBoardingHc` sends:
 *
 * - `checkOnboardingName`: `NameChangeDialog.checkName`, half a second after the last keystroke.
 * - `submitOnboardingLook`: "I'm ready" - `AvatarEditor.saveOutfit` saves the look, then
 *   `NameChangeDialog.claimName` claims whatever the name box holds (its default text too, when it
 *   was never clicked). The flow moves on at once; it does not wait for `ChangeUserNameResult`.
 * - `selectInitialRoom`: `RoomPicker.onButtonSelect`, the room type picked.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { ChangeUserNameComposer, CheckUserNameComposer, SelectInitialRoomComposer, UpdateFigureDataComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';

/** `checkName`: an empty name is not asked about. */
export const checkOnboardingName = (send: Send, name: string): boolean => {
    if (!name.length) return false;

    send(new CheckUserNameComposer({ name }));

    return true;
};

/** `saveOutfit` and `submitName`; `name` is left out when the flow has no name step. */
export const submitOnboardingLook = (send: Send, figure: string, gender: AvatarGenderType, name?: string) => {
    send(new UpdateFigureDataComposer({ figure, gender }));

    if (name !== undefined) send(new ChangeUserNameComposer({ name }));
};

/** `onButtonSelect`. */
export const selectInitialRoom = (send: Send, roomType: string) => send(new SelectInitialRoomComposer({ roomType }));
