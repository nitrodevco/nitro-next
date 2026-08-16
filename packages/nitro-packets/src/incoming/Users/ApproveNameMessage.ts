import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ApproveNameMessageType = {
  // no fields

};

export class ApproveNameMessage implements IIncomingPacket<ApproveNameMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ApproveNameMessageType
  {

    const packet: ApproveNameMessageType = {
    };

    return packet;
  }
}
