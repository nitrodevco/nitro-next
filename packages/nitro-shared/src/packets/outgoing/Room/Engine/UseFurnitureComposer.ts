import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UseFurnitureComposerType = {
    objectId: number;
    param: number;
};

export class UseFurnitureComposer implements IOutgoingPacket<UseFurnitureComposerType> {
    public constructor(private params: UseFurnitureComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.param,
        ];
    }
}
