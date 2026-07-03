import { IAddDataContainer } from "./IAddDataContainer";
import { IAnimationLayerData } from "./IAnimationLayerData";
import { IAvatarDataContainer } from "./IAvatarDataContainer";
import { IDirectionDataContainer } from "./IDirectionDataContainer";
import { ISpriteDataContainer } from "./ISpriteDataContainer";

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
    readonly spriteData: ISpriteDataContainer[];
    readonly avatarData: IAvatarDataContainer | undefined;
    readonly directionData: IDirectionDataContainer | undefined;
    readonly removeData: string[];
    readonly addData: IAddDataContainer[];
    readonly resetOnToggle: boolean;
}
