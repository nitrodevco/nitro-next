import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type InClientLinkMessageType = {
    link: string;
};

export class InClientLinkMessage implements IIncomingPacket<InClientLinkMessageType> {
    public parse(wrapper: IMessageDataWrapper): InClientLinkMessageType {
        const link = wrapper.readString();
        return { link };
    }
}
