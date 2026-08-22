import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/* MuteAllInRoomParser — allMuted */
export type MuteAllInRoomEventMessageType = {
    allMuted: boolean;
};

export class MuteAllInRoomEventMessage implements IIncomingPacket<MuteAllInRoomEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): MuteAllInRoomEventMessageType {
        return {
            allMuted: wrapper.readBoolean(),
        };
    }
}
