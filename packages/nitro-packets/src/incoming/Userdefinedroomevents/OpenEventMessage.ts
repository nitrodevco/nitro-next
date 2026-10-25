// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type OpenEventMessageType = {
    stuffId: number;
};

export class OpenEventMessage implements IIncomingPacket<OpenEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): OpenEventMessageType {
        const packet: OpenEventMessageType = {
            stuffId: wrapper.readInt(),
        };

        return packet;
    }
}
