import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { PetCommandsMessage, PetExperienceMessage, PetInfoMessage, PetLevelUpdateMessage, PetStatusUpdateMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * What the server says about the pets in the room - `RoomUsersHandler`'s pet half. The full
 * picture only arrives when a pet is asked about; everything after that is a patch on it, so a
 * pet nobody has looked at is left alone.
 */
export const registerRoomPetHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setPetInfo, updatePetInfo, setPetCommands } = roomStore.getState();
    const getRoom = () => roomStore.getState().room;

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
        }),

        on(PetLevelUpdateMessage, (data) => {
            updatePetInfo(data.petId, { level: data.level });
        }),

        /*
         * Experience is a gain rather than a total, and the client floats it over the pet rather
         * than putting it on the info panel - `PetLogic` reads it off the model and the pet's
         * visualization draws the number.
         */
        on(PetExperienceMessage, (data) => {
            getRoom()?.updateRoomObjectUserAction(data.petRoomIndex, RoomObjectVariableEnum.FigureGainedExperience, data.gainedExperience);
        }),
    ]);
};
