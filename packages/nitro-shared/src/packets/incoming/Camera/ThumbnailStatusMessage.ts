import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ThumbnailStatusMessageType = {
  // no fields

};

export class ThumbnailStatusMessage implements IIncomingPacket<ThumbnailStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ThumbnailStatusMessageType
  {

    const packet: ThumbnailStatusMessageType = {
    };

    return packet;
  }
}
