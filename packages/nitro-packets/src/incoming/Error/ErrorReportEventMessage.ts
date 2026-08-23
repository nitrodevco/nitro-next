import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ErrorReportEventMessageType = object;

export class ErrorReportEventMessage implements IIncomingPacket<ErrorReportEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ErrorReportEventMessageType {
        const packet: ErrorReportEventMessageType = {
        };

        return packet;
    }
}
