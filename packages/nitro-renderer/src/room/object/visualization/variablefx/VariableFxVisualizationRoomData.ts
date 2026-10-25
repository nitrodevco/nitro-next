import { IVariableFxAssetProvider } from './IVariableFxAssetProvider';
import { IVariableFxVisualizationRoomData } from './IVariableFxVisualizationRoomData';
import { VariableFxRendererRegistry } from './VariableFxRendererRegistry';
import { VariableFxVisualizationConfigManager } from './VariableFxVisualizationConfigManager';

/**
 * The Variable FX half of Flash's `AvatarVisualizationRoomData` /
 * `FurnitureVisualizationRoomData`, shared by both: the room's FX configs, asset provider and
 * renderer registry.
 */
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
