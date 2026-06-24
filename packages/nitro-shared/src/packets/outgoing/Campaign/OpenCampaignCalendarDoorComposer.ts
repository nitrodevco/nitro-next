import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenCampaignCalendarDoorComposerType = object;

export class OpenCampaignCalendarDoorComposer implements IOutgoingPacket<OpenCampaignCalendarDoorComposerType> {
    public constructor(private params: OpenCampaignCalendarDoorComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
