import { AvatarGenderType, IIncomingPacket, IMessageDataWrapper, IUserInfo } from '@nitrodevco/nitro-api';

export type UserObjectMessageType = {
    userInfo: IUserInfo;
};

export class UserObjectMessage implements IIncomingPacket<UserObjectMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserObjectMessageType {
        const packet: UserObjectMessageType = {
            userInfo: {
                userId: wrapper.readInt(),
                name: wrapper.readString(),
                figure: wrapper.readString(),
                sex: wrapper.readString() as AvatarGenderType,
                customData: wrapper.readString(),
                realName: wrapper.readString(),
                directMail: wrapper.readBoolean(),
                respectTotal: wrapper.readInt(),
                respectLeft: wrapper.readInt(),
                petRespectLeft: wrapper.readInt(),
                streamPublishingAllowed: wrapper.readBoolean(),
                lastAccessDate: wrapper.readString(),
                nameChangeAllowed: wrapper.readBoolean(),
                accountSafetyLocked: wrapper.readBoolean(),
            },
        };

        // Newer servers append these; an older one simply stops here.
        if (wrapper.bytesAvailable) {
            packet.userInfo.accountTradeLocked = wrapper.readBoolean();
            packet.userInfo.nameColor = wrapper.readString();
        }

        if (wrapper.bytesAvailable) {
            packet.userInfo.respectReplenishesLeft = wrapper.readInt();
            packet.userInfo.maxRespectPerDay = wrapper.readInt();
        }

        return packet;
    }
}
