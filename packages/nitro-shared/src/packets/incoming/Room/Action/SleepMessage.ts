import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SleepMessageType = {
  userId: number;
  isSleeping: boolean;
};

export class SleepMessage implements IIncomingPacket<SleepMessageType>
{
  public parse(wrapper: IMessageDataWrapper): SleepMessageType
  {

    const packet: SleepMessageType = {
      userId: wrapper.readInt(),
      isSleeping: wrapper.readBoolean(),
    };

    return packet;
  }
}
