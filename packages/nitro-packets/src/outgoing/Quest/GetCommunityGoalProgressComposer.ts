import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCommunityGoalProgressComposerType = object;

export class GetCommunityGoalProgressComposer implements IOutgoingPacket<GetCommunityGoalProgressComposerType> {
    public constructor(private params: GetCommunityGoalProgressComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
