import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CameraPurchaseOKMessageType = {
  // no fields

};

export class CameraPurchaseOKMessage implements IIncomingPacket<CameraPurchaseOKMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CameraPurchaseOKMessageType
  {

    const packet: CameraPurchaseOKMessageType = {
    };

    return packet;
  }
}
