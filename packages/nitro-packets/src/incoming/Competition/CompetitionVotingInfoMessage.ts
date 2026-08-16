import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CompetitionVotingInfoMessageType = {
  // no fields

};

export class CompetitionVotingInfoMessage implements IIncomingPacket<CompetitionVotingInfoMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CompetitionVotingInfoMessageType
  {

    const packet: CompetitionVotingInfoMessageType = {
    };

    return packet;
  }
}
