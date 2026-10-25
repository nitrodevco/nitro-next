// Body filled by hand from the AS3 (`OpenCampaignCalendarDoorComposer`): the campaign's name, then the door's day index - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenCampaignCalendarDoorComposerType = {
    campaignName: string;
    dayIndex: number;
};

export class OpenCampaignCalendarDoorComposer implements IOutgoingPacket<OpenCampaignCalendarDoorComposerType> {
    public constructor(private params: OpenCampaignCalendarDoorComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.campaignName,
            this.params.dayIndex,
        ];
    }
}
