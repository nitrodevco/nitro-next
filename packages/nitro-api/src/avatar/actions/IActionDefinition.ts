import { IAssetAvatarActionType } from "#api/asset/index";

export interface IActionDefinition {
    getOffsets(size: string, direction: number): [number, number, number];
    setOffsets(size: string, direction: number, offset: [number, number, number]): void
    getType(id: number): IAssetAvatarActionType | undefined;
    getParameterValue(id: string): string;
    getPrevents(typeId: number): string[];
    getPreventHeadTurn(typeId: number): boolean;
    isAnimated(typeId: number): boolean;
    readonly id: string;
    readonly state: string;
    readonly precedence: number;
    readonly activePartSet: string | undefined;
    readonly assetPartDefinition: string;
    readonly lay: string | undefined;
    readonly geometryType: string;
    readonly isMain: boolean;
    readonly isDefault: boolean;
    readonly isAnimation: boolean;
    readonly startFromFrameZero: boolean;
    readonly prevents: string[];
    readonly preventHeadTurn: boolean;
    readonly params: Map<string, string>;
}
