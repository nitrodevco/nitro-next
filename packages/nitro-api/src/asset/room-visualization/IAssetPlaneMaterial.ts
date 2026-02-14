import type { IAssetPlaneMaterialCellMatrix } from './IAssetPlaneMaterialCellMatrix';

export interface IAssetPlaneMaterial {
    id?: string;
    matrices?: IAssetPlaneMaterialCellMatrix[];
}
