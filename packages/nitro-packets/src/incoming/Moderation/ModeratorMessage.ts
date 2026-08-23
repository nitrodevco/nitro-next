import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorMessageType = object;

export class ModeratorMessage implements IIncomingPacket<ModeratorMessageType> {
    public parse(wrapper: IMessageDataWrapper): ModeratorMessageType {
        const packet: ModeratorMessageType = {
        };

        return packet;
    }
}
