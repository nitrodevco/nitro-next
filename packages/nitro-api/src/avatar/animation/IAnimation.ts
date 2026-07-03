import { IAddDataContainer } from "./IAddDataContainer";
import { IAnimationLayerData } from "./IAnimationLayerData";

export interface IAnimation {
    frameCount(name?: string): number;
    hasOverriddenActions(): boolean;
    overriddenActionNames(): string[];
    overridingAction(name: string): string | undefined;
    getAnimatedBodyPartIds(frameCount: number, name?: string): string[];
    getLayerData(frameCount: number, spriteId: string, name?: string): IAnimationLayerData | undefined;
    getAddData(id: string): IAddDataContainer | undefined;
    hasAvatarData(): boolean;
    hasDirectionData(): boolean;
    hasAddData(): boolean;
    readonly id: string;
    spriteData: any;
    removeData: any;
    addData: any;
    resetOnToggle: boolean;
}
