import type { Container, Texture } from 'pixi.js';

import type { IAnimationLayerData, ISpriteDataContainer } from './animation';
import type { IAvatarFigureContainer } from './IAvatarFigureContainer';
import type { IPartColor } from './structure';

export interface IAvatarImage {
    dispose(): void;
    setDirection(_arg_1: string, _arg_2: number): void;
    setDirectionAngle(_arg_1: string, _arg_2: number): void;
    updateAnimationByFrames(_arg_1?: number): void;
    getScale(): string;
    getSprites(): ISpriteDataContainer[];
    getLayerData(_arg_1: ISpriteDataContainer): IAnimationLayerData;
    processAsTexture(setType: string, hightlight?: boolean, texture?: Texture): Texture;
    processAsImageUrl(setType: string): string;
    processAsContainer(setType: string): Container;
    getDirection(): number;
    getFigure(): IAvatarFigureContainer;
    getPartColor(_arg_1: string): IPartColor;
    isAnimating(): boolean;
    getCanvasOffsets(): number[];
    initActionAppends(): void;
    endActionAppends(): void;
    appendAction(_arg_1: string, ..._args: any[]): boolean;
    isPlaceholder(): boolean;
    animationHasResetOnToggle: boolean;
    resetAnimationFrameCounter(): void;
}
