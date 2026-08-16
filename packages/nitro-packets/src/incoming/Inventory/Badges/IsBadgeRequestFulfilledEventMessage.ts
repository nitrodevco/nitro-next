import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IsBadgeRequestFulfilledEventMessageType = {
  // no fields

};

export class IsBadgeRequestFulfilledEventMessage implements IIncomingPacket<IsBadgeRequestFulfilledEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): IsBadgeRequestFulfilledEventMessageType
  {

    const packet: IsBadgeRequestFulfilledEventMessageType = {
    };

    return packet;
  }
}
