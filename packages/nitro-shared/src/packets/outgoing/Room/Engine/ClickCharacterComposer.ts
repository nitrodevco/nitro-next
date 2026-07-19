import type { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ClickCharacterComposerType = {
    objectId: number;
};

export class ClickCharacterComposer implements IOutgoingPacket<ClickCharacterComposerType> {
    public constructor(private params: ClickCharacterComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId
        ];
    }
}
