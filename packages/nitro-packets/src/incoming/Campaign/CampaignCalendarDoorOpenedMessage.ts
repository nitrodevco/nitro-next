import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CampaignCalendarDoorOpenedMessageType = {
    doorOpened: boolean;
    productName: string;
    customImage: string;
    furnitureClassName: string;
};

export class CampaignCalendarDoorOpenedMessage implements IIncomingPacket<CampaignCalendarDoorOpenedMessageType> {
    public parse(wrapper: IMessageDataWrapper): CampaignCalendarDoorOpenedMessageType {
        const packet: CampaignCalendarDoorOpenedMessageType = {
            doorOpened: wrapper.readBoolean(),
            productName: wrapper.readString(),
            customImage: wrapper.readString(),
            furnitureClassName: wrapper.readString(),
        };

        return packet;
    }
}
