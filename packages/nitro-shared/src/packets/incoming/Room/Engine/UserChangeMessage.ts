import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserChangeMessageType = {
    objectId: number;
    figure: string;
    gender: string;
    customInfo: string;
    achievementScore: number;
};

export class UserChangeMessage implements IIncomingPacket<UserChangeMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserChangeMessageType {
        const packet: UserChangeMessageType = {
            objectId: wrapper.readInt(),
            figure: wrapper.readString(),
            gender: wrapper.readString().toUpperCase(),
            customInfo: wrapper.readString(),
            achievementScore: wrapper.readInt(),
        };

        return packet;
    }
}
