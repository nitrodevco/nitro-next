// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type StartCampaignComposerType = {
    /** `StartCampaignMessageComposer(param1:String)`: the quest campaign to start. */
    campaignName: string;
};

export class StartCampaignComposer implements IOutgoingPacket<StartCampaignComposerType> {
    public constructor(private params: StartCampaignComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.campaignName,
        ];
    }
}
