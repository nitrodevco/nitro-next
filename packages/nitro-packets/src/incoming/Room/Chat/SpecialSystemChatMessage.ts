import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SpecialSystemChatMessageType = {
    userIndex: number;
    specialSystemType: number;
};

export class SpecialSystemChatMessage implements IIncomingPacket<SpecialSystemChatMessageType> {
    public parse(wrapper: IMessageDataWrapper): SpecialSystemChatMessageType {
        const userIndex = wrapper.readInt();
        const specialSystemType = wrapper.readInt();
        return { userIndex, specialSystemType };
    }
}
