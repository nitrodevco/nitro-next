import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetConcurrentUsersRewardComposerType = object;

export class GetConcurrentUsersRewardComposer implements IOutgoingPacket<GetConcurrentUsersRewardComposerType> {
    public constructor(private params: GetConcurrentUsersRewardComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
