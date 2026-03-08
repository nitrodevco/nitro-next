import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type OfficialSongIdMessageType = {
  // no fields

};

export class OfficialSongIdMessage implements IIncomingPacket<OfficialSongIdMessageType>
{
  public parse(wrapper: IMessageDataWrapper): OfficialSongIdMessageType
  {

    const packet: OfficialSongIdMessageType = {
    };

    return packet;
  }
}
