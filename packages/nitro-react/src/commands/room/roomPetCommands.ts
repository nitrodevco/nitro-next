/**
 * Monsterplant breeding: `BreedPetsMessageComposer`'s states, and `AvatarInfoWidget`'s waiting
 * confirmation shown to whoever proposed it, which calls the breeding off when cancelled - and a
 * pet's commands and info asked for (`RoomSession.requestPetCommands`, `UserDataManager.requestPetInfo`),
 * and a dead monsterplant's revival offer.
 */
import { FurnitureSpecialType } from '@nitrodevco/nitro-api';
import { BreedPetsComposer, GetPetCommandsComposer, GetPetInfoComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';

/** `BreedPetsMessageComposer`'s states: ask the other plant's owner, call it off, accept. */
export const BREED_ASK = 0;
export const BREED_CANCEL = 1;
export const BREED_ACCEPT = 2;

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

/** `RoomSession.requestPetCommands`: the commands the pet knows, for the training window. */
export const requestPetCommands = (send: Send, petId: number) => send(new GetPetCommandsComposer({ petId }));

/** `UserDataManager.requestPetInfo`: the pet's level and experience (`RWUAM_REQUEST_PET_UPDATE`). */
export const requestPetInfo = (send: Send, petId: number) => send(new GetPetInfoComposer({ petId }));

/** `findFurnitureData(20, 16)`: the furniture of category (`specialtype`) 20, the monsterplant revival, whose first custom parameter is pet type 16. */
const REVIVAL_PET_TYPE = '16';

/** `RWUAM_REVIVE_PET`'s `openCatalogPage(findFurnitureData(20, 16))`: the revival's offer, when the catalogue sells one. */
export const openPetRevivalOffer = () => {
    const { floorItems, showWindow } = systemStore.getState();
    const revival = Object.values(floorItems).find(furniture => (furniture.specialType === FurnitureSpecialType.MonsterplantRevival) && (furniture.customParams.split(' ')[0] === REVIVAL_PET_TYPE) && (furniture.purchaseOfferId >= 0));

    if (revival) showWindow('catalog', { offerId: revival.purchaseOfferId });
};
