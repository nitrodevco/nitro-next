import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2GetWeeklyGroupLeaderboardComposerType = object;

export class Game2GetWeeklyGroupLeaderboardComposer implements IOutgoingPacket<Game2GetWeeklyGroupLeaderboardComposerType> {
    public constructor(private params: Game2GetWeeklyGroupLeaderboardComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
