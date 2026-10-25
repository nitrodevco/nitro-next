import { FurnitureRegionData, IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `SetFurnitureRegionDataMessageComposer` (WIN63-202610121624): furni, title, description,
 * x offset, y offset, min width, min height, colour, then int count and each area's x, y, width,
 * height. Nothing in that build sends it; it is here so the protocol is complete.
 */
export class SetFurnitureRegionDataComposer implements IOutgoingPacket<FurnitureRegionData> {
    public constructor(private params: FurnitureRegionData) { }

    public compose(): (number | string | boolean)[] {
        const { furnitureId, title, description, xOffset, yOffset, minWidth, minHeight, color, areas } = this.params;

        return [
            furnitureId, title, description, xOffset, yOffset, minWidth, minHeight, color, areas.length,
            ...areas.flatMap(area => [ Math.trunc(area.x), Math.trunc(area.y), Math.trunc(area.width), Math.trunc(area.height) ]),
        ];
    }
}
