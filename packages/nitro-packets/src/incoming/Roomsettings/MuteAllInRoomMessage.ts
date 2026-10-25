import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MuteAllInRoomMessageType = {
    allMuted: boolean;
};

export class MuteAllInRoomMessage implements IIncomingPacket<MuteAllInRoomMessageType> {
    public parse(wrapper: IMessageDataWrapper): MuteAllInRoomMessageType {
        const allMuted = wrapper.readBoolean();
        return { allMuted };
    }
}
