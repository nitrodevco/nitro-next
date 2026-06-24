import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenCampaignCalendarDoorAsStaffComposerType = object;

export class OpenCampaignCalendarDoorAsStaffComposer implements IOutgoingPacket<OpenCampaignCalendarDoorAsStaffComposerType> {
    public constructor(private params: OpenCampaignCalendarDoorAsStaffComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
