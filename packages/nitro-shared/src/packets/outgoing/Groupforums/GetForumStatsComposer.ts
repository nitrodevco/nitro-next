import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetForumStatsComposerType = object;

export class GetForumStatsComposer implements IOutgoingPacket<GetForumStatsComposerType> {
    public constructor(private params: GetForumStatsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
