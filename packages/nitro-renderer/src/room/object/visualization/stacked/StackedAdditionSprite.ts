import { VariableFxBitmap } from '../variablefx/rendering/VariableFxBitmap';
import { VariableFxBlendMode } from '../variablefx/rendering/VariableFxBitmapComposer';

/**
 * The stack's per-entry "sprite": the Flash client used a RoomObjectSprite holding a BitmapData,
 * but the entries are only ever composed into the stack's own bitmap, so all that is needed is
 * the bitmap and the placement/alpha the stack reads back.
 */
export class StackedAdditionSprite {
    public bitmap: VariableFxBitmap | undefined = undefined;
    public offsetX: number = 0;
    public offsetY: number = 0;
    public relativeDepth: number = 0;
    public alpha: number = 255;
    public blendMode: VariableFxBlendMode = 'normal';
    public visible: boolean = true;

    public dispose(): void {
        this.bitmap = undefined;
    }
}
