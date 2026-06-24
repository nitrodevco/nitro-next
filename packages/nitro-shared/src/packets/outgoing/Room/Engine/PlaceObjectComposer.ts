import type { IOutgoingPacket } from '@nitrodevco/nitro-api';
import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';

export type PlaceObjectComposerType = {
    itemId: number;
    category: RoomObjectCategoryEnum;
    wallLocation: string;
    x: number;
    y: number;
    rotation: number;
};

export class PlaceObjectComposer implements IOutgoingPacket<PlaceObjectComposerType> {
    public constructor(private params: PlaceObjectComposerType) { }

    public compose(): (number | string | boolean)[] {
        switch (this.params.category) {
            case RoomObjectCategoryEnum.Floor: {
                return [`${this.params.itemId} ${this.params.x} ${this.params.y} ${this.params.rotation}`];
            }
            case RoomObjectCategoryEnum.Wall: {
                return [`${this.params.itemId} ${this.params.wallLocation}`];
            }
        }

        return [];
    }
}
