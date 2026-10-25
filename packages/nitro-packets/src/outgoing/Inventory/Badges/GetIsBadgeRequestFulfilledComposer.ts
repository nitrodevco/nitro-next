// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetIsBadgeRequestFulfilledComposerType = {
    requestCode: string;
};

/** `GetIsBadgeRequestFulfilledComposer`: whether the badge the request code gives has been given. */
export class GetIsBadgeRequestFulfilledComposer implements IOutgoingPacket<GetIsBadgeRequestFulfilledComposerType> {
    public constructor(private params: GetIsBadgeRequestFulfilledComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.requestCode,
        ];
    }
}
