// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CustomizeAvatarWithFurniComposerType = {
    /** The furni doing the dressing; what it puts on you is its own business. */
    itemId: number;
};

export class CustomizeAvatarWithFurniComposer implements IOutgoingPacket<CustomizeAvatarWithFurniComposerType> {
    public constructor(private params: CustomizeAvatarWithFurniComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.itemId,
        ];
    }
}
