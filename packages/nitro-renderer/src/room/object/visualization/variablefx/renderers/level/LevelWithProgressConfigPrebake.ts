import { VariableFxConfigData } from '../../VariableFxConfigData';
import { IVariableFxPrebake, VariableFxPrebakeCache } from '../../VariableFxPrebakeCache';
import { LevelBadgePainter } from './LevelBadgePainter';

export class LevelWithProgressConfigPrebake implements IVariableFxPrebake {
    public disposed: boolean = false;

    private _progressRendererConfig: VariableFxConfigData | undefined = undefined;

    constructor(public badgePainter: LevelBadgePainter) {}

    public getOrCreateProgressRendererConfig(factory: () => VariableFxConfigData): VariableFxConfigData {
        if (!this._progressRendererConfig) this._progressRendererConfig = factory();

        return this._progressRendererConfig;
    }

    public dispose(): void {
        if (this.disposed) return;

        this.disposed = true;

        this.badgePainter.dispose();

        if (this._progressRendererConfig) {
            VariableFxPrebakeCache.disposeConfigPrebake(this._progressRendererConfig);

            this._progressRendererConfig = undefined;
        }
    }
}
