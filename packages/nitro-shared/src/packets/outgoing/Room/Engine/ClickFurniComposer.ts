import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ClickFurniComposerType = {
    objectId: number;
    param: number;
};

export class ClickFurniComposer implements IOutgoingPacket<ClickFurniComposerType> {
    public constructor(private params: ClickFurniComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.objectId,
            this.params.param,
        ];
    }
}
