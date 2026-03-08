import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredAllVariablesHashEventMessageType = {
  // no fields

};

export class WiredAllVariablesHashEventMessage implements IIncomingPacket<WiredAllVariablesHashEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredAllVariablesHashEventMessageType
  {

    const packet: WiredAllVariablesHashEventMessageType = {
    };

    return packet;
  }
}
