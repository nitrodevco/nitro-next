import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type InterstitialMessageType = {
    canShowInterstitial: boolean;
};

export class InterstitialMessage implements IIncomingPacket<InterstitialMessageType> {
    public parse(wrapper: IMessageDataWrapper): InterstitialMessageType {
        const packet: InterstitialMessageType = {
            canShowInterstitial: wrapper.readBoolean(),
        };

        return packet;
    }
}
