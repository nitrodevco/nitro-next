import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpgradeChestComposerType = {
    chestId: number;
    upgradeType: number;
};

export class UpgradeChestComposer implements IOutgoingPacket<UpgradeChestComposerType> {
    public constructor(private params: UpgradeChestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
            this.params.upgradeType,
        ];
    }
}
