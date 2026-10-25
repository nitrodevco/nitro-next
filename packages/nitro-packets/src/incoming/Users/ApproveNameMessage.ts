import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ApproveNameMessageType = {
    result: number;
    nameValidationInfo: string;
};

export class ApproveNameMessage implements IIncomingPacket<ApproveNameMessageType> {
    public parse(wrapper: IMessageDataWrapper): ApproveNameMessageType {
        const packet: ApproveNameMessageType = {
            result: wrapper.readInt(),
            nameValidationInfo: wrapper.readString(),
        };

        return packet;
    }
}
