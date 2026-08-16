import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type VoteForRoomComposerType = object;

export class VoteForRoomComposer implements IOutgoingPacket<VoteForRoomComposerType> {
    public constructor(private params: VoteForRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
