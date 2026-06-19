import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UnblockGroupMemberComposerType = object;

export class UnblockGroupMemberComposer implements IOutgoingPacket<UnblockGroupMemberComposerType> {
    public constructor(private params: UnblockGroupMemberComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
