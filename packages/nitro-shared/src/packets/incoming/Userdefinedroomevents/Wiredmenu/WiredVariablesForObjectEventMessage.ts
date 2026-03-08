import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredVariablesForObjectEventMessageType = {
  // no fields

};

export class WiredVariablesForObjectEventMessage implements IIncomingPacket<WiredVariablesForObjectEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredVariablesForObjectEventMessageType
  {

    const packet: WiredVariablesForObjectEventMessageType = {
    };

    return packet;
  }
}
