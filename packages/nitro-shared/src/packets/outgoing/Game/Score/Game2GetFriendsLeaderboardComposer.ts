import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2GetFriendsLeaderboardComposerType = object;

export class Game2GetFriendsLeaderboardComposer implements IOutgoingPacket<Game2GetFriendsLeaderboardComposerType> {
    public constructor(private params: Game2GetFriendsLeaderboardComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
