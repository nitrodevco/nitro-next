import type { IIncomingPacket, IMessageDataWrapper, NoobnessLevelEnum } from '@nitrodevco/nitro-api';

export type NoobnessLevelMessageType = {
    noobnessLevel: NoobnessLevelEnum;
};

export class NoobnessLevelMessage implements IIncomingPacket<NoobnessLevelMessageType> {
    public parse(wrapper: IMessageDataWrapper): NoobnessLevelMessageType {
        const packet: NoobnessLevelMessageType = {
            noobnessLevel: wrapper.readInt(),
        };

        return packet;
    }
}
