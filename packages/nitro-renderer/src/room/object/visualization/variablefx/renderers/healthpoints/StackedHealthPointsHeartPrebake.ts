import { createTransparentBitmap, disposeBitmap, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { IVariableFxPrebake } from '../../VariableFxPrebakeCache';
import { VariableFxBarOverlay } from '../bar/VariableFxBarLayout';

export interface StackedHealthPointsAssets {
    background: VariableFxBitmap;
    metallic: VariableFxBitmap | undefined;
    overlays: VariableFxBarOverlay[];
}

/** One tinted heart per fill colour, baked on demand and shared by every stacked-hearts visualizer of the config. */
export class StackedHealthPointsHeartPrebake implements IVariableFxPrebake {
    public heartHeight: number;
    public heartWidth: number;

    private _assets: StackedHealthPointsAssets | undefined;
    private _hearts: Map<number, VariableFxBitmap> = new Map();

    constructor(assets: StackedHealthPointsAssets) {
        this._assets = assets;
        this.heartWidth = assets.background.width;
        this.heartHeight = assets.background.height;
    }

    public getOrCreateHeartPrebake(argb: number): VariableFxBitmap {
        const existing = this._hearts.get(argb);

        if (existing) return existing;

        const heart = this.createHeartPrebake(argb);

        this._hearts.set(argb, heart);

        return heart;
    }

    public dispose(): void {
        for (const heart of this._hearts.values()) disposeBitmap(heart);

        this._hearts.clear();
        this._assets = undefined;
    }

    private createHeartPrebake(argb: number): VariableFxBitmap {
        const heart = createTransparentBitmap(this.heartWidth, this.heartHeight);
        const assets = this._assets;

        if (!assets) return heart;

        const composer = new VariableFxBitmapComposer(heart);

        composer.clear(0);
        composer.drawTintedLayer(assets.background, 0, 0, argb, 'normal', 255);

        if (assets.metallic) composer.drawLayer(assets.metallic, 0, 0, 'add', 255);

        for (const overlay of assets.overlays) composer.drawLayer(overlay.layer, 0, 0, overlay.blendMode, 255);

        return heart;
    }
}
