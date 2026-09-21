// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * `UpdateFloorPropertiesMessageComposer` - the floor plan editor's save. Flash's constructor
 * defaults every field after the model to -1 and sends one of three lengths: the model alone when
 * nothing else was given (the import/export dialog's raw paste), the six-value form, and the
 * seven-value form once a fixed wall height is being set. The length is the contract, so the
 * fields are optional here and the same three shapes come out.
 */
export type UpdateFloorPropertiesComposerType = {
    /** The height map, rows separated by `\r`. */
    modelData: string;
    entryPointX?: number;
    entryPointY?: number;
    entryPointDir?: number;
    /** `BCFloorPlanEditor.getThicknessSettingBySelectionIndex` - the exponent, not the multiplier. */
    wallThickness?: number;
    floorThickness?: number;
    /** -1 leaves the walls following the floor; anything else fixes them at that height. */
    fixedWallsHeight?: number;
};

export class UpdateFloorPropertiesComposer implements IOutgoingPacket<UpdateFloorPropertiesComposerType> {
    public constructor(private params: UpdateFloorPropertiesComposerType) { }

    public compose(): (number | string | boolean)[] {
        const {
            modelData,
            entryPointX = -1,
            entryPointY = -1,
            entryPointDir = -1,
            wallThickness = -1,
            floorThickness = -1,
            fixedWallsHeight = -1,
        } = this.params;

        if ((entryPointX === -1) && (entryPointY === -1) && (entryPointDir === -1) && (wallThickness === -1) && (floorThickness === -1)) return [ modelData ];

        if (fixedWallsHeight === -1) return [ modelData, entryPointX, entryPointY, entryPointDir, wallThickness, floorThickness ];

        return [ modelData, entryPointX, entryPointY, entryPointDir, wallThickness, floorThickness, fixedWallsHeight ];
    }
}
