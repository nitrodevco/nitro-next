// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpgradeChestComposerType = {
    chestId: number;
    /** How many capacity upgrades to buy: the amount dropdown's selection + 1, up to `wired.<coins|furni>_chest.max_upgrades`. */
    amount: number;
};

/** Flash `UpgradeChestMessageComposer`, sent by `WiredChestUpgradeConfirmationView`; answered by `UpgradeChestResultMessage`. */
export class UpgradeChestComposer implements IOutgoingPacket<UpgradeChestComposerType> {
    public constructor(private params: UpgradeChestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
            this.params.amount,
        ];
    }
}
