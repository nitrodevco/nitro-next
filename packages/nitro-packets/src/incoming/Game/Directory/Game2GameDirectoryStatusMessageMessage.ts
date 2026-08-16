import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GameDirectoryStatusMessageMessageType = {
  // no fields

};

export class Game2GameDirectoryStatusMessageMessage implements IIncomingPacket<Game2GameDirectoryStatusMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2GameDirectoryStatusMessageMessageType
  {

    const packet: Game2GameDirectoryStatusMessageMessageType = {
    };

    return packet;
  }
}
