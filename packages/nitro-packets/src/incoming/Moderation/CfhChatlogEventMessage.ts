import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CfhChatlogEventMessageType = object;

export class CfhChatlogEventMessage implements IIncomingPacket<CfhChatlogEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): CfhChatlogEventMessageType {
        const packet: CfhChatlogEventMessageType = {
        };

        return packet;
    }
}
