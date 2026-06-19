import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetFriendsWeeklyCompetitiveLeaderboardComposerType = object;

export class GetFriendsWeeklyCompetitiveLeaderboardComposer implements IOutgoingPacket<GetFriendsWeeklyCompetitiveLeaderboardComposerType> {
    public constructor(private params: GetFriendsWeeklyCompetitiveLeaderboardComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
