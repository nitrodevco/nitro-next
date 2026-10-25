import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ElementPointerMessageType = {
    key: string;
};

export class ElementPointerMessage implements IIncomingPacket<ElementPointerMessageType> {
    public parse(wrapper: IMessageDataWrapper): ElementPointerMessageType {
        const packet: ElementPointerMessageType = {
            key: wrapper.readString(),
        };

        return packet;
    }
}
