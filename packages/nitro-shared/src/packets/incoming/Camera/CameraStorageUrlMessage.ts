import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CameraStorageUrlMessageType = {
  // no fields

};

export class CameraStorageUrlMessage implements IIncomingPacket<CameraStorageUrlMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CameraStorageUrlMessageType
  {

    const packet: CameraStorageUrlMessageType = {
    };

    return packet;
  }
}
