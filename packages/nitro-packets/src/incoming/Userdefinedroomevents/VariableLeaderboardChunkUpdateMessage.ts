import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IVariableLeaderboardRow } from './Data/IVariableLeaderboard';
import { VariableLeaderboardRowParser } from './Data/VariableLeaderboardParsers';

export type VariableLeaderboardChunkUpdateMessageType = {
    valid: boolean;
    overlayInstanceId: number;
    queryRevision: number;
    selectedVariableId: string;
    chunkIndex: number;
    totalCount: number;
    rows: IVariableLeaderboardRow[];
};

/**
 * One chunk of up to 50 leaderboard rows (Flash `AchievementResolutionProgressMessageParser`, the
 * obfuscator's name for it): overlay, revision, variable, chunk index, total, rows. Invalid with a
 * negative total or more than 50 rows.
 */
export class VariableLeaderboardChunkUpdateMessage implements IIncomingPacket<VariableLeaderboardChunkUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): VariableLeaderboardChunkUpdateMessageType {
        const overlayInstanceId = wrapper.readInt();
        const queryRevision = wrapper.readInt();
        const selectedVariableId = wrapper.readString();
        const chunkIndex = wrapper.readInt();
        const totalCount = wrapper.readInt();
        const count = wrapper.readInt();
        const rows: IVariableLeaderboardRow[] = [];
        const valid = (totalCount >= 0) && (count >= 0) && (count <= 50);

        if (valid) for (let i = 0; i < count; i++) rows.push(VariableLeaderboardRowParser(wrapper));

        return { valid, overlayInstanceId, queryRevision, selectedVariableId, chunkIndex, totalCount, rows };
    }
}
