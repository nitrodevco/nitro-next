import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type FriendRequestQuestCompleteComposerType = object;

export class FriendRequestQuestCompleteComposer implements IOutgoingPacket<FriendRequestQuestCompleteComposerType> {
    public constructor(private params: FriendRequestQuestCompleteComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
