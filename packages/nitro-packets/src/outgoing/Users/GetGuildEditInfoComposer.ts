import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/* GetGuildEditInfoMessageComposer (874) — groupId */
export type GetGuildEditInfoComposerType = {
    groupId: number;
};

export class GetGuildEditInfoComposer implements IOutgoingPacket<GetGuildEditInfoComposerType> {
    public constructor(private params: GetGuildEditInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
        ];
    }
}
