import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPetData, PetDataParser } from '../Data/PetDataParser';

export type PetRespectNotificationEventMessageType = {
    respect: number;
    petOwnerId: number;
    /** The whole `PetData`: id, name, figure (with its breed), level and rarity. */
    petData: IPetData;
    petId: number;
    /** Monster plants (type 16) get "treated" rather than respected - the Flash `isTreat()`. */
    isTreat: boolean;
};

/**
 * Mirrors the Flash `PetRespectNotificationParser`: respect, the pet owner's id, then a `PetData`.
 * The chat bubble needs the id (to find the pet in the room) and the type (treat vs respect).
 */
export class PetRespectNotificationEventMessage implements IIncomingPacket<PetRespectNotificationEventMessageType> {
    private static readonly MONSTER_PLANT_TYPE_ID = 16;

    public parse(wrapper: IMessageDataWrapper): PetRespectNotificationEventMessageType {
        const respect = wrapper.readInt();
        const petOwnerId = wrapper.readInt();
        const petData = PetDataParser(wrapper);

        return {
            respect,
            petOwnerId,
            petData,
            petId: petData.id,
            isTreat: (petData.figureData.typeId === PetRespectNotificationEventMessage.MONSTER_PLANT_TYPE_ID),
        };
    }
}
