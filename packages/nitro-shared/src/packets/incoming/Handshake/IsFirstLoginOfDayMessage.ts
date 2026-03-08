import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IsFirstLoginOfDayMessageType = {
  isFirstLoginOfDay: boolean;
};

export class IsFirstLoginOfDayMessage implements IIncomingPacket<IsFirstLoginOfDayMessageType>
{
  public parse(wrapper: IMessageDataWrapper): IsFirstLoginOfDayMessageType
  {

    const packet: IsFirstLoginOfDayMessageType = {
      isFirstLoginOfDay: wrapper.readBoolean(),
    };

    return packet;
  }
}
