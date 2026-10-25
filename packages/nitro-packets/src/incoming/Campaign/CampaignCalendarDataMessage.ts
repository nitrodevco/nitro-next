// From the AS3 `CampaignCalendarData.parse`: the campaign's name and image, today's day index, the
// number of days, then the opened and the missed days, each a count and that many ints.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CampaignCalendarDataMessageType = {
    campaignName: string;
    campaignImage: string;
    currentDay: number;
    campaignDays: number;
    openedDays: number[];
    missedDays: number[];
};

const readDays = (wrapper: IMessageDataWrapper): number[] => {
    const days: number[] = [];

    let count = wrapper.readInt();

    while (count > 0) {
        days.push(wrapper.readInt());

        count--;
    }

    return days;
};

export class CampaignCalendarDataMessage implements IIncomingPacket<CampaignCalendarDataMessageType> {
    public parse(wrapper: IMessageDataWrapper): CampaignCalendarDataMessageType {
        const campaignName = wrapper.readString();
        const campaignImage = wrapper.readString();
        const currentDay = wrapper.readInt();
        const campaignDays = wrapper.readInt();
        const openedDays = readDays(wrapper);
        const missedDays = readDays(wrapper);

        return { campaignName, campaignImage, currentDay, campaignDays, openedDays, missedDays };
    }
}
