import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `CantConnectMessageParser.reason` values (the Flash `RoomConnectionErrorType`). */
export enum CantConnectReason {
    RoomFull = 1,
    RoomClosed = 2,
    QueueError = 3,
    Banned = 4,
    Blocked = 5,
}

export type CantConnectMessageType = {
    reason: CantConnectReason;
    /** Only sent for `QueueError`: the `room.queue.error.<parameter>` localization suffix. */
    parameter: string;
};

export class CantConnectMessage implements IIncomingPacket<CantConnectMessageType> {
    public parse(wrapper: IMessageDataWrapper): CantConnectMessageType {
        const reason: CantConnectReason = wrapper.readInt();

        const packet: CantConnectMessageType = {
            reason,
            parameter: reason === CantConnectReason.QueueError ? wrapper.readString() : '',
        };

        return packet;
    }
}
