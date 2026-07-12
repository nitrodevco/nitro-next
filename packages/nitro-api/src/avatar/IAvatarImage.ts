import type { Container, ImageLike, RenderTexture, Texture } from 'pixi.js';

import type { IAnimationLayerData, IAvatarDataContainer, ISpriteDataContainer } from './animation';
import type { IAvatarFigureContainer } from './IAvatarFigureContainer';
import type { IPartColor } from './structure';
import { AvatarActionStateType, AvatarFigurePartType, AvatarScaleType, AvatarSetType } from './enum';
import { IGraphicAsset } from '../asset';

export interface IAvatarImage {
    dispose(): void;
    setDirection(setType: AvatarSetType, direction: number): void;
    setDirectionAngle(setType: AvatarSetType, angle: number): void;
    getLayerData(sprite: ISpriteDataContainer): IAnimationLayerData | undefined;
    updateAnimationByFrames(frame?: number): void;
    resetAnimationFrameCounter(): void;
    getImage(setType: AvatarSetType, hightlight: boolean, scale?: number): RenderTexture | undefined;
    getCroppedImageAsync(setType: AvatarSetType, hightlight: boolean, scale?: number): Promise<ImageLike | undefined>;
    initActionAppends(): void;
    endActionAppends(): void;
    appendAction(action: AvatarActionStateType, ..._args: (AvatarActionStateType | number)[]): boolean;
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
    readonly mainAction: string;
    readonly avatarSpriteData: IAvatarDataContainer | undefined;
    readonly disposed: boolean;
}
