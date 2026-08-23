import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ShowMysteryBoxWaitMessageType = object;

export class ShowMysteryBoxWaitMessage implements IIncomingPacket<ShowMysteryBoxWaitMessageType> {
    public parse(wrapper: IMessageDataWrapper): ShowMysteryBoxWaitMessageType {
        const packet: ShowMysteryBoxWaitMessageType = {
        };

        return packet;
    }
}
