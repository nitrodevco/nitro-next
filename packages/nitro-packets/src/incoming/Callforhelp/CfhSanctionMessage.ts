import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CfhSanctionMessageType = {
  // no fields

};

export class CfhSanctionMessage implements IIncomingPacket<CfhSanctionMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CfhSanctionMessageType
  {

    const packet: CfhSanctionMessageType = {
    };

    return packet;
  }
}
