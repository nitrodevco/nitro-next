// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IChestItemType, IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SelfDonateItemComposerType = {
    type: IChestItemType;
    amount: number;
};

/**
 * Flash `_-vc.SelfDonateItemMessageComposer`, sent by `roomevents/misc/SelfDonationTool.onDonate`
 * (sandbox hotels only) with the three fields of the chosen `ChestItemType` and an amount; a null
 * poster id goes out as the empty string. Answered by `SelfDonationResultMessage`. The packet tool
 * files it under `Users/`.
 */
export class SelfDonateItemComposer implements IOutgoingPacket<SelfDonateItemComposerType> {
    public constructor(private params: SelfDonateItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.type.isWallItem,
            this.params.type.typeId,
            this.params.type.legacyPosterId ?? '',
            this.params.amount,
        ];
    }
}
