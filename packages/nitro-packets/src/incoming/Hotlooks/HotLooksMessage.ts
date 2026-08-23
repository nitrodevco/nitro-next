import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HotLooksMessageType = object;

export class HotLooksMessage implements IIncomingPacket<HotLooksMessageType> {
    public parse(wrapper: IMessageDataWrapper): HotLooksMessageType {
        const packet: HotLooksMessageType = {
        };

        return packet;
    }
}
