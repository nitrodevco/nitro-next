import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TalentLevelUpMessageType = {
  // no fields

};

export class TalentLevelUpMessage implements IIncomingPacket<TalentLevelUpMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TalentLevelUpMessageType
  {

    const packet: TalentLevelUpMessageType = {
    };

    return packet;
  }
}
