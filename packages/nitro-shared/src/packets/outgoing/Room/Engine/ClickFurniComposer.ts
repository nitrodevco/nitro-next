import type { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ClickFurniComposerType = {
    objectId: number;
    param: number;
};

export class ClickFurniComposer implements IOutgoingPacket<ClickFurniComposerType> {
    public constructor(private params: ClickFurniComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.param,
        ];
    }
}
