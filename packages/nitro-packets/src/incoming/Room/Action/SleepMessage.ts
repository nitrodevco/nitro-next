import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SleepMessageType = {
    objectId: number;
    isSleeping: boolean;
};

export class SleepMessage implements IIncomingPacket<SleepMessageType> {
    public parse(wrapper: IMessageDataWrapper): SleepMessageType {
        const packet: SleepMessageType = {
            objectId: wrapper.readInt(),
            isSleeping: wrapper.readBoolean(),
        };

        return packet;
    }
}
