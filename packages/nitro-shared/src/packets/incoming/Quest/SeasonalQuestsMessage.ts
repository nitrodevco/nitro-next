import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SeasonalQuestsMessageType = {
  // no fields

};

export class SeasonalQuestsMessage implements IIncomingPacket<SeasonalQuestsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): SeasonalQuestsMessageType
  {

    const packet: SeasonalQuestsMessageType = {
    };

    return packet;
  }
}
