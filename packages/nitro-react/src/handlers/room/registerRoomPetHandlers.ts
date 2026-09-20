import { RoomObjectUserType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { ConfirmBreedingRequestEventMessage, ConfirmBreedingResultEventMessage, GoToBreedingNestFailureEventMessage, IPetFigureData, NestBreedingSuccessEventMessage, PetBreedingEventMessage, PetBreedingResultEventMessage, PetCommandsMessage, PetExperienceMessage, PetFigureUpdateMessage, PetInfoMessage, PetLevelUpdateMessage, PetPlacingErrorMessage, PetStatusUpdateMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { getRoom, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The text of `PetPlacingError`, by error code: `RoomUsersHandler.onPetPlacingError` turns the
 * code into a `RSEME_*` event and `RoomUI.roomSessionDialogEventHandler` into this key, shown
 * under `error.title`. A code outside the table shows nothing, as in Flash.
 * Checked against Flash by `scripts/drift/constants.py`.
 */
const PET_PLACING_ERRORS: Record<number, string> = {
    0: 'room.error.pets.forbidden_in_hotel',
    1: 'room.error.pets.forbidden_in_flat',
    2: 'room.error.max_pets',
    3: 'room.error.pets.no_free_tiles',
    4: 'room.error.pets.selected_tile_not_free',
    5: 'room.error.max_own_pets',
};

/** `PetBreedingMessage.state` - what the other plant's owner did, or what we are being asked. */
const PLANT_BREEDING_ASK = 0;
const PLANT_BREEDING_CANCELLED = 1;
const PLANT_BREEDING_ACCEPTED = 2;
const PLANT_BREEDING_ACCEPT_REQUEST = 3;

/** `ConfirmBreedingResultMessage.result`. */
const NEST_RESULT_OK = 0;
const NEST_RESULT_NO_NEST = 1;
const NEST_RESULT_PETS_MISSING = 2;
const NEST_RESULT_NAME_INVALID = 3;

/** `GoToBreedingNestFailureMessage.reason` that is about food rather than nests. */
const NEST_FAILURE_TOO_TIRED = 6;

/** `PetFigureData.figureString`: type, palette, colour, then the custom parts three numbers each. */
const petFigureString = (data: IPetFigureData) => [ data.typeId, data.paletteId, data.color, data.customParts.length / 3, ...data.customParts ].join(' ');

/**
 * What the server says about the pets in the room - `RoomUsersHandler`'s pet half, and the
 * breeding events `AvatarInfoWidgetHandler` and the inventory turned into dialogs. The full
 * picture of a pet only arrives when it is asked about; everything after that is a patch on it,
 * so a pet nobody has looked at is left alone.
 */
export const registerRoomPetHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setPetInfo, updatePetInfo, setPetCommands, updateUserPartial, setPlantBreeding, closePlantBreeding, setNestBreeding, setNestBreedingNameRejected, setBreedingResult, setNestBreedingSuccess } = roomStore.getState();

    const alert = (titleKey: string, messageKey: string) => {
        const { showAlert, getLocalizationValue } = systemStore.getState();

        showAlert(getLocalizationValue(titleKey), getLocalizationValue(messageKey));
    };

    const petObjectId = (petId: number) => roomStore.getState().getUserByWebId(petId, RoomObjectUserType.Pet)?.objectId ?? -1;

    return subscribeAll(subscribe, [
        on(PetInfoMessage, (data) => {
            setPetInfo(data);
        }),

        // Only the commands it has learned are worth offering; the rest are what it could learn.
        on(PetCommandsMessage, (data) => {
            setPetCommands(data.petId, data.enabledCommands);
        }),

        on(PetStatusUpdateMessage, (data) => {
            updatePetInfo(data.petId, {
                canBreed: data.canBreed,
                canHarvest: data.canHarvest,
                canRevive: data.canRevive,
                hasBreedingPermission: data.hasBreedingPermission,
            });
            updateUserPartial(data.roomIndex, { canBreed: data.canBreed, canHarvest: data.canHarvest, canRevive: data.canRevive, hasBreedingPermission: data.hasBreedingPermission });
        }),

        on(PetLevelUpdateMessage, (data) => {
            updatePetInfo(data.petId, { level: data.level });
            updateUserPartial(data.roomIndex, { petLevel: data.level });
        }),

        // `RoomMessageHandler.onPetFigureUpdate`: the pet is redrawn, and the room's copy of it follows.
        on(PetFigureUpdateMessage, (data) => {
            const figure = petFigureString(data.figureData);

            getRoom()?.updateRoomObjectUserFigure(data.roomIndex, figure, '', '', data.isRiding);
            updateUserPartial(data.roomIndex, { figure, hasSaddle: data.hasSaddle, isRiding: data.isRiding });
            updatePetInfo(data.petId, { isRiding: data.isRiding });
        }),

        /*
         * Experience is a gain rather than a total, and the client floats it over the pet rather
         * than putting it on the info panel - `PetLogic` reads it off the model and the pet's
         * visualization draws the number.
         */
        on(PetExperienceMessage, (data) => {
            getRoom()?.updateRoomObjectUserAction(data.petRoomIndex, RoomObjectVariableEnum.FigureGainedExperience, data.gainedExperience);
        }),

        on(PetPlacingErrorMessage, (data) => {
            const messageKey = PET_PLACING_ERRORS[data.errorCode];

            if (messageKey) alert('error.title', messageKey);
        }),

        // `AvatarInfoWidget`'s `RWPPBE_PET_BREEDING_` cases.
        on(PetBreedingEventMessage, (data) => {
            const own = petObjectId(data.ownPetId);
            const other = petObjectId(data.otherPetId);

            switch (data.state) {
                case PLANT_BREEDING_ASK:
                    setPlantBreeding({ requestObjectId: own, targetObjectId: other, mode: 'ask' });
                    return;
                case PLANT_BREEDING_ACCEPT_REQUEST:
                    setPlantBreeding({ requestObjectId: own, targetObjectId: other, mode: 'accept' });
                    return;
                case PLANT_BREEDING_ACCEPTED:
                    closePlantBreeding(own, other);
                    return;
                case PLANT_BREEDING_CANCELLED:
                    closePlantBreeding(own, other);
                    alert('breedpets.cancel.notification.title', 'breedpets.cancel.notification.text');
            }
        }),

        on(PetBreedingResultEventMessage, (data) => {
            setBreedingResult({ result: data.resultData, otherResult: data.otherResultData });
        }),

        on(ConfirmBreedingRequestEventMessage, (data) => {
            setNestBreeding({ nestId: data.nestId, pet1: data.pet1, pet2: data.pet2, rarityCategories: data.rarityCategories, resultPetType: data.resultPetType, nameRejected: false });
        }),

        on(ConfirmBreedingResultEventMessage, (data) => {
            switch (data.result) {
                case NEST_RESULT_OK:
                    setNestBreeding(undefined);
                    return;
                case NEST_RESULT_NO_NEST:
                    alert('breedpets.confirmation.alert.nonest.head', 'breedpets.confirmation.alert.nonest.desc');
                    setNestBreeding(undefined);
                    return;
                case NEST_RESULT_PETS_MISSING:
                    alert('breedpets.confirmation.alert.petsmissing.head', 'breedpets.confirmation.alert.petsmissing.desc');
                    setNestBreeding(undefined);
                    return;
                case NEST_RESULT_NAME_INVALID:
                    alert('breedpets.confirmation.alert.name.invalid.head', 'breedpets.confirmation.alert.name.invalid.desc');
                    setNestBreedingNameRejected();
            }
        }),

        on(NestBreedingSuccessEventMessage, (data) => {
            setNestBreedingSuccess({ petId: data.petId, rarityCategory: data.rarityCategory });
        }),

        // `IncomingMessages.onGoToBreedingNestFailure`; Flash also offered the catalogue page for nests or food.
        on(GoToBreedingNestFailureEventMessage, (data) => {
            const { showAlert, getLocalizationValue } = systemStore.getState();
            const hint = getLocalizationValue((data.reason === NEST_FAILURE_TOO_TIRED) ? 'gotobreedingnestfailure.getfood' : 'gotobreedingnestfailure.getnest');

            showAlert(getLocalizationValue('gotobreedingnestfailure.caption'), `${getLocalizationValue('gotobreedingnestfailure.subtitle')}\n${getLocalizationValue(`gotobreedingnestfailure.message.${data.reason}`)}\n${hint}`);
        }),
    ]);
};
