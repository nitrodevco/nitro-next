import type { Container, Point, Texture } from 'pixi.js';

import type { IRoomGeometry } from '../IRoomGeometry';
import type { ISortableSprite } from '../object';
import type { IRoomCanvasMouseListener } from './IRoomCanvasMouseListener';
import type { RoomObjectSpriteData } from './RoomObjectSpriteData';

export interface IRoomRenderingCanvas {
    dispose(): void;
    initialize(width: number, height: number): void;
    setMask(flag: boolean): void;
    setScale(scale: number, point?: Point, offsetPoint?: Point, isFlipForced?: boolean): void;
    render(time: number, update?: boolean): void;
    update(): void;
    setMouseListener(listener: IRoomCanvasMouseListener): void;
    skipSpriteVisibilityChecking(): void;
    resumeSpriteVisibilityChecking(): void;
    getPlaneSortableSprites(): ISortableSprite[];
    handleMouseEvent(
        x: number,
        y: number,
        type: string,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean,
        buttonDown: boolean,
    ): boolean;
    getSortableSpriteList(): RoomObjectSpriteData[];
    getDisplayAsTexture(): Texture | undefined;
    moveLeft(): void;
    moveRight(): void;
    moveUp(): void;
    moveDown(): void;
    id: number;
    geometry: IRoomGeometry;
    master: Container | undefined;
    display: Container | undefined;
    screenOffsetX: number;
    screenOffsetY: number;
    scale: number;
    width: number;
    height: number;
    canvasUpdated: boolean;
}
