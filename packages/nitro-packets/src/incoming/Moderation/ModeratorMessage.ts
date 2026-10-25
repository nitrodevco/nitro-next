import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorMessageType = {
    message: string;
    url: string;
};

export class ModeratorMessage implements IIncomingPacket<ModeratorMessageType> {
    public parse(wrapper: IMessageDataWrapper): ModeratorMessageType {
        const message = wrapper.readString();
        const url = wrapper.readString();
        return { message, url };
    }
}
