import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TurboBugReportRequestMessageType = {
    /** The report the capture belongs to, filed by the user's own `:bugreport`. */
    reportId: number;
    /** Whether an image of the room view is wanted too. */
    screenshot: boolean;
};

/**
 * Not Habbo's: the `bugreport` extension of Turbo's bug report plugin - send this client's
 * capture for a report (`TurboBugReportCaptureComposer`). Only a client that asked for the
 * capability is ever sent it.
 */
export class TurboBugReportRequestMessage implements IIncomingPacket<TurboBugReportRequestMessageType> {
    public parse(wrapper: IMessageDataWrapper): TurboBugReportRequestMessageType {
        return { reportId: wrapper.readInt(), screenshot: wrapper.readBoolean() };
    }
}
