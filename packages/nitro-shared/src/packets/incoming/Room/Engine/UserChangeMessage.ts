import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserChangeMessageType = {
    id: number;
    figure: string;
    sex: string;
    customInfo: string;
    achievementScore: number;
};

export class UserChangeMessage implements IIncomingPacket<UserChangeMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserChangeMessageType {
        const packet: UserChangeMessageType = {
            id: wrapper.readInt(),
            figure: wrapper.readString(),
            sex: wrapper.readString().toUpperCase(),
            customInfo: wrapper.readString(),
            achievementScore: wrapper.readInt(),
        };

        return packet;
    }
}
