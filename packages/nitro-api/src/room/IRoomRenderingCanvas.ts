import type { Container, Point, Texture } from 'pixi.js';

import type { IRoomEventHandler } from './IRoomEventHandler';
import type { IRoomGeometry } from './IRoomGeometry';
import type { ISortableSprite } from './object';
import type { RoomObjectSpriteData } from './utils';

export interface IRoomRenderingCanvas {
    dispose(): void;
    initialize(width: number, height: number): void;
    setMask(flag: boolean): void;
    setScale(scale: number, point?: Point, offsetPoint?: Point): void;
    render(time: number, update?: boolean): void;
    update(): void;
    setEventHandler(handler: IRoomEventHandler): void;
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
    removeFromCache(identifier: number): void;
    geometry: IRoomGeometry;
    master: Container | undefined;
    display: Container | undefined;
    screenOffsetX: number;
    screenOffsetY: number;
    scale: number;
    width: number;
    height: number;
}
