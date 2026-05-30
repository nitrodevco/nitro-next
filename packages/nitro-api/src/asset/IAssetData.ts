import type { IAssetAnimation } from './animation';
import type { IAsset } from './IAsset';
import type { IAssetAlias } from './IAssetAlias';
import type { IAssetPalette } from './IAssetPalette';
import type { IAssetLogicData } from './logic/IAssetLogicData';
import type { IAssetRoomVisualizationData } from './room-visualization';
import type { ISpritesheetData } from './spritesheet';
import type { IAssetVisualizationData } from './visualization';

export interface IAssetData {
    type: string;
    visualizationType?: string;
    logicType?: string;
    spritesheet?: ISpritesheetData;
    logic?: IAssetLogicData;
    assets?: IAsset[];
    aliases?: IAssetAlias[];
    animations?: IAssetAnimation[];
    palettes?: IAssetPalette[];
    visualizations?: IAssetVisualizationData[];
    roomVisualization?: IAssetRoomVisualizationData;
}
