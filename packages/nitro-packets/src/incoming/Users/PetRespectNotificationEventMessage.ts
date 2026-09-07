import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IPetRespectCustomPart {
    layerId: number;
    partId: number;
    paletteId: number;
}

export type PetRespectNotificationEventMessageType = {
    respect: number;
    /** The second int of the Flash parser (`_Str_19471`) - never read by the client. */
    unknown: number;
    petId: number;
    petName: string;
    petTypeId: number;
    petPaletteId: number;
    petColor: string;
    petCustomParts: IPetRespectCustomPart[];
    /** Monster plants (type 16) get "treated" rather than respected - the Flash `_Str_24197()`. */
    isTreat: boolean;
};

/**
 * Mirrors the Flash `PetRespectNotificationMessageParser`: respect, an unused int, then the start
 * of a `PetInfo` (id, name, figure data, level ...). Only the head of the pet info is read - the
 * chat bubble needs the id (to find the pet in the room) and the type (treat vs respect).
 */
export class PetRespectNotificationEventMessage implements IIncomingPacket<PetRespectNotificationEventMessageType> {
    private static readonly MONSTER_PLANT_TYPE_ID = 16;

    public parse(wrapper: IMessageDataWrapper): PetRespectNotificationEventMessageType {
        const respect = wrapper.readInt();
        const unknown = wrapper.readInt();
        const petId = wrapper.readInt();
        const petName = wrapper.readString();
        const petTypeId = wrapper.readInt();
        const petPaletteId = wrapper.readInt();
        const petColor = wrapper.readString();
        const customPartCount = wrapper.readInt();
        const petCustomParts: IPetRespectCustomPart[] = [];

        for (let i = 0; i < customPartCount; i++) {
            petCustomParts.push({
                layerId: wrapper.readInt(),
                partId: wrapper.readInt(),
                paletteId: wrapper.readInt(),
            });
        }

        return {
            respect,
            unknown,
            petId,
            petName,
            petTypeId,
            petPaletteId,
            petColor,
            petCustomParts,
            isTreat: (petTypeId === PetRespectNotificationEventMessage.MONSTER_PLANT_TYPE_ID),
        };
    }
}
