import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMemberGuildItemCountComposerType = object;

export class GetMemberGuildItemCountComposer implements IOutgoingPacket<GetMemberGuildItemCountComposerType> {
    public constructor(private params: GetMemberGuildItemCountComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
