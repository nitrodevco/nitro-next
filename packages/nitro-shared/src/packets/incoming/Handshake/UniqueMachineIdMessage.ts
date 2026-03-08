import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UniqueMachineIdMessageType = {
  machineID: string;
};

export class UniqueMachineIdMessage implements IIncomingPacket<UniqueMachineIdMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UniqueMachineIdMessageType
  {

    const packet: UniqueMachineIdMessageType = {
      machineID: wrapper.readString(),
    };

    return packet;
  }
}
