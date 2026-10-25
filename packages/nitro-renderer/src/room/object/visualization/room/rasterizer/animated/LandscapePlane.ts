import { IVector3D, Vector3d } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { Plane } from '../basic/Plane';

/**
 * One landscape type (`1.1`, `default`, ...): its visualizations by size, turned from world units
 * into pixels for the one picked. It is animated while that visualization has an animation layer.
 * Ports Flash's obfuscated `§_-a2s§`, the `Plane` of `LandscapeRasterizer`.
 */
export class LandscapePlane extends Plane {
    public static DEFAULT_COLOR: number = 0xFFFFFF;
    public static HORIZONTAL_ANGLE_DEFAULT: number = 45;
    public static VERTICAL_ANGLE_DEFAULT: number = 30;

    public override isStatic(size: number): boolean {
        const visualization = this.getPlaneVisualization(size);

        if (visualization) return !visualization.hasAnimationLayers;

        return super.isStatic(size);
    }

    /**
     * `width` / `height` are the plane's sides in world units times `scale`; the offsets and maxima
     * place it in the whole landscape, in world units. The canvas drawn on is returned and belongs to
     * the caller.
     */
    public render(
        canvas: RenderTexture | undefined,
        width: number,
        height: number,
        scale: number,
        normal: IVector3D,
        useTexture: boolean,
        offsetX: number,
        offsetY: number,
        maxX: number,
        maxY: number,
        timeSinceStartMs: number,
    ): RenderTexture | undefined {
        const visualization = this.getPlaneVisualization(scale);
        const geometry = visualization?.geometry;

        if (!visualization || !geometry) return undefined;

        const origin = geometry.getScreenPoint(new Vector3d(0, 0, 0));
        const up = geometry.getScreenPoint(new Vector3d(0, 0, 1));
        const side = geometry.getScreenPoint(new Vector3d(0, 1, 0));

        if (!origin || !up || !side) return undefined;

        const unitWidth = Math.abs(origin.x - side.x);
        const unitHeight = Math.abs(origin.y - up.y);

        width = Math.round((unitWidth * width) / geometry.scale);
        height = Math.round((unitHeight * height) / geometry.scale);

        const renderOffsetX = Math.trunc(offsetX * unitWidth);
        const renderOffsetY = Math.trunc(offsetY * unitHeight);
        const renderMaxX = Math.trunc(maxX * unitWidth);
        const renderMaxY = Math.trunc(maxY * unitHeight);

        return visualization.render(canvas, width, height, normal, useTexture, renderOffsetX, renderOffsetY, renderMaxX, renderMaxY, maxX, maxY, timeSinceStartMs);
    }
}
