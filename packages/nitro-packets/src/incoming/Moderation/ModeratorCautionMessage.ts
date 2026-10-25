import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorCautionMessageType = {
    message: string;
    url: string;
};

export class ModeratorCautionMessage implements IIncomingPacket<ModeratorCautionMessageType> {
    public parse(wrapper: IMessageDataWrapper): ModeratorCautionMessageType {
        const message = wrapper.readString();
        const url = wrapper.readString();
        return { message, url };
    }
}
