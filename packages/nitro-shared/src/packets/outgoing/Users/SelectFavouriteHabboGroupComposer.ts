import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SelectFavouriteHabboGroupComposerType = object;

export class SelectFavouriteHabboGroupComposer implements IOutgoingPacket<SelectFavouriteHabboGroupComposerType> {
    public constructor(private params: SelectFavouriteHabboGroupComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
