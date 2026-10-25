import { createTransparentBitmap, disposeBitmap, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '../../rendering/VariableFxClipRect';
import { IVariableFxPrebake } from '../../VariableFxPrebakeCache';
import { VariableFxBarOverlay } from './VariableFxBarLayout';

export interface MaskedHeartFillAssets {
    background: VariableFxBitmap;
    bar: VariableFxBitmap;
    endPointer: VariableFxBitmap;
    mask: VariableFxBitmap;
    metallic: VariableFxBitmap | undefined;
    overlays: VariableFxBarOverlay[];
}

/** Every (colour, fill width) frame of the heart is baked once and cached, as the frame count is tiny. */
export class MaskedHeartFillFramePrebake implements IVariableFxPrebake {
    private static FILL_X: number = 2;
    private static FILL_RIGHT_PADDING: number = 2;
    private static POINTER_WIDTH: number = 1;
    private static POINTER_VERTICAL_PADDING: number = 2;

    public frameWidth: number;
    public frameHeight: number;
    public progressPixelWidth: number;

    private _assets: MaskedHeartFillAssets | undefined;
    private _frames: Map<number, Map<number, VariableFxBitmap>> = new Map();

    constructor(assets: MaskedHeartFillAssets) {
        this._assets = assets;
        this.frameWidth = assets.background.width;
        this.frameHeight = assets.background.height;
        this.progressPixelWidth = Math.max(0, this.frameWidth - MaskedHeartFillFramePrebake.FILL_X - MaskedHeartFillFramePrebake.FILL_RIGHT_PADDING);
    }

    public getOrCreateFrame(argb: number, filledWidth: number): VariableFxBitmap {
        const width = Math.max(0, Math.min(this.progressPixelWidth, filledWidth));

        let byWidth = this._frames.get(argb);

        if (!byWidth) {
            byWidth = new Map();

            this._frames.set(argb, byWidth);
        }

        let frame = byWidth.get(width);

        if (frame) return frame;

        frame = this.createFrame(argb, width);

        byWidth.set(width, frame);

        return frame;
    }

    public dispose(): void {
        for (const byWidth of this._frames.values()) {
            for (const frame of byWidth.values()) disposeBitmap(frame);
        }

        this._frames.clear();
        this._assets = undefined;
    }

    private createFrame(argb: number, filledWidth: number): VariableFxBitmap {
        const assets = this._assets;
        const frame = createTransparentBitmap(this.frameWidth, this.frameHeight);

        if (!assets) return frame;

        const clip = this.createProgressClip(filledWidth);
        const composer = new VariableFxBitmapComposer(frame);

        composer.drawLayer(assets.background, 0, 0, 'normal', 255);

        if (filledWidth > 0 && clip) {
            composer.drawTintedLayer(assets.bar, 0, 0, argb, 'normal', 255, clip);

            this.drawEndPointer(composer, assets.endPointer, assets.mask, filledWidth);

            if (assets.metallic) composer.drawLayer(assets.metallic, 0, 0, 'add', 255, clip);

            for (const overlay of assets.overlays) composer.drawLayer(overlay.layer, 0, 0, overlay.blendMode, 255, clip);
        }

        return frame;
    }

    private drawEndPointer(composer: VariableFxBitmapComposer, pointer: VariableFxBitmap, mask: VariableFxBitmap, filledWidth: number): void {
        const pointerX = MaskedHeartFillFramePrebake.FILL_X + filledWidth - MaskedHeartFillFramePrebake.POINTER_WIDTH;
        const sourceX = pointerX - 1;
        const maskX = mask.width >= this.frameWidth ? 0 : pointerX - Math.trunc(mask.width / 2);
        const maskY = mask.height >= this.frameHeight ? 0 : Math.trunc((this.frameHeight - mask.height) / 2);

        composer.drawMaskedLayer(pointer, mask, sourceX, 0, maskX, maskY, 'multiply', 255, new VariableFxClipRect(pointerX, MaskedHeartFillFramePrebake.POINTER_VERTICAL_PADDING, MaskedHeartFillFramePrebake.POINTER_WIDTH, Math.max(0, this.frameHeight - 2 * MaskedHeartFillFramePrebake.POINTER_VERTICAL_PADDING)));
    }

    private createProgressClip(filledWidth: number): VariableFxClipRect | undefined {
        if (filledWidth <= 0) return undefined;

        return new VariableFxClipRect(MaskedHeartFillFramePrebake.FILL_X, 0, filledWidth, this.frameHeight);
    }
}
