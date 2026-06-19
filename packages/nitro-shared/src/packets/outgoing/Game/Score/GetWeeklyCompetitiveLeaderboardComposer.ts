import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetWeeklyCompetitiveLeaderboardComposerType = object;

export class GetWeeklyCompetitiveLeaderboardComposer implements IOutgoingPacket<GetWeeklyCompetitiveLeaderboardComposerType> {
    public constructor(private params: GetWeeklyCompetitiveLeaderboardComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
