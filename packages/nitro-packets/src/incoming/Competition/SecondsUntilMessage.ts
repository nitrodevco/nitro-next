import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SecondsUntilMessageType = {
    timeStr: string;
    secondsUntil: number;
};

export class SecondsUntilMessage implements IIncomingPacket<SecondsUntilMessageType> {
    public parse(wrapper: IMessageDataWrapper): SecondsUntilMessageType {
        const packet: SecondsUntilMessageType = {
            timeStr: wrapper.readString(),
            secondsUntil: wrapper.readInt()
        };

        return packet;
    }
}
