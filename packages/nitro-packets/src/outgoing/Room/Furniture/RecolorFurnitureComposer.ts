import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RecolorFurnitureComposerType = {
    objectId: number;
    /** `furniture.recolor.scope.0-3`: only this, same colour, same type, same type and colour. */
    scope: number;
    /** `0xRRGGBB`, sent as three channels. */
    color: number;
};

/** Flash `RecolorFurnitureMessageComposer` (WIN63-202610121624): the recolor window's Apply. */
export class RecolorFurnitureComposer implements IOutgoingPacket<RecolorFurnitureComposerType> {
    public constructor(private params: RecolorFurnitureComposerType) { }

    public compose(): (number | string | boolean)[] {
        const { objectId, scope, color } = this.params;

        return [ objectId, scope, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff ];
    }
}
