import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetFriendRequestsComposerType = object;

export class GetFriendRequestsComposer implements IOutgoingPacket<GetFriendRequestsComposerType> {
    public constructor(private params: GetFriendRequestsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
