import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NewUserExperienceNotCompleteEventMessageType = {
  // no fields

};

export class NewUserExperienceNotCompleteEventMessage implements IIncomingPacket<NewUserExperienceNotCompleteEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NewUserExperienceNotCompleteEventMessageType
  {

    const packet: NewUserExperienceNotCompleteEventMessageType = {
    };

    return packet;
  }
}
