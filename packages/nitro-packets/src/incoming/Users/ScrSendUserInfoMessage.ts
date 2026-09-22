// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * Flash's `ScrSendUserInfoMessageParser`: the user's subscription, which `HabboCatalog.onSubscriptionInfo`
 * writes into the purse. `minutesSinceLastModified` was added later and is read only while bytes
 * remain, as Flash does (0 otherwise).
 */
export type ScrSendUserInfoMessageType = {
    productName: string;
    daysToPeriodEnd: number;
    memberPeriods: number;
    periodsSubscribedAhead: number;
    /** 1-4 (the parser's four obfuscated constants): `onSubscriptionInfo` rebuilds the catalogue on 2 and marks the purse expiring on 3. */
    responseType: number;
    hasEverBeenMember: boolean;
    isVIP: boolean;
    pastClubDays: number;
    pastVipDays: number;
    minutesUntilExpiration: number;
    minutesSinceLastModified: number;
};

export class ScrSendUserInfoMessage implements IIncomingPacket<ScrSendUserInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): ScrSendUserInfoMessageType {
        const packet: ScrSendUserInfoMessageType = {
            productName: wrapper.readString(),
            daysToPeriodEnd: wrapper.readInt(),
            memberPeriods: wrapper.readInt(),
            periodsSubscribedAhead: wrapper.readInt(),
            responseType: wrapper.readInt(),
            hasEverBeenMember: wrapper.readBoolean(),
            isVIP: wrapper.readBoolean(),
            pastClubDays: wrapper.readInt(),
            pastVipDays: wrapper.readInt(),
            minutesUntilExpiration: wrapper.readInt(),
            minutesSinceLastModified: 0,
        };

        if (wrapper.bytesAvailable) packet.minutesSinceLastModified = wrapper.readInt();

        return packet;
    }
}
