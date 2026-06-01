import type { PointData } from 'pixi.js';
import type { Texture } from 'pixi.js';
import { ColorMatrixFilter, Container, Sprite } from 'pixi.js';

export interface MaskEntry {
    texture: Texture;
    position?: PointData;
    scale?: PointData;
    rotation?: number;
    whiteIsTransparent?: boolean;
}

// Column-major 4x5 color matrix. Converts white to transparent via luminance:
// New A = A - 0.299*R - 0.587*G - 0.114*B
// White (1,1,1,1) → A=0 (transparent), Black (0,0,0,1) → A=1 (opaque)
let _whiteToAlphaFilter: ColorMatrixFilter | undefined;

function getWhiteToAlphaFilter(): ColorMatrixFilter {
    if (!_whiteToAlphaFilter) {
        _whiteToAlphaFilter = new ColorMatrixFilter();
        _whiteToAlphaFilter.matrix = [1, 0, 0, -0.299, 0, 1, 0, -0.587, 0, 0, 1, -0.114, 0, 0, 0, 1, 0, 0, 0, 0];
    }
    return _whiteToAlphaFilter;
}

export const MergeMasks = (
    masks: MaskEntry[],
): Container => {
    const container = new Container();

    for (const entry of masks) {
        const sprite = new Sprite(entry.texture);

        sprite.blendMode = 'erase';

        if (entry.whiteIsTransparent) sprite.filters = [getWhiteToAlphaFilter()];

        if (entry.position) sprite.position.set(entry.position.x, entry.position.y);

        if (entry.scale) sprite.scale.set(entry.scale.x, entry.scale.y);

        if (entry.rotation !== undefined) sprite.rotation = entry.rotation;

        container.addChild(sprite);
    }

    return container;
};
