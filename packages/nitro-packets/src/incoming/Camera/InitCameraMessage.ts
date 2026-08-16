import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type InitCameraMessageType = {
  // no fields

};

export class InitCameraMessage implements IIncomingPacket<InitCameraMessageType>
{
  public parse(wrapper: IMessageDataWrapper): InitCameraMessageType
  {

    const packet: InitCameraMessageType = {
    };

    return packet;
  }
}
