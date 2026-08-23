import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserClassificationMessageType = object;

export class UserClassificationMessage implements IIncomingPacket<UserClassificationMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserClassificationMessageType {
        const packet: UserClassificationMessageType = {
        };

        return packet;
    }
}
