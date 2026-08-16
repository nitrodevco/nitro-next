import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IsUserPartOfCompetitionMessageType = {
  // no fields

};

export class IsUserPartOfCompetitionMessage implements IIncomingPacket<IsUserPartOfCompetitionMessageType>
{
  public parse(wrapper: IMessageDataWrapper): IsUserPartOfCompetitionMessageType
  {

    const packet: IsUserPartOfCompetitionMessageType = {
    };

    return packet;
  }
}
