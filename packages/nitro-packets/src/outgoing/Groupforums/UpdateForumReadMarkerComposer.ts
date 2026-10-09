// Body filled by hand from the AS3 composer (`UpdateForumReadMarkerMessageComposer`): a count, then each mark.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export interface IForumReadMarker {
    groupId: number;
    lastReadMessageId: number;
    /** The whole forum marked read. */
    markAll: boolean;
}

export type UpdateForumReadMarkerComposerType = {
    markers: IForumReadMarker[];
};

export class UpdateForumReadMarkerComposer implements IOutgoingPacket<UpdateForumReadMarkerComposerType> {
    public constructor(private params: UpdateForumReadMarkerComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.markers.length,
            ...this.params.markers.flatMap(marker => [ marker.groupId, marker.lastReadMessageId, marker.markAll ]),
        ];
    }
}
