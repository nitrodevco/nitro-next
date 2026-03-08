import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ScrSendUserInfoMessageType = {
  productName: string;
  daysToPeriodEnd: number;
  memberPeriods: number;
  periodsSubscribedAhead: number;
  responseType: number;
  hasEverBeenMember: boolean;
  isVIP: boolean;
  pastClubDays: number;
  pastVipDays: number;
  minutesUntilExpiration: number;
  minutesSinceLastModified: number;
};

export class ScrSendUserInfoMessage implements IIncomingPacket<ScrSendUserInfoMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ScrSendUserInfoMessageType
  {

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
      minutesSinceLastModified: wrapper.readInt(),
    };

    return packet;
  }
}
