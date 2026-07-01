import { IAssetAvatarActionParam } from "./IAssetAvatarActionParam";
import { IAssetAvatarActionType } from "./IAssetAvatarActionType";

export interface IAssetAvatarAction {
    id: string;
    state: string;
    precedence: number;
    main?: boolean;
    isDefault?: boolean;
    animation?: boolean;
    startFromFrameZero?: boolean;
    preventHeadTurn?: boolean;
    geometryType: 'horizontal' | 'vertical' | 'sitting' | 'swim';
    activePartSet?: string;
    assetPartDefinition: string;
    prevents?: string[];
    lay?: string;
    params?: IAssetAvatarActionParam[];
    types?: IAssetAvatarActionType[];
}