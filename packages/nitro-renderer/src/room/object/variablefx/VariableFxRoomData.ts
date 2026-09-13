import { IVariableFxConfigUpdateData } from '@nitrodevco/nitro-api';

import { VariableFxLogicConfig } from '../logic/variablefx/VariableFxLogicConfig';
import { VariableFxLogicConfigManager } from '../logic/variablefx/VariableFxLogicConfigManager';
import { GetVariableFxAssetLibrary } from '../visualization/variablefx/VariableFxAssetLibrary';
import { VariableFxConfigData } from '../visualization/variablefx/VariableFxConfigData';
import { VariableFxPreviewStyles } from '../visualization/variablefx/VariableFxPreviewStyles';
import { VariableFxRendererRegistry } from '../visualization/variablefx/VariableFxRendererRegistry';
import { VariableFxServerTables } from '../visualization/variablefx/VariableFxTables';
import { VariableFxVisualizationRoomData } from '../visualization/variablefx/VariableFxVisualizationRoomData';

let sharedRegistry: VariableFxRendererRegistry | undefined = undefined;

const getSharedRegistry = (): VariableFxRendererRegistry => {
    if (!sharedRegistry) sharedRegistry = VariableFxRendererRegistry.createDefault(GetVariableFxAssetLibrary());

    return sharedRegistry;
};

/** Called once the atlas has loaded so the registry picks up the server renderer id table it ships. */
export const RefreshVariableFxRendererMappings = (): void => {
    getSharedRegistry().registerRendererMappings(GetVariableFxAssetLibrary().getRendererMappings());
};

/**
 * Everything Variable FX a room keeps: the logic config tables (visibility rules) and the
 * visualization config tables (renderer settings + prebakes), each split by user vs furniture
 * the way the server sends them. Objects get the matching table by category when created.
 */
export class VariableFxRoomData {
    private _avatarLogic: VariableFxLogicConfigManager = new VariableFxLogicConfigManager();
    private _furnitureLogic: VariableFxLogicConfigManager = new VariableFxLogicConfigManager();
    private _avatarVisualization: VariableFxVisualizationRoomData;
    private _furnitureVisualization: VariableFxVisualizationRoomData;

    constructor() {
        const library = GetVariableFxAssetLibrary();
        const registry = getSharedRegistry();

        this._avatarVisualization = new VariableFxVisualizationRoomData(library, registry);
        this._furnitureVisualization = new VariableFxVisualizationRoomData(library, registry);
    }

    public get avatarLogicManager(): VariableFxLogicConfigManager {
        return this._avatarLogic;
    }

    public get furnitureLogicManager(): VariableFxLogicConfigManager {
        return this._furnitureLogic;
    }

    public get avatarVisualizationData(): VariableFxVisualizationRoomData {
        return this._avatarVisualization;
    }

    public get furnitureVisualizationData(): VariableFxVisualizationRoomData {
        return this._furnitureVisualization;
    }

    public updateConfigs(configs: IVariableFxConfigUpdateData[]): void {
        for (const config of configs) {
            const logicManager = config.isUserFx ? this._avatarLogic : this._furnitureLogic;
            const visualizationManager = (config.isUserFx ? this._avatarVisualization : this._furnitureVisualization).variableFxVisualizationManager;
            const style = VariableFxPreviewStyles.getByCategoryAndStyleId(config.categoryId, config.styleId);
            const rendererName = VariableFxServerTables.resolveRendererById(config.rendererId) ?? style?.defaultRenderer ?? '';

            logicManager.upsertConfig(new VariableFxLogicConfig(config.configId, config.isUserFx, config.showMode, config.showTriggerMask, config.showOnMouseHover, config.showDuration));

            visualizationManager.upsertConfig(config.configId, new VariableFxConfigData(
                VariableFxServerTables.resolveCategoryById(config.categoryId) ?? style?.category ?? '',
                style?.serverStyle ?? rendererName,
                rendererName,
                VariableFxServerTables.resolveWidthById(config.widthId),
                VariableFxServerTables.resolveColorById(config.colorId),
                config.defaultMinValue,
                config.defaultMaxValue,
                new Map(config.extra),
                config.categoryId,
                config.styleId,
                config.rendererId,
            ));
        }
    }

    public removeConfigs(configIds: number[]): void {
        for (const configId of configIds) {
            this._avatarLogic.removeConfig(configId);
            this._furnitureLogic.removeConfig(configId);
            this._avatarVisualization.variableFxVisualizationManager.removeConfig(configId);
            this._furnitureVisualization.variableFxVisualizationManager.removeConfig(configId);
        }
    }

    public dispose(): void {
        this._avatarLogic.dispose();
        this._furnitureLogic.dispose();
        this._avatarVisualization.dispose();
        this._furnitureVisualization.dispose();
    }
}
