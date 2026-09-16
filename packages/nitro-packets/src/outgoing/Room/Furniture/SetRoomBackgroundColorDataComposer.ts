// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetRoomBackgroundColorDataComposerType = {
    objectId: number;
    /** 0-255 each, the three sliders of the background toner. */
    hue: number;
    saturation: number;
    lightness: number;
};

export class SetRoomBackgroundColorDataComposer implements IOutgoingPacket<SetRoomBackgroundColorDataComposerType> {
    public constructor(private params: SetRoomBackgroundColorDataComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.hue,
            this.params.saturation,
            this.params.lightness,
        ];
    }
}
