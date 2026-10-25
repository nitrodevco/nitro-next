import { VariableFxConfigData } from './VariableFxConfigData';
import { VariableFxPrebakeCache } from './VariableFxPrebakeCache';

/**
 * The visualization side's per-room config table (one for users, one for furniture). Every
 * change bumps `updateId` so visualizations know to re-reconcile, and each config carries its
 * own update id so a stack addition can tell when its config was replaced.
 */
export class VariableFxVisualizationConfigManager {
    private _configs: Map<number, VariableFxConfigData> = new Map();
    private _configUpdateIds: Map<number, number> = new Map();
    private _updateId: number = 0;
    private _disposed: boolean = false;

    public upsertConfig(configId: number, config: VariableFxConfigData): void {
        const existing = this._configs.get(configId);
        const updateId = ++this._updateId;

        if (existing && existing !== config) this.disposeConfig(existing);

        this._configs.set(configId, config);
        this._configUpdateIds.set(configId, updateId);
    }

    public removeConfig(configId: number): void {
        const existing = this._configs.get(configId);

        if (!existing) return;

        this._configs.delete(configId);
        this._configUpdateIds.delete(configId);

        this.disposeConfig(existing);

        this._updateId++;
    }

    public getConfig(configId: number): VariableFxConfigData | undefined {
        return this._configs.get(configId);
    }

    public getConfigUpdateId(configId: number): number {
        return this._configUpdateIds.get(configId) ?? 0;
    }

    public clear(): void {
        if (this._configs.size > 0) this._updateId++;

        for (const config of this._configs.values()) this.disposeConfig(config);

        this._configs.clear();
        this._configUpdateIds.clear();
    }

    public dispose(): void {
        if (this._disposed) return;

        this.clear();

        this._disposed = true;
    }

    public get updateId(): number {
        return this._updateId;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private disposeConfig(config: VariableFxConfigData): void {
        VariableFxPrebakeCache.disposeConfigPrebake(config);
    }
}
