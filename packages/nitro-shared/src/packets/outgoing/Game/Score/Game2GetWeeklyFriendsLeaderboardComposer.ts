import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2GetWeeklyFriendsLeaderboardComposerType = object;

export class Game2GetWeeklyFriendsLeaderboardComposer implements IOutgoingPacket<Game2GetWeeklyFriendsLeaderboardComposerType> {
    public constructor(private params: Game2GetWeeklyFriendsLeaderboardComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
