import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorCautionEventMessageType = {
  // no fields

};

export class ModeratorCautionEventMessage implements IIncomingPacket<ModeratorCautionEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ModeratorCautionEventMessageType
  {

    const packet: ModeratorCautionEventMessageType = {
    };

    return packet;
  }
}
