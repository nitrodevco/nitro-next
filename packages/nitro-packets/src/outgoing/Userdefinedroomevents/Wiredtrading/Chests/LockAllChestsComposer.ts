import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type LockAllChestsComposerType = {
    lockFurniChests: boolean;
    lockCoinChests: boolean;
};

export class LockAllChestsComposer implements IOutgoingPacket<LockAllChestsComposerType> {
    public constructor(private params: LockAllChestsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.lockFurniChests,
            this.params.lockCoinChests,
        ];
    }
}
