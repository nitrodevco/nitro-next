import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuildMembershipsComposerType = object;

export class GetGuildMembershipsComposer implements IOutgoingPacket<GetGuildMembershipsComposerType> {
    public constructor(private params: GetGuildMembershipsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
