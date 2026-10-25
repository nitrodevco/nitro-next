import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NewUserExperienceNotCompleteMessageType = object;

export class NewUserExperienceNotCompleteMessage implements IIncomingPacket<NewUserExperienceNotCompleteMessageType> {
    public parse(wrapper: IMessageDataWrapper): NewUserExperienceNotCompleteMessageType {
        return {};
    }
}
