import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MarkCatalogNewAdditionsPageOpenedComposerType = object;

export class MarkCatalogNewAdditionsPageOpenedComposer implements IOutgoingPacket<MarkCatalogNewAdditionsPageOpenedComposerType> {
    public constructor(private params: MarkCatalogNewAdditionsPageOpenedComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
