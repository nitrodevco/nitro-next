import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuildMembersComposerType = object;

export class GetGuildMembersComposer implements IOutgoingPacket<GetGuildMembersComposerType> {
    public constructor(private params: GetGuildMembersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
