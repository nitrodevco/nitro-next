import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DeselectFavouriteHabboGroupComposerType = object;

export class DeselectFavouriteHabboGroupComposer implements IOutgoingPacket<DeselectFavouriteHabboGroupComposerType> {
    public constructor(private params: DeselectFavouriteHabboGroupComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
