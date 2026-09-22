import { BreedPetsComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';

type Send = WebSocketConnection['send'];

/** `BreedPetsMessageComposer`'s state for calling a plant breeding off. */
const BREED_CANCEL = 1;

/**
 * `AvatarInfoWidget.showBreedingPetsWaitingConfirmationAlert`: after proposing to breed your
 * monsterplant with someone else's, a `confirm` of `breedpets.confirmation.notification.*` says to
 * wait for them. Its ok only closes it; cancelling it (the cancel link or the header close,
 * `WE_CANCEL` in `onWaitingConfirmationAlert`) calls the breeding off - `cancelBreedPets`. A
 * newer proposal replaces it.
 */
export const showBreedingPetsWaitingConfirmationAlert = (send: Send, petId: number, otherPetId: number) => {
    removeBreedingPetsWaitingConfirmationAlert();

    const { showConfirm, getLocalizationValue } = systemStore.getState();
    const { setPlantBreedingWaitingDialogId } = roomStore.getState();
    const forget = () => setPlantBreedingWaitingDialogId(undefined);

    setPlantBreedingWaitingDialogId(showConfirm(
        getLocalizationValue('breedpets.confirmation.notification.title', 'breedpets.confirmation.notification.title'),
        getLocalizationValue('breedpets.confirmation.notification.text', 'breedpets.confirmation.notification.text'),
        forget,
        {
            onCancel: () => {
                send(new BreedPetsComposer({ state: BREED_CANCEL, petId, otherPetId }));
                forget();
            },
        },
    ));
};

/**
 * `AvatarInfoWidget.removeBreedingPetsWaitingConfirmationAlert`: the waiting confirmation goes
 * without an answer - when the breeding is called off, or a newer one replaces it.
 */
export const removeBreedingPetsWaitingConfirmationAlert = () => {
    const { plantBreedingWaitingDialogId, setPlantBreedingWaitingDialogId } = roomStore.getState();

    if (plantBreedingWaitingDialogId === undefined) return;

    systemStore.getState().closeDialog(plantBreedingWaitingDialogId);
    setPlantBreedingWaitingDialogId(undefined);
};
