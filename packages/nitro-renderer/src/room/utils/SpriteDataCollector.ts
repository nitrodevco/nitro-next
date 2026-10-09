import { IPlaneDrawingData, IPlaneVisualization, IRoom, IRoomObjectSpriteData, IRoomObjectSpriteVisualization, IRoomPlane, IRoomRenderingCanvas, RoomObjectCategoryEnum, Vector3d } from '@nitrodevco/nitro-api';
import { Point, Rectangle } from 'pixi.js';

import { PlaneDrawingData } from '../object/visualization/room/PlaneDrawingData';

/**
 * Flash's `SpriteDataCollector`: what the server needs to draw a part of the room the way the
 * client shows it (`RoomEngine.getRenderRoomMessage`) - the sprites over the viewport as JSON
 * (`getFurniData`), the rendering modifiers (`getRoomRenderingModifiers`, always `{}`), and the
 * room's planes as drawing data (`getRoomPlanes`) with a background plane under them.
 *
 * Not ported, because the port's renderer has nothing to read them from: the avatars' and
 * mannequins' own sprite lists (`IRoomObjectSpriteVisualization.getSpriteList` returns none, so a
 * mannequin's `mannequin_` sprites go and an avatar is only the sprites the canvas has of it), a
 * palette sprite's `paletteSourceName` (the asset collections keep no palette XML), and the planes'
 * layers (`RoomPlane.getDrawingDatas`: masks and texture columns) - each plane is the one drawing
 * data Flash falls back to, its colour alone.
 */
export class SpriteDataCollector {
    private static MANNEQUIN_MAGIC_X_OFFSET = 1;
    private static MANNEQUIN_MAGIC_Y_OFFSET = -16;
    private static AVATAR_WATER_EFFECT_MAGIC_Y_OFFSET = -52;
    private static MAX_EXTERNAL_IMAGE_COUNT = 30;

    /** `§_-N2n§`: the z of the first sprite collected. */
    private _firstZ = 0;
    private _spriteCount = 0;
    private _externalImageCount = 0;

    constructor(
        private readonly _room: IRoom,
        private readonly _canvas: IRoomRenderingCanvas,
        private readonly _imageLibraryUrl: string,
        private readonly _groupBadgeUrl: string,
    ) {}

    /** `addMannequinSprites`: a mannequin's own `mannequin_` sprites are replaced by its figure's. */
    private addMannequinSprites(sprites: IRoomObjectSpriteData[]): IRoomObjectSpriteData[] {
        const result: IRoomObjectSpriteData[] = [];

        for (const sprite of sprites) {
            if ((sprite.type === 'boutique_mannequin1') && (sprite.name.indexOf('mannequin_') === 0)) {
                const roomObject = this._room.getRoomObject(sprite.objectId, RoomObjectCategoryEnum.Floor);
                const figureSprites = (roomObject?.visualization as IRoomObjectSpriteVisualization | undefined)?.getSpriteList?.();

                for (const figureSprite of figureSprites ?? []) {
                    figureSprite.x += sprite.x + (sprite.width / 2) + SpriteDataCollector.MANNEQUIN_MAGIC_X_OFFSET;
                    figureSprite.y += sprite.y + sprite.height + SpriteDataCollector.MANNEQUIN_MAGIC_Y_OFFSET;
                    figureSprite.z += sprite.z;
                    result.push(figureSprite);
                }
            } else {
                result.push(sprite);
            }
        }

        return result;
    }

    /** `isSpriteInViewPort`. */
    private isSpriteInViewPort(sprite: IRoomObjectSpriteData, viewport: Rectangle): boolean {
        return new Rectangle(sprite.x + this._canvas.screenOffsetX, sprite.y + this._canvas.screenOffsetY, sprite.width, sprite.height).intersects(viewport);
    }

