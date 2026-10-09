// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetForumStatsComposerType = {
    groupId: number;
};

/** `GetForumStatsMessageComposer`. */
export class GetForumStatsComposer implements IOutgoingPacket<GetForumStatsComposerType> {
    public constructor(private params: GetForumStatsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
        ];
    }
}
