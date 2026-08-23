import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserNftWardrobeMessageType = object;

export class UserNftWardrobeMessage implements IIncomingPacket<UserNftWardrobeMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserNftWardrobeMessageType {
        const packet: UserNftWardrobeMessageType = {
        };

        return packet;
    }
}
