import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetConcurrentUsersGoalProgressComposerType = object;

export class GetConcurrentUsersGoalProgressComposer implements IOutgoingPacket<GetConcurrentUsersGoalProgressComposerType> {
    public constructor(private params: GetConcurrentUsersGoalProgressComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
