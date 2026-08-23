import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NewUserExperienceGiftOfferEventMessageType = object;

export class NewUserExperienceGiftOfferEventMessage implements IIncomingPacket<NewUserExperienceGiftOfferEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): NewUserExperienceGiftOfferEventMessageType {
        const packet: NewUserExperienceGiftOfferEventMessageType = {
        };

        return packet;
    }
}
