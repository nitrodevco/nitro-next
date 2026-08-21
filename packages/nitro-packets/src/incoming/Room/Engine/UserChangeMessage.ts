import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserChangeMessageType = {
    objectId: number;
    figure: string;
    gender: string;
    customInfo: string;
    achievementScore: number;
    unknownString: string;
    unknownTotal: number;
    badgesRank: number;
};

export class UserChangeMessage implements IIncomingPacket<UserChangeMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserChangeMessageType {
        const packet: UserChangeMessageType = {
            objectId: wrapper.readInt(),
            figure: wrapper.readString(),
            gender: wrapper.readString().toUpperCase(),
            customInfo: wrapper.readString(),
            achievementScore: wrapper.readInt(),
            unknownString: wrapper.readString(),
            unknownTotal: wrapper.readInt(),
            badgesRank: wrapper.readInt()
        };

        return packet;
    }
}
