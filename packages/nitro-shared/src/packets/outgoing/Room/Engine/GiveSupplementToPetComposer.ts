import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GiveSupplementToPetComposerType = object;

export class GiveSupplementToPetComposer implements IOutgoingPacket<GiveSupplementToPetComposerType> {
    public constructor(private params: GiveSupplementToPetComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
