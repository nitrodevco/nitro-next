import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ThumbnailStatusMessageType = object;

export class ThumbnailStatusMessage implements IIncomingPacket<ThumbnailStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): ThumbnailStatusMessageType {
        const packet: ThumbnailStatusMessageType = {
        };

        return packet;
    }
}
