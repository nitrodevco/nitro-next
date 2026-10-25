import { IGraphicAssetCollection } from '@nitrodevco/nitro-api';
import { Container, RenderTexture, Sprite } from 'pixi.js';

import { drawOnPlaneCanvas } from '../PlaneCanvas';
import { AnimationItem } from './AnimationItem';

/** One item of an animation layer as `LandscapeRasterizer.parseLandscapes` resolves it: coordinates already randomised. */
export interface IPlaneAnimationLayerItem {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    asset: string;
}

/**
 * The animation layer of a landscape: its items drift across the whole landscape and each plane
 * draws the part that falls inside it, wrapping at the landscape's right and bottom edges. Ports
 * Flash `PlaneVisualizationAnimationLayer`, which is handed the canvas it draws on - the plane
 * visualization's - so it keeps none of its own.
 */
export class PlaneVisualizationAnimationLayer {
    private _items: AnimationItem[] = [];

    constructor(items: IPlaneAnimationLayerItem[] | undefined, assetCollection: IGraphicAssetCollection | undefined) {
        if (!items || !assetCollection) return;

        for (const item of items) {
            if (!item) continue;

            const texture = assetCollection.getAsset(item.asset)?.texture;

            if (!texture) continue;

            this._items.push(new AnimationItem(item.x, item.y, item.speedX, item.speedY, texture));
        }
    }

    public dispose(): void {
        for (const item of this._items) item.dispose();

        this._items = [];
    }

    /**
     * Draws the items over `canvas`, a plane `offsetX` / `offsetY` pixels into a landscape `maxX` x
     * `maxY` pixels across.
     */
    public render(canvas: RenderTexture, offsetX: number, offsetY: number, maxX: number, maxY: number, maxXUnits: number, maxYUnits: number, timeSinceStartMs: number): RenderTexture {
        if (maxX <= 0 || maxY <= 0) return canvas;

        const container = new Container();

        for (const item of this._items) {
            const bitmap = item?.bitmapData;

            if (!bitmap) continue;

            const position = item.getPosition(maxX, maxY, maxXUnits, maxYUnits, timeSinceStartMs);
            const x = position.x - offsetX;
            const y = position.y - offsetY;

            const draw = (drawX: number, drawY: number) => {
                if (drawX <= -bitmap.width || drawX >= canvas.width || drawY <= -bitmap.height || drawY >= canvas.height) return;

                const sprite = new Sprite(bitmap);

                sprite.position.set(drawX, drawY);

                container.addChild(sprite);
            };

            draw(x, y);
            draw(x - maxX, y);
            draw(x, y - maxY);
            draw(x - maxX, y - maxY);
        }

        drawOnPlaneCanvas(canvas, container);

        return canvas;
    }
}
