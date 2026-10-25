import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type DisconnectReasonMessageType = {
    reason?: number;
};

export class DisconnectReasonMessage implements IIncomingPacket<DisconnectReasonMessageType> {
    public parse(wrapper: IMessageDataWrapper): DisconnectReasonMessageType {
        let reason: number | undefined;
        if (wrapper.bytesAvailable) {
            reason = wrapper.readInt();
        }
        return { reason };
    }
}
