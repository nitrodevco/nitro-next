import { IVariableFxAssetProvider } from './IVariableFxAssetProvider';
import { IVariableFxVisualizationRoomData } from './IVariableFxVisualizationRoomData';
import { VariableFxRendererRegistry } from './VariableFxRendererRegistry';
import { VariableFxVisualizationConfigManager } from './VariableFxVisualizationConfigManager';

export class VariableFxVisualizationRoomData implements IVariableFxVisualizationRoomData {
    private _assetProvider: IVariableFxAssetProvider;
    private _rendererRegistry: VariableFxRendererRegistry;
    private _manager: VariableFxVisualizationConfigManager = new VariableFxVisualizationConfigManager();

    constructor(assetProvider: IVariableFxAssetProvider, rendererRegistry: VariableFxRendererRegistry) {
        this._assetProvider = assetProvider;
        this._rendererRegistry = rendererRegistry;
    }

    public get variableFxVisualizationManager(): VariableFxVisualizationConfigManager {
        return this._manager;
    }

    public get variableFxAssetProvider(): IVariableFxAssetProvider {
        return this._assetProvider;
    }

    public get variableFxRendererRegistry(): VariableFxRendererRegistry {
        return this._rendererRegistry;
    }

    public dispose(): void {
        this._manager.dispose();
    }
}
