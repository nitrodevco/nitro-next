import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type DanceMessageType = {
    objectId: number;
    danceStyle: number;
};

export class DanceMessage implements IIncomingPacket<DanceMessageType> {
    public parse(wrapper: IMessageDataWrapper): DanceMessageType {
        const packet: DanceMessageType = {
            objectId: wrapper.readInt(),
            danceStyle: wrapper.readInt(),
        };

        return packet;
    }
}
