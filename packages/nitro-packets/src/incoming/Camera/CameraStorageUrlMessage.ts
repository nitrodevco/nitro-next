import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CameraStorageUrlMessageType = {
  url: string;
};

export class CameraStorageUrlMessage implements IIncomingPacket<CameraStorageUrlMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CameraStorageUrlMessageType
  {
    const packet: CameraStorageUrlMessageType = {
      url: wrapper.readString(),
    };

    return packet;
  }
}
