import { ImageLike, Point, RenderTexture, Texture } from 'pixi.js';

import { IGraphicAsset } from '../asset';
import { IActiveActionData } from './actions';
import { IAnimationLayerData, IAvatarDataContainer, ISpriteDataContainer } from './animation';
import { AvatarActionStateType, AvatarFigurePartType, AvatarScaleType, AvatarSetType } from './enum';
import { IAvatarFigureContainer } from './IAvatarFigureContainer';
import { IPartColor } from './structure';

export interface IAvatarImage {
    dispose(): void;
    setDirection(setType: AvatarSetType, direction: number): void;
    setDirectionAngle(setType: AvatarSetType, angle: number): void;
    getLayerData(sprite: ISpriteDataContainer): IAnimationLayerData | undefined;
    updateAnimationByFrames(frame?: number): void;
    resetAnimationFrameCounter(): void;
    getImage(setType: AvatarSetType, hightlight: boolean, scale?: number): RenderTexture | undefined;
    /** `getImage` minus the empty rows above the figure: the room sprite uses it so the texture is only as tall as the avatar. */
    getImageWithCroppedTop(setType: AvatarSetType, hightlight: boolean, scale?: number): Texture | undefined;
    /** The head body part's registration point on the canvas. */
    getHeadRegPoints(setType: AvatarSetType): Point;
    /** Where the face part landed inside the head body part image, if it was drawn. */
    getFaceOffset(setType: AvatarSetType): Point;
    /** The set's parts rendered into a texture cropped to their union bounds (the Flash `getImage(setType, scale)` behaviour), optionally scaled - the caller owns the returned texture. */
    getCroppedImage(setType: AvatarSetType, hightlight: boolean, scale?: number): RenderTexture | undefined;
    getCroppedImageAsync(setType: AvatarSetType, hightlight: boolean, scale?: number): Promise<ImageLike | undefined>;
    getCroppedBase64Async(setType: AvatarSetType, hightlight: boolean, scale?: number): Promise<string | undefined>;
    initActionAppends(): void;
    endActionAppends(): void;
    appendAction(action: AvatarActionStateType, ..._args: (AvatarActionStateType | number | string)[]): boolean;
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
    /** A `BlockedAvatarImage`: the generic figure shown for an ignored user. */
    isBlocked(): boolean;
    /** Drops every cached body part and full image so the next `getImage` re-renders from the current assets. */
    resetCache(): void;
    forceActionUpdate(): void;
    readonly animationHasResetOnToggle: boolean;
    readonly mainAction: IActiveActionData;
    readonly avatarSpriteData: IAvatarDataContainer | undefined;
    readonly disposed: boolean;
}
