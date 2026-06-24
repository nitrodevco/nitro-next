import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2GetWeeklyLeaderboardComposerType = object;

export class Game2GetWeeklyLeaderboardComposer implements IOutgoingPacket<Game2GetWeeklyLeaderboardComposerType> {
    public constructor(private params: Game2GetWeeklyLeaderboardComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
