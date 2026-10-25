import { IVariableFxAssetProvider } from './IVariableFxAssetProvider';
import { VariableFxRendererRegistry } from './VariableFxRendererRegistry';
import { VariableFxVisualizationConfigManager } from './VariableFxVisualizationConfigManager';

/** What a room hands each avatar/furniture visualization so it can draw the Variable FX statuses its logic publishes. */
export interface IVariableFxVisualizationRoomData {
    readonly variableFxVisualizationManager: VariableFxVisualizationConfigManager;
    readonly variableFxAssetProvider: IVariableFxAssetProvider;
    readonly variableFxRendererRegistry: VariableFxRendererRegistry;
}

/** Implemented by the visualizations that can host Variable FX (avatars, pets, furniture). */
export interface IVariableFxVisualizationHost {
    variableFxRoomData: IVariableFxVisualizationRoomData | undefined;
}

export const isVariableFxVisualizationHost = (value: unknown): value is IVariableFxVisualizationHost => {
    return !!value && typeof value === 'object' && 'variableFxRoomData' in value;
};
