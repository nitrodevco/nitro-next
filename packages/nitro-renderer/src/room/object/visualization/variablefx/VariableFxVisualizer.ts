import { IVariableFxAssetProvider } from './IVariableFxAssetProvider';
import { IVariableFxRenderer } from './IVariableFxRenderer';
import { VariableFxConfigData } from './VariableFxConfigData';
import { VariableFxFrame } from './VariableFxFrame';
import { IVariableFxPrebake } from './VariableFxPrebakeCache';
import { VariableFxRendererContext } from './VariableFxRendererContext';
import { VariableFxRendererFactory, VariableFxRendererRegistry } from './VariableFxRendererRegistry';
import { VariableFxStatusData } from './VariableFxStatusData';

/** One config + status pair being drawn: owns the renderer and keeps its context up to date. */
export class VariableFxVisualizer {
    private _assetProvider: IVariableFxAssetProvider | undefined;
    private _config: VariableFxConfigData;
    private _context: VariableFxRendererContext;
    private _registry: VariableFxRendererRegistry | undefined;
    private _renderer: IVariableFxRenderer;
    private _prebakeAtCreation: IVariableFxPrebake | undefined;
    private _requiresAnimationTick: boolean = true;
    private _status: VariableFxStatusData;

    constructor(config: VariableFxConfigData, status: VariableFxStatusData, time: number, assetProvider: IVariableFxAssetProvider | undefined, registry: VariableFxRendererRegistry | undefined) {
        this._config = config;
        this._status = status;
        this._assetProvider = assetProvider;
        this._registry = registry;
        this._context = this.createContext();

        const factory = this.resolveRendererFactory(config);

        if (!factory) throw new Error(this.createMissingRendererMessage(config));

        this._renderer = factory(this._context);
        this._prebakeAtCreation = config.prebake;

        this._renderer.updateData(this._context, time);
    }

    public get frame(): VariableFxFrame {
        return this._renderer.frame;
    }

    public get requiresAnimationTick(): boolean {
        return this._requiresAnimationTick;
    }

    public updateData(status: VariableFxStatusData, time: number): void {
        this._status = status;
        this._context = this.createContext();
        this._requiresAnimationTick = true;

        this._renderer.updateData(this._context, time);
    }

    public needsUpdate(time: number): boolean {
        if (this.isRendererPrebakeStale()) {
            this._requiresAnimationTick = false;

            return false;
        }

        const needsUpdate = this._renderer.needsUpdate(time);

        this._requiresAnimationTick = needsUpdate || this._renderer.isContinuous;

        return needsUpdate;
    }

    public update(time: number): boolean {
        if (this.isRendererPrebakeStale()) {
            this._requiresAnimationTick = false;

            return false;
        }

        const updated = this._renderer.update(time);

        this._requiresAnimationTick = updated || this._renderer.isContinuous || this._renderer.needsUpdate(time);

        return updated;
    }

    public dispose(): void {
        this._renderer.dispose();
    }

    private createContext(): VariableFxRendererContext {
        const overrideMin = this._status.effectiveOverrideMinValue;
        const overrideMax = this._status.effectiveOverrideMaxValue;
        const minValue = overrideMin === undefined ? this._config.defaultMinValue : overrideMin;
        const maxValue = overrideMax === undefined ? this._config.defaultMaxValue : overrideMax;
        const progress = this.calculateProgress(this._status.value, minValue, maxValue);

        return new VariableFxRendererContext(this._assetProvider, this._config, this._status, minValue, maxValue, progress, this._registry);
    }

    private resolveRendererFactory(config: VariableFxConfigData): VariableFxRendererFactory | undefined {
        if (!this._registry) return undefined;

        if (config.rendererId >= 0) {
            const factory = this._registry.resolveByServerRenderer(config.rendererId);

            if (factory) return factory;
        }

        return this._registry.resolve(config.category, config.renderer);
    }

    private createMissingRendererMessage(config: VariableFxConfigData): string {
        if (config.rendererId >= 0) return `No Variable FX renderer registered for server renderer id '${config.rendererId}'.`;

        return `No Variable FX renderer registered for category '${config.category}' and renderer '${config.renderer}'.`;
    }

    /** The config's prebake was disposed/replaced under us (config re-sent): stop drawing until the addition recreates us. */
    private isRendererPrebakeStale(): boolean {
        return !!this._prebakeAtCreation && this._config.prebake !== this._prebakeAtCreation;
    }

    private calculateProgress(value: number, minValue: number, maxValue: number): number {
        if (!Number.isFinite(value) || !Number.isFinite(minValue) || !Number.isFinite(maxValue) || maxValue === minValue) return 0;

        return Math.max(0, Math.min(1, (value - minValue) / (maxValue - minValue)));
    }
}
