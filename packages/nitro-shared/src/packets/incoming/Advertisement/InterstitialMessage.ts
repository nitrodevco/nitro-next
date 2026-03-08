import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type InterstitialMessageType = {
    // no fields
};

export class InterstitialMessage implements IIncomingPacket<InterstitialMessageType> {
    public parse(wrapper: IMessageDataWrapper): InterstitialMessageType {
        const packet: InterstitialMessageType = {};

        return packet;
    }
}
