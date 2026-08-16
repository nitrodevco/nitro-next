import { IIncomingPacket, IMessageDataWrapper, SpecialRoomEffectType } from '@nitrodevco/nitro-api';

export type SpecialRoomEffectMessageType = {
    effectId: SpecialRoomEffectType;
};

export class SpecialRoomEffectMessage implements IIncomingPacket<SpecialRoomEffectMessageType> {
    public parse(wrapper: IMessageDataWrapper): SpecialRoomEffectMessageType {
        const packet: SpecialRoomEffectMessageType = {
            effectId: wrapper.readInt()
        };

        return packet;
    }
}
