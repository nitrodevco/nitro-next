import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredAllVariableHoldersEventMessageType = {
  // no fields

};

export class WiredAllVariableHoldersEventMessage implements IIncomingPacket<WiredAllVariableHoldersEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredAllVariableHoldersEventMessageType
  {

    const packet: WiredAllVariableHoldersEventMessageType = {
    };

    return packet;
  }
}
