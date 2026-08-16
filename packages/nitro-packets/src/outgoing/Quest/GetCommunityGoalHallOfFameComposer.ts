import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCommunityGoalHallOfFameComposerType = object;

export class GetCommunityGoalHallOfFameComposer implements IOutgoingPacket<GetCommunityGoalHallOfFameComposerType> {
    public constructor(private params: GetCommunityGoalHallOfFameComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
