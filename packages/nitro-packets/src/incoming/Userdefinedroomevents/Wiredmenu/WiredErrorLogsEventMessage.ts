import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredErrorLogsEventMessageType = object;

export class WiredErrorLogsEventMessage implements IIncomingPacket<WiredErrorLogsEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredErrorLogsEventMessageType {
        const packet: WiredErrorLogsEventMessageType = {
        };

        return packet;
    }
}
