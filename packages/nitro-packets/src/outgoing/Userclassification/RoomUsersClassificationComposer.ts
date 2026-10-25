// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomUsersClassificationComposerType = {
    /** The classification the chat command names (`:uc <type>`, `:anew` sends `new`). */
    classification: string;
};

export class RoomUsersClassificationComposer implements IOutgoingPacket<RoomUsersClassificationComposerType> {
    public constructor(private params: RoomUsersClassificationComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.classification,
        ];
    }
}
