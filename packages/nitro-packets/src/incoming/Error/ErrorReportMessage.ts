import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ErrorReportMessageType = {
    errorCode: number;
    messageId: number;
    timestamp: string;
};

export class ErrorReportMessage implements IIncomingPacket<ErrorReportMessageType> {
    public parse(wrapper: IMessageDataWrapper): ErrorReportMessageType {
        const messageId = wrapper.readInt();
        const errorCode = wrapper.readInt();
        const timestamp = wrapper.readString();
        return { errorCode, messageId, timestamp };
    }
}
