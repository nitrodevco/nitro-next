import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NoobnessLevelMessageType = {
    noobnessLevel: number;
};

export class NoobnessLevelMessage implements IIncomingPacket<NoobnessLevelMessageType> {
    public parse(wrapper: IMessageDataWrapper): NoobnessLevelMessageType {
        const packet: NoobnessLevelMessageType = {
            noobnessLevel: wrapper.readInt(),
        };

        return packet;
    }
}
