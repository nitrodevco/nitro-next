// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `LookToMessageComposer` - turns the own avatar towards a tile (`RoomObjectEventHandler.setSelectedAvatar`: the selected avatar's location, truncated). */
export type LookToComposerType = {
    x: number;
    y: number;
};

export class LookToComposer implements IOutgoingPacket<LookToComposerType> {
    public constructor(private params: LookToComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.x,
            this.params.y,
        ];
    }
}
