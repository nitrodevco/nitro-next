import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IsBadgeRequestFulfilledEventMessageType = {
    requestCode: string;
    fulfilled: boolean;
};

export class IsBadgeRequestFulfilledEventMessage implements IIncomingPacket<IsBadgeRequestFulfilledEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): IsBadgeRequestFulfilledEventMessageType {
        const packet: IsBadgeRequestFulfilledEventMessageType = {
            requestCode: wrapper.readString(),
            fulfilled: wrapper.readBoolean(),
        };

        return packet;
    }
}
