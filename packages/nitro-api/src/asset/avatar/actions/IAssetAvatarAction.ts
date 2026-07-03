import { IAssetAvatarActionParam } from "./IAssetAvatarActionParam";
import { IAssetAvatarActionType } from "./IAssetAvatarActionType";

export interface IAssetAvatarAction {
    readonly id: string;
    readonly state: string;
    readonly precedence: number;
    readonly main?: boolean;
    readonly isDefault?: boolean;
    readonly animation?: boolean;
    readonly startFromFrameZero?: boolean;
    readonly preventHeadTurn?: boolean;
    readonly geometryType: 'horizontal' | 'vertical' | 'sitting' | 'swim';
    readonly activePartSet?: string;
    readonly assetPartDefinition: string;
    readonly prevents?: string[];
    readonly lay?: string;
    readonly params?: IAssetAvatarActionParam[];
    readonly types?: IAssetAvatarActionType[];
}