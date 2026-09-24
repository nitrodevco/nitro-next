import { IAssetPlane, IAssetPlaneVisualizationAnimatedLayer, IAssetPlaneVisualizationLayer, IVector3D } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { PlaneBitmapData, Randomizer } from '../../utils';
import { PlaneRasterizer } from '../basic/PlaneRasterizer';
import { PlaneVisualizationLayer } from '../basic/PlaneVisualizationLayer';
import { LandscapePlane } from './LandscapePlane';
import { IPlaneAnimationLayerItem } from './PlaneVisualizationAnimationLayer';

/**
 * Draws the landscape seen through a room's windows: the sky, hills and trees of `landscapeData`, and
 * the clouds of its animation layers drifting across all of the room's landscape planes as one.
 * Ports Flash `LandscapeRasterizer`.
 *
 * An animated landscape's texture is stamped to expire at the next `UPDATE_INTERVAL`, which is what
 * makes `RoomPlane` draw it again - the clouds move in half-second steps, as in the client.
 */
export class LandscapeRasterizer extends PlaneRasterizer {
    private static UPDATE_INTERVAL: number = 500;

    protected override initializePlanes(): void {
        if (this.data?.planes) this.parseLandscapes(this.data.planes);
    }

    private parseLandscapes(landscapes: IAssetPlane[]): void {
        const randomSeed = Math.trunc(Math.random() * 654321);

        for (const landscape of landscapes) {
            if (!landscape?.id) continue;

            const plane = new LandscapePlane();

            for (const visualization of landscape.animatedVisualization ?? []) {
                if (visualization?.size === undefined) continue;

                const size = visualization.size;
                const horizontalAngle = visualization.horizontalAngle ?? LandscapePlane.HORIZONTAL_ANGLE_DEFAULT;
                const verticalAngle = visualization.verticalAngle ?? LandscapePlane.VERTICAL_ANGLE_DEFAULT;
                const layers = visualization.allLayers ?? [];
                const planeVisualization = plane.createPlaneVisualization(size, layers.length, this.getGeometry(size, horizontalAngle, verticalAngle));

                if (!planeVisualization) continue;

                Randomizer.setSeed(randomSeed);

                layers.forEach((layer, index) => {
                    if (LandscapeRasterizer.isAnimationLayer(layer)) {
                        planeVisualization.setAnimationLayer(index, this.parseAnimationItems(layer), this.assetCollection);

                        return;
                    }

                    const material = layer.materialId ? this.getMaterial(layer.materialId) : undefined;
                    const align = (layer.align === 'bottom') ? PlaneVisualizationLayer.ALIGN_BOTTOM : PlaneVisualizationLayer.ALIGN_TOP;

                    planeVisualization.setLayer(index, material, layer.color ?? LandscapePlane.DEFAULT_COLOR, align, layer.offset ?? PlaneVisualizationLayer.DEFAULT_OFFSET);
                });
            }

            if (!this.addPlane(landscape.id, plane)) plane.dispose();
        }
    }

    /** The converter writes an `animationLayer` as the object with `items`; a `visualizationLayer` has none. */
    private static isAnimationLayer(layer: IAssetPlaneVisualizationLayer | IAssetPlaneVisualizationAnimatedLayer): layer is IAssetPlaneVisualizationAnimatedLayer {
        return 'items' in layer;
    }

    private parseAnimationItems(layer: IAssetPlaneVisualizationAnimatedLayer): IPlaneAnimationLayerItem[] {
        const items: IPlaneAnimationLayerItem[] = [];

        for (const item of layer.items ?? []) {
            if (item?.id === undefined || !item.assetId) continue;

            items.push({
                x: this.getCoordinateValue(item.x, item.randomX),
                y: this.getCoordinateValue(item.y, item.randomY),
                speedX: item.speedX ?? NaN,
                speedY: item.speedY ?? NaN,
                asset: item.assetId,
            });
        }

        return items;
    }

    /** A fraction of the landscape: the `value` percentage, plus a random share of the `random` one. A value without `%` counts for nothing. */
    private getCoordinateValue(value: string | undefined, random: string | undefined): number {
        let result = 0;

        if (value && value.length > 0 && value.endsWith('%')) result = parseFloat(value.slice(0, -1)) / 100;

        if (random && random.length > 0) {
            const max = 10000;
            const share = Randomizer.getValues(1, 0, max)[0] / max;

            if (random.endsWith('%')) result += (share * parseFloat(random.slice(0, -1))) / 100;
        }

        return result;
    }

    public override render(
        canvas: RenderTexture | undefined,
        planeId: string,
        width: number,
        height: number,
        scale: number,
        normal: IVector3D,
        useTexture: boolean,
        offsetX: number = 0,
        offsetY: number = 0,
        maxX: number = 0,
        maxY: number = 0,
        timeSinceStartMs: number = 0,
    ): PlaneBitmapData | undefined {
        const plane = this.getPlane(planeId) ?? this.getPlane(PlaneRasterizer.DEFAULT_TYPE);

        if (!(plane instanceof LandscapePlane)) return undefined;

        const texture = plane.render(canvas, width, height, scale, normal, useTexture, offsetX, offsetY, maxX, maxY, timeSinceStartMs);

        if (!texture) return undefined;

        if (plane.isStatic(scale)) return new PlaneBitmapData(texture, -1);

        return new PlaneBitmapData(texture, (Math.round(timeSinceStartMs / LandscapeRasterizer.UPDATE_INTERVAL) * LandscapeRasterizer.UPDATE_INTERVAL) + LandscapeRasterizer.UPDATE_INTERVAL);
    }

    public override getTextureIdentifier(scale: number, normal: IVector3D | undefined): string {
        if (normal) return `${scale}_${(normal.x < 0) ? 0 : 1}`;

        return super.getTextureIdentifier(scale, normal);
    }
}
