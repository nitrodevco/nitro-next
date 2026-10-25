import { VariableFxConfigData } from './VariableFxConfigData';

export interface IVariableFxPrebake {
    dispose(): void;
}

/** A prebake that is just a bag of layers plus the callback that releases them. */
export class VariableFxGenericRendererPrebake<T> implements IVariableFxPrebake {
    private _disposeCallback: (() => void) | undefined;

    constructor(
        public data: T,
        disposeCallback: () => void,
    ) {
        this._disposeCallback = disposeCallback;
    }

    public dispose(): void {
        if (this._disposeCallback) {
            this._disposeCallback();
            this._disposeCallback = undefined;
        }

        this.data = null!;
    }
}

/**
 * Expensive per-config layers (backgrounds, tinted bars, badge frames) are baked once and hung
 * off the config so every object showing the same config shares them; the config manager
 * disposes them when the config is replaced or removed.
 */
export class VariableFxPrebakeCache {
    public static getOrCreate<T extends IVariableFxPrebake>(config: VariableFxConfigData, factory: () => T): T {
        if (config.prebake) return config.prebake as T;

        config.prebake = factory();

        return config.prebake as T;
    }

    public static disposeConfigPrebake(config: VariableFxConfigData): void {
        if (!config.prebake) return;

        config.prebake.dispose();
        config.prebake = undefined;
    }
}
