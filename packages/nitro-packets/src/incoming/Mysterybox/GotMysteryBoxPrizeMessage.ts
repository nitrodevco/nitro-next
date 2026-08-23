import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GotMysteryBoxPrizeMessageType = {
    contentType: string;
    classId: number;
};

export class GotMysteryBoxPrizeMessage implements IIncomingPacket<GotMysteryBoxPrizeMessageType> {
    public parse(wrapper: IMessageDataWrapper): GotMysteryBoxPrizeMessageType {
        const packet: GotMysteryBoxPrizeMessageType = {
            contentType: wrapper.readString(),
            classId: wrapper.readInt(),
        };

        return packet;
    }
}
