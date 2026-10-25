import { VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBlendMode } from '../../rendering/VariableFxBitmapComposer';

/** Where the fill sits inside a bar's background chrome (all in frame pixels, before any icon overlay offset). */
export interface VariableFxBarLayout {
    fillHeight: number;
    fillWidth: number;
    fillX: number;
    fillY: number;
    height: number;
    sliceLeftWidth: number;
    sliceRightWidth: number;
    width: number;
}

export interface VariableFxBarOverlay {
    blendMode: VariableFxBlendMode;
    layer: VariableFxBitmap;
}

export class VariableFxBarSliceUtils {
    public static resolveBackgroundSliceLeftWidth(layout: VariableFxBarLayout): number {
        return Math.max(0, Math.trunc(layout.fillX) + Math.trunc(layout.sliceLeftWidth));
    }

    public static resolveBackgroundSliceRightWidth(layout: VariableFxBarLayout): number {
        const remainder = Math.trunc(layout.width) - Math.trunc(layout.fillX) - Math.trunc(layout.fillWidth);

        return Math.max(0, remainder + Math.trunc(layout.sliceRightWidth));
    }
}
