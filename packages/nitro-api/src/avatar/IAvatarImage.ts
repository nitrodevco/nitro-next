import type { ImageLike, RenderTexture } from 'pixi.js';

import { IGraphicAsset } from '../asset';
import { IActiveActionData } from './actions';
import type { IAnimationLayerData, IAvatarDataContainer, ISpriteDataContainer } from './animation';
import { AvatarActionStateType, AvatarFigurePartType, AvatarScaleType, AvatarSetType } from './enum';
import type { IAvatarFigureContainer } from './IAvatarFigureContainer';
import type { IPartColor } from './structure';

export interface IAvatarImage {
    dispose(): void;
    setDirection(setType: AvatarSetType, direction: number): void;
    setDirectionAngle(setType: AvatarSetType, angle: number): void;
    getLayerData(sprite: ISpriteDataContainer): IAnimationLayerData | undefined;
    updateAnimationByFrames(frame?: number): void;
    resetAnimationFrameCounter(): void;
    getImage(setType: AvatarSetType, hightlight: boolean, scale?: number): RenderTexture | undefined;
    getCroppedImageAsync(setType: AvatarSetType, hightlight: boolean, scale?: number): Promise<ImageLike | undefined>;
    getCroppedBase64Async(setType: AvatarSetType, hightlight: boolean, scale?: number): Promise<string | undefined>;
    initActionAppends(): void;
    endActionAppends(): void;
    appendAction(action: AvatarActionStateType, ..._args: (AvatarActionStateType | number)[]): boolean;
    disposeInactiveActionCache(): void;
    getTotalFrameCount(): number;
    getFigure(): IAvatarFigureContainer;
    getScale(): AvatarScaleType;
    getPartColor(partType: AvatarFigurePartType): IPartColor | undefined;
    getSprites(): ISpriteDataContainer[];
    getCanvasOffsets(): number[];
    getAsset(name: string): IGraphicAsset | undefined;
    getDirection(): number;
    isAnimating(): boolean;
    isPlaceholder(): boolean;
    forceActionUpdate(): void;
    readonly animationHasResetOnToggle: boolean;
    readonly mainAction: IActiveActionData;
    readonly avatarSpriteData: IAvatarDataContainer | undefined;
    readonly disposed: boolean;
}
