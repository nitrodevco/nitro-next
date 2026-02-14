import type { IAssetAnimation } from './animation';
import type { IAsset } from './IAsset';
import type { IAssetAlias } from './IAssetAlias';
import type { IAssetPalette } from './IAssetPalette';
import type { IAssetLogicData } from './logic';
import type { IAssetRoomVisualizationData } from './room-visualization';
import type { ISpritesheetData } from './spritesheet';
import type { IAssetVisualizationData } from './visualization';

export interface IAssetData {
    type?: string;
    name: string;
    visualizationType?: string;
    logicType?: string;
    spritesheet?: ISpritesheetData;
    logic?: IAssetLogicData;
    assets?: { [index: string]: IAsset };
    aliases?: { [index: string]: IAssetAlias };
    animations?: { [index: string]: IAssetAnimation };
    palettes?: { [index: string]: IAssetPalette };
    visualizations?: IAssetVisualizationData[];
    roomVisualization?: IAssetRoomVisualizationData;
}
