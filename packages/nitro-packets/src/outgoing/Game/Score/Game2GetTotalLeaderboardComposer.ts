import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2GetTotalLeaderboardComposerType = object;

export class Game2GetTotalLeaderboardComposer implements IOutgoingPacket<Game2GetTotalLeaderboardComposerType> {
    public constructor(private params: Game2GetTotalLeaderboardComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
