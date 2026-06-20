import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PickupObjectComposerType = {
    categoryId: number;
    objectId: number;
    confirm: boolean;
};

export class PickupObjectComposer implements IOutgoingPacket<PickupObjectComposerType> {
    public constructor(private params: PickupObjectComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.categoryId,
            this.params.objectId,
            this.params.confirm,
        ];
    }
}
