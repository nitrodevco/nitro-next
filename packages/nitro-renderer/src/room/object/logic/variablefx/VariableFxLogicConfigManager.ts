import { VariableFxLogicConfig } from './VariableFxLogicConfig';

/** The logic side's per-room config table (one for users, one for furniture); `updateId` bumps on every change. */
export class VariableFxLogicConfigManager {
    private _configs: Map<number, VariableFxLogicConfig> = new Map();
    private _updateId: number = 0;
    private _disposed: boolean = false;

    public upsertConfig(config: VariableFxLogicConfig): void {
        config.updateId = ++this._updateId;

        this._configs.set(config.configId, config);
    }

    public getConfig(configId: number): VariableFxLogicConfig | undefined {
        return this._configs.get(configId);
    }

    public removeConfig(configId: number): void {
        if (this._configs.delete(configId)) this._updateId++;
    }

    public clear(): void {
        if (this._configs.size > 0) this._updateId++;

        this._configs.clear();
    }

    public get updateId(): number {
        return this._updateId;
    }

    public dispose(): void {
        if (this._disposed) return;

        this.clear();

        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }
}
