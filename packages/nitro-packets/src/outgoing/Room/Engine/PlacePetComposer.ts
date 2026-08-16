import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PlacePetComposerType = object;

export class PlacePetComposer implements IOutgoingPacket<PlacePetComposerType> {
    public constructor(private params: PlacePetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
