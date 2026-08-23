import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SecondsUntilMessageType = object;

export class SecondsUntilMessage implements IIncomingPacket<SecondsUntilMessageType> {
    public parse(wrapper: IMessageDataWrapper): SecondsUntilMessageType {
        const packet: SecondsUntilMessageType = {
        };

        return packet;
    }
}
