import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BotSkillListUpdateMessageType = {
  // no fields

};

export class BotSkillListUpdateMessage implements IIncomingPacket<BotSkillListUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): BotSkillListUpdateMessageType
  {

    const packet: BotSkillListUpdateMessageType = {
    };

    return packet;
  }
}
