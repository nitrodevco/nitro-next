import type { ClubLevelEnum, IIncomingPacket, IMessageDataWrapper, SecurityLevelEnum } from '@nitrodevco/nitro-api';

export type UserRightsMessageType = {
    clubLevel: ClubLevelEnum;
    securityLevel: SecurityLevelEnum;
    isAmbassador: boolean;
};

export class UserRightsMessage implements IIncomingPacket<UserRightsMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserRightsMessageType {
        const packet: UserRightsMessageType = {
            clubLevel: wrapper.readInt(),
            securityLevel: wrapper.readInt(),
            isAmbassador: wrapper.readBoolean(),
        };

        return packet;
    }
}
