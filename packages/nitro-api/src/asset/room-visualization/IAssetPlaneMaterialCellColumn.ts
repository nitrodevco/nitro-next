import type { IAssetPlaneMaterialCell } from './IAssetPlaneMaterialCell';

export interface IAssetPlaneMaterialCellColumn {
    repeatMode?: string;
    width?: number;
    cells?: IAssetPlaneMaterialCell[];
}
