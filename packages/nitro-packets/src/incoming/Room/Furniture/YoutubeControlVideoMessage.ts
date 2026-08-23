import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type YoutubeControlVideoMessageType = {
    furniId: number;
    commandId: number;
};

export class YoutubeControlVideoMessage implements IIncomingPacket<YoutubeControlVideoMessageType> {
    public parse(wrapper: IMessageDataWrapper): YoutubeControlVideoMessageType {
        const packet: YoutubeControlVideoMessageType = {
            furniId: wrapper.readInt(),
            commandId: wrapper.readInt(),
        };

        return packet;
    }
}
