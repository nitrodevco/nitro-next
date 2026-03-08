import { IIncomingPacket, IMessageDataWrapper, IUserInfo } from '@nitrodevco/nitro-api';

export type UserObjectMessageType = {
    userInfo: IUserInfo;
};

export class UserObjectMessage implements IIncomingPacket<UserObjectMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserObjectMessageType {
        const packet: UserObjectMessageType = {
            userInfo: {
                id: wrapper.readInt(),
                name: wrapper.readString(),
                figure: wrapper.readString(),
                sex: wrapper.readString(),
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

        return packet;
    }
}
