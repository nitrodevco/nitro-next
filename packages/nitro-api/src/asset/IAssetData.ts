import { IAssetAnimation } from './animation';
import { IAsset } from './IAsset';
import { IAssetAlias } from './IAssetAlias';
import { IAssetPalette } from './IAssetPalette';
import { IAssetLogicData } from './logic/IAssetLogicData';
import { IAssetRoomVisualizationData } from './room-visualization';
import { ISpritesheetData } from './spritesheet';
import { IAssetVisualizationData } from './visualization';

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
