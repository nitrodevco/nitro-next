import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CameraPublishStatusMessageType = {
  // no fields

};

export class CameraPublishStatusMessage implements IIncomingPacket<CameraPublishStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CameraPublishStatusMessageType
  {

    const packet: CameraPublishStatusMessageType = {
    };

    return packet;
  }
}
