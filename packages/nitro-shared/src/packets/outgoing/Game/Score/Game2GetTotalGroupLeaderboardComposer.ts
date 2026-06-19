import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2GetTotalGroupLeaderboardComposerType = object;

export class Game2GetTotalGroupLeaderboardComposer implements IOutgoingPacket<Game2GetTotalGroupLeaderboardComposerType> {
    public constructor(private params: Game2GetTotalGroupLeaderboardComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
