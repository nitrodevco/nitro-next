// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RequestABadgeComposerType = {
    requestCode: string;
};

/** `RequestABadgeComposer`: the badge a request code stands for. */
export class RequestABadgeComposer implements IOutgoingPacket<RequestABadgeComposerType> {
    public constructor(private params: RequestABadgeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.requestCode,
        ];
    }
}