    /** `getFurniData`: the canvas's sprites and the users' own, nearest first, those over the viewport as JSON. */
    public getFurniData(viewport: Rectangle, excludedUserId: number): string {
        const collected: object[] = [];
        let sprites: IRoomObjectSpriteData[] = this._canvas.getSortableSpriteList();
        const canvasSprites = [ ...sprites ];

        for (const roomObject of this._room.getRoomObjectsForCategory(RoomObjectCategoryEnum.Unit)) {
            if (roomObject.id === excludedUserId) continue;

            const objectSprites = (roomObject.visualization as IRoomObjectSpriteVisualization | undefined)?.getSpriteList?.();

            if (!objectSprites) continue;

            let z = 0;
            let y = 0;

            for (const sprite of canvasSprites) {
                if (sprite.name === `avatar_${roomObject.id}`) {
                    z = sprite.z;
                    y = sprite.y + sprite.height - (this._canvas.geometry.scale / 4);
                    break;
                }
            }

            const location = this._room.getRoomObjectScreenLocation(roomObject.id, RoomObjectCategoryEnum.Unit);

            if (!location) continue;

            if (y === 0) y = location.y;

            for (const sprite of objectSprites) {
                sprite.x += location.x - this._canvas.screenOffsetX;
                sprite.y += y;
                sprite.z += z;

                if ((sprite.name.indexOf('h_std_fx29_') === 0) || (sprite.name.indexOf('h_std_fx185_') === 0)) sprite.y += SpriteDataCollector.AVATAR_WATER_EFFECT_MAGIC_Y_OFFSET;

                sprites.push(sprite);
            }
        }

        sprites = this.addMannequinSprites(sprites);
        // `sortSpriteDataObjects`: the highest z first (an equal z sorts as lower, as Flash's compare says).
        sprites.sort((a, b) => ((a.z < b.z) ? 1 : -1));

        for (const sprite of sprites) {
            if (!sprite.name || (sprite.name.indexOf('tile_cursor_') === 0) || !this.isSpriteInViewPort(sprite, viewport)) continue;
            if ((excludedUserId >= 0) && (sprite.objectId === excludedUserId)) continue;

            collected.push(this.getSpriteDataObject(sprite, viewport));

            if (!this._firstZ) this._firstZ = sprite.z;

            this._spriteCount++;
        }

        return JSON.stringify(collected);
    }

    /** `getRoomRenderingModifiers`. */
    public getRoomRenderingModifiers(): string {
        return JSON.stringify({});
    }

    /** `getSpriteDataObject`: one sprite, placed relative to the viewport. */
    private getSpriteDataObject(sprite: IRoomObjectSpriteData, viewport: Rectangle): Record<string, unknown> {
        const data: Record<string, unknown> = {};
        let name = sprite.name;

        if (name.indexOf('@') !== -1) name = name.split('@')[0];

        name = name.replace('%image.library.url%', this._imageLibraryUrl);

        if (name.indexOf('%group.badge.url%') !== -1) name = this._groupBadgeUrl.replace('%imagerdata%', name.replace('%group.badge.url%', ''));

        data.name = name;
        data.x = (sprite.x - viewport.x) + this._canvas.screenOffsetX;
        data.y = (sprite.y - viewport.y) + this._canvas.screenOffsetY;
        data.z = sprite.z;

        if (sprite.alpha && (sprite.alpha.toString() !== '255')) data.alpha = sprite.alpha;
        if (sprite.flipH) data.flipH = sprite.flipH;
        if (sprite.skew) data.skew = sprite.skew;
        if (sprite.frame) data.frame = sprite.frame;
        if (sprite.color && sprite.color.length) data.color = Math.trunc(Number(sprite.color));
        if (sprite.blendMode && (sprite.blendMode !== 'normal')) data.blendMode = sprite.blendMode;

        if (name.indexOf('http') === 0) {
            data.width = sprite.width;
            data.height = sprite.height;

            this._externalImageCount++;

            if (this._externalImageCount > SpriteDataCollector.MAX_EXTERNAL_IMAGE_COUNT) data.name = 'box';
        }

        if (sprite.posture) data.posture = sprite.posture;

        return data;
    }

    /** `sortQuadPoints`: the corners in the order the server draws a quad. */
    private static sortQuadPoints(a: Point, b: Point, c: Point, d: Point): Point[] {
        const points: Point[] = [];

        if (a.x === b.x) points.push(a, c, b, d);
        else if (a.x === c.x) points.push(a, b, c, d);
        else if (((b.x < a.x) && (b.y > a.y)) || ((b.x > a.x) && (b.y < a.y))) points.push(a, c, b, d);
        else points.push(a, b, c, d);

        if (points[0].x < points[1].x) {
            [ points[0], points[1] ] = [ points[1], points[0] ];
            [ points[2], points[3] ] = [ points[3], points[2] ];
        }

        if (points[0].y < points[2].y) {
            [ points[0], points[2] ] = [ points[2], points[0] ];
            [ points[1], points[3] ] = [ points[3], points[1] ];
        }

        return points;
    }

