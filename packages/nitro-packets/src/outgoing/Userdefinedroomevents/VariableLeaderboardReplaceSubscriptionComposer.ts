import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type VariableLeaderboardReplaceSubscriptionComposerType = {
    overlayInstanceId: number;
    queryRevision: number;
    selectedVariableId: string;
    /** At most two, distinct, never negative; none only for the room open form (0, 0, "0"). */
    chunkIndices: number[];
};

/**
 * Flash `VariableLeaderboardReplaceSubscriptionMessageComposer`: int overlay, int revision, string
 * variable, int n, n x int chunk. `VariableLeaderboardController` sends (0, 0, "0", []) when the room
 * is entered and the chunks a leaderboard's page needs after that.
 */
export class VariableLeaderboardReplaceSubscriptionComposer implements IOutgoingPacket<VariableLeaderboardReplaceSubscriptionComposerType> {
    public constructor(private params: VariableLeaderboardReplaceSubscriptionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.overlayInstanceId,
            this.params.queryRevision,
            this.params.selectedVariableId,
            this.params.chunkIndices.length,
            ...this.params.chunkIndices,
        ];
    }
}
