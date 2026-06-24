import type { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MoveObjectComposerType = {
    objectId: number;
    x: number;
    y: number;
    rotation: number;
};

export class MoveObjectComposer implements IOutgoingPacket<MoveObjectComposerType> {
    public constructor(private params: MoveObjectComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.x,
            this.params.y,
            this.params.rotation,
        ];
    }
}
