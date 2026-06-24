import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type StartCampaignComposerType = object;

export class StartCampaignComposer implements IOutgoingPacket<StartCampaignComposerType> {
    public constructor(private params: StartCampaignComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
