// Body filled by hand from the AS3 composer (`users/GetBadgeLeaderboardMessageComposer`, an obfuscated class in this build).
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetBadgeLeaderboardComposerType = {
    type: number;
    rarity: number;
    /** Which chunk of `chunkSize` entries. */
    chunkIndex: number;
    chunkSize: number;
};

export class GetBadgeLeaderboardComposer implements IOutgoingPacket<GetBadgeLeaderboardComposerType> {
    public constructor(private params: GetBadgeLeaderboardComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.type,
            this.params.rarity,
            this.params.chunkIndex,
            this.params.chunkSize,
        ];
    }
}
