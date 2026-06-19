import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type KickMemberComposerType = object;

export class KickMemberComposer implements IOutgoingPacket<KickMemberComposerType> {
    public constructor(private params: KickMemberComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
