import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type YoutubeDisplayVideoMessageType = {
    furniId: number;
    videoId: string;
    startAtSeconds: number;
    endAtSeconds: number;
    state: number;
};

export class YoutubeDisplayVideoMessage implements IIncomingPacket<YoutubeDisplayVideoMessageType> {
    public parse(wrapper: IMessageDataWrapper): YoutubeDisplayVideoMessageType {
        const packet: YoutubeDisplayVideoMessageType = {
            furniId: wrapper.readInt(),
            videoId: wrapper.readString(),
            startAtSeconds: wrapper.readInt(),
            endAtSeconds: wrapper.readInt(),
            state: wrapper.readInt(),
        };

        return packet;
    }
}
