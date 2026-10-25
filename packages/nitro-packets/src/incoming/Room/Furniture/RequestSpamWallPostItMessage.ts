// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RequestSpamWallPostItMessageType = {
    itemId: number;
    location: string;
};

export class RequestSpamWallPostItMessage implements IIncomingPacket<RequestSpamWallPostItMessageType> {
    public parse(wrapper: IMessageDataWrapper): RequestSpamWallPostItMessageType {
        const packet: RequestSpamWallPostItMessageType = {
            itemId: wrapper.readInt(),
            location: wrapper.readString(),
        };

        return packet;
    }
}