    /** `makeBackgroundPlane`: the viewport in the background colour, under everything collected. */
    private makeBackgroundPlane(viewport: Rectangle, color: number, planes: IPlaneDrawingData[]): IPlaneDrawingData {
        let z = 0;

        if (planes.length > 0) {
            z = planes[0].z;

            if (this._firstZ) z = Math.max(this._firstZ, z);
        } else {
            z = this._firstZ ? this._firstZ : 0;
        }

        z += (this._spriteCount * 1.776104) + (planes.length * 2.31743);

        const plane = new PlaneDrawingData(undefined, color);

        plane.cornerPoints = SpriteDataCollector.sortQuadPoints(new Point(0, 0), new Point(viewport.width, 0), new Point(0, viewport.height), new Point(viewport.width, viewport.height));
        plane.z = z;

        return plane;
    }

    /** `sortRoomPlanes`: each plane at its sprite's z, the nearest first; planes without a sprite last, behind the first sprite. */
    private sortRoomPlanes(planes: IRoomPlane[]): { plane: IRoomPlane; z: number }[] {
        const byId = new Map<number, { plane: IRoomPlane; z: number }>();
        const defaultZ = 1 + (this._firstZ || 0);

        for (const plane of planes) byId.set(plane.uniqueId, { plane, z: defaultZ });

        const sorted: { plane: IRoomPlane; z: number }[] = [];
        const planeSprites = [ ...this._canvas.getPlaneSortableSprites() ].sort((a, b) => a.z - b.z).reverse();

        for (const sortable of planeSprites) {
            const sprite = sortable.sprite;

            if (!sprite) continue;

            const entry = byId.get(sprite.id);

            if (!entry) continue;

            byId.delete(sprite.id);
            entry.z = sortable.z;
            sorted.push(entry);
        }

        return sorted.concat([ ...byId.values() ]);
    }

    /** `getRoomPlanes`: the planes over the viewport, in corner points relative to it, and the background plane first. */
    public getRoomPlanes(viewport: Rectangle, backgroundColor: number): IPlaneDrawingData[] {
        const planes: IPlaneDrawingData[] = [];
        const visualization = this._room.getRoomObjectRoom()?.visualization as unknown as IPlaneVisualization | undefined;

        if (!visualization?.planes) return planes;

        const geometry = this._canvas.geometry;

        for (const { plane, z } of this.sortRoomPlanes(visualization.planes)) {
            const leftCorner = Vector3d.sum(plane.location, plane.leftSide);
            const corners = [
                geometry.getScreenPoint(plane.location),
                geometry.getScreenPoint(leftCorner),
                geometry.getScreenPoint(Vector3d.sum(plane.location, plane.rightSide)),
                geometry.getScreenPoint(Vector3d.sum(leftCorner, plane.rightSide)),
            ].map(point => new Point(point.x, point.y));
            let outsideX = 0;
            let outsideY = 0;

            for (const point of corners) {
                // The stage's centre, the canvas's offset, then the viewport's corner.
                point.x += (this._canvas.width / 2) + this._canvas.screenOffsetX - viewport.x;
                point.y += (this._canvas.height / 2) + this._canvas.screenOffsetY - viewport.y;

                if (point.x < 0) outsideX--;
                else if (point.x >= viewport.width) outsideX++;

                if (point.y < 0) outsideY--;
                else if (point.y >= viewport.height) outsideY++;
            }

            if ((Math.abs(outsideX) === 4) || (Math.abs(outsideY) === 4)) continue;

            const cornerPoints = SpriteDataCollector.sortQuadPoints(corners[0], corners[1], corners[2], corners[3]);
            const drawingData = new PlaneDrawingData(undefined, plane.color);

            drawingData.cornerPoints = cornerPoints;
            drawingData.z = z;
            planes.push(drawingData);
        }

        planes.unshift(this.makeBackgroundPlane(viewport, backgroundColor, planes));

        return planes;
    }
}
