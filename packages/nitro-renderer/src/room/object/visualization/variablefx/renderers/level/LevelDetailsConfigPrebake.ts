import { createTransparentBitmap, disposeBitmap, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxConfigData } from '../../VariableFxConfigData';
import { IVariableFxPrebake, VariableFxPrebakeCache } from '../../VariableFxPrebakeCache';
import { LevelBadgePainter } from './LevelBadgePainter';
import { LevelDetailsNumberPainter } from './LevelDetailsNumberPainter';

const FRAME_HEIGHT = 29;
const BACKGROUND_SLICE_LEFT_WIDTH = 29;
const BACKGROUND_SLICE_RIGHT_WIDTH = 6;
const MAX_SHARED_BACKGROUND_PREBAKE_DIGITS = 5;

export class LevelDetailsConfigPrebake implements IVariableFxPrebake {
    public disposed: boolean = false;
    public numberPainter: LevelDetailsNumberPainter | undefined;

    private _backgroundPrebakes: Map<number, VariableFxBitmap> = new Map();
    private _progressRendererConfig: VariableFxConfigData | undefined = undefined;

    constructor(
        public background: VariableFxBitmap,
        public badgePainter: LevelBadgePainter,
        numberPainter: LevelDetailsNumberPainter,
    ) {
        this.numberPainter = numberPainter;
    }

    public getBackgroundPrebake(digitCount: number, frameWidth: number): { bitmap: VariableFxBitmap; ownsPrebake: boolean } {
        const digits = Math.max(1, digitCount);
        const width = Math.max(1, frameWidth);

        if (digits > MAX_SHARED_BACKGROUND_PREBAKE_DIGITS) return { bitmap: this.createBackgroundPrebake(width), ownsPrebake: true };

        let bitmap = this._backgroundPrebakes.get(digits);

        if (!bitmap) {
            bitmap = this.createBackgroundPrebake(width);

            this._backgroundPrebakes.set(digits, bitmap);
        }

        return { bitmap, ownsPrebake: false };
    }

    public getOrCreateProgressRendererConfig(factory: () => VariableFxConfigData): VariableFxConfigData {
        if (!this._progressRendererConfig) this._progressRendererConfig = factory();

        return this._progressRendererConfig;
    }

    public dispose(): void {
        if (this.disposed) return;

        this.disposed = true;

        this.badgePainter.dispose();

        if (this.numberPainter) {
            this.numberPainter.dispose();
            this.numberPainter = undefined;
        }

        for (const bitmap of this._backgroundPrebakes.values()) disposeBitmap(bitmap);

        this._backgroundPrebakes.clear();

        if (this._progressRendererConfig) {
            VariableFxPrebakeCache.disposeConfigPrebake(this._progressRendererConfig);

            this._progressRendererConfig = undefined;
        }
    }

    private createBackgroundPrebake(width: number): VariableFxBitmap {
        const bitmap = createTransparentBitmap(width, FRAME_HEIGHT);
        const composer = new VariableFxBitmapComposer(bitmap);

        composer.clear(0);
        composer.drawThreeSlice(this.background, BACKGROUND_SLICE_LEFT_WIDTH, BACKGROUND_SLICE_RIGHT_WIDTH, width, 0, 0, 'normal', 255);

        return bitmap;
    }
}
