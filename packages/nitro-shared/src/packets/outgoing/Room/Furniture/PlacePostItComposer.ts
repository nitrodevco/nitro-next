import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PlacePostItComposerType = object;

export class PlacePostItComposer implements IOutgoingPacket<PlacePostItComposerType> {
    public constructor(private params: PlacePostItComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
