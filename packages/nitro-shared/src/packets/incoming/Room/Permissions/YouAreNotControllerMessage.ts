import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type YouAreNotControllerMessageType = {
  // no fields

};

export class YouAreNotControllerMessage implements IIncomingPacket<YouAreNotControllerMessageType>
{
  public parse(wrapper: IMessageDataWrapper): YouAreNotControllerMessageType
  {

    const packet: YouAreNotControllerMessageType = {
    };

    return packet;
  }
}
