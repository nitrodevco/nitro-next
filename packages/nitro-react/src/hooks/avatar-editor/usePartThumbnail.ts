import { AvatarGenderType, AvatarScaleType, AvatarSetType, IAvatarImage, IFigurePartSet, IGraphicAsset, IPartColor } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager, TexturePool, TextureUtils } from '@nitrodevco/nitro-renderer';
import { Rectangle, RenderTexture, Sprite, Texture } from 'pixi.js';
import { useEffect, useState } from 'react';

import { useAvatarEditorSelectors } from '#base/context';

/**
 * Clothing-part grid thumbnails straight from the avatar asset library: each part set is a
 * stack of its figure-part sprites (the render manager's own textures, shared with the avatar
 * renderer) placed by their asset offsets and tinted per colour layer at draw time. Nothing is
 * rasterised or encoded - no base64, no extra textures - so a thumbnail costs a few sprite
 * descriptors, and a colour change is just a different `tint` on the same textures.
 *
 * Faces (`hd`) are the exception: the skin tone is a real palette swap rather than a tint, so
 * each face is rendered through the avatar imager as a head-only avatar (`hd-<id>-<colours>`,
 * the old `getFigureStringWithFace`), trimmed to its opaque pixels and kept as one small render
 * texture. The imager instance itself is disposed immediately - only the trimmed texture stays.
 */

const HEAD_SET_TYPE = 'hd';

const THUMB_DIRECTIONS = [ 2, 6, 0, 4, 3, 1 ];
const BUILD_RETRIES = 10;
const BUILD_RETRY_DELAY_MS = 100;

/** `AvatarEditorGridPartItem.DRAW_ORDER` (AvatarFigurePartType values, back to front). */
const DRAW_ORDER = [
    'li', 'lh', 'ls', 'lc', 'bd', 'sh', 'lg', 'ch', 'ca', 'cc', 'cp', 'wa',
    'rh', 'rs', 'rc', 'hd', 'fc', 'ey', 'hr', 'hrb', 'fa', 'ea', 'ha', 'he', 'ri',
];

/** One sprite of a thumbnail: a shared library texture, its position within the thumbnail, and which colour layer tints it (0 = none). */
export interface PartThumbnailLayer {
    texture: Texture;
    x: number;
    y: number;
    colorLayerIndex: number;
}

/** A part's thumbnail: its layers, positioned so the composite's top-left is (0, 0), and the composite size. */
export interface PartThumbnail {
    layers: PartThumbnailLayer[];
    width: number;
    height: number;
}

const thumbnails = new Map<string, PartThumbnail>();
const pending = new Map<string, Promise<PartThumbnail | undefined>>();

const partKey = (partSet: IFigurePartSet): string => `${partSet.type}-${partSet.id}`;

const findAsset = (type: string, id: number): IGraphicAsset | undefined => {
    const renderManager = GetAvatarRenderManager();

    for (const direction of THUMB_DIRECTIONS) {
        const asset = renderManager.getAssetByName(`h_std_${type}_${id}_${direction}_0`);

        if (asset?.texture) return asset;
    }

    return undefined;
};

/** Builds the thumbnail from assets already in the library, or returns undefined if they aren't there yet. */
const buildThumbnail = (partSet: IFigurePartSet): PartThumbnail | undefined => {
    const parts = [ ...partSet.parts ].sort((a, b) => {
        const indexA = DRAW_ORDER.indexOf(a.type);
        const indexB = DRAW_ORDER.indexOf(b.type);

        return indexA !== indexB ? indexA - indexB : a.index - b.index;
    });
    const layers: PartThumbnailLayer[] = [];

    for (const part of parts) {
        const asset = findAsset(part.type, part.id);

        if (!asset?.texture) continue;

        layers.push({ texture: asset.texture, x: asset.offsetX, y: asset.offsetY, colorLayerIndex: part.colorLayerIndex });
    }

    if (!layers.length) return undefined;

    // Normalise so the composite's bounding box starts at (0, 0) - the cell centres it.
    const minX = Math.min(...layers.map(layer => layer.x));
    const minY = Math.min(...layers.map(layer => layer.y));
    const maxX = Math.max(...layers.map(layer => layer.x + layer.texture.width));
    const maxY = Math.max(...layers.map(layer => layer.y + layer.texture.height));

    return {
        layers: layers.map(layer => ({ ...layer, x: layer.x - minX, y: layer.y - minY })),
        width: maxX - minX,
        height: maxY - minY,
    };
};

interface HeadThumbnail {
    thumbnail: PartThumbnail;
    texture: RenderTexture;
}

const headThumbnails = new Map<string, HeadThumbnail>();
const headPending = new Map<string, Promise<PartThumbnail | undefined>>();

/** The head-only figure a face cell renders: this face id with the figure's current skin colours. */
const headFigureOf = (partId: number, colors: (IPartColor | undefined)[]): string => [ HEAD_SET_TYPE, partId, ...colors.flatMap(color => (color ? [ color.id ] : [])) ].join('-');

/** Bounding box of the non-transparent pixels, or undefined for a fully transparent texture. */
const opaqueBounds = (texture: Texture): Rectangle | undefined => {
    const { pixels, width, height } = TextureUtils.getPixels(texture);

    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (!pixels[(((y * width) + x) * 4) + 3]) continue;

            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    }

    return maxX < 0 ? undefined : new Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1);
};

/** Copies the imager's head render into its own trimmed texture; the imager (and its part cache) is released before returning. */
const captureHead = (avatarImage: IAvatarImage): HeadThumbnail | undefined => {
    try {
        if (avatarImage.isPlaceholder()) return undefined;

        const full = avatarImage.getImage(AvatarSetType.Head, false);
        const bounds = full && opaqueBounds(full);

        if (!full || !bounds) return undefined;

        const texture = TexturePool.createRenderTexture(bounds.width, bounds.height);

        if (!texture) return undefined;

        const sprite = new Sprite(new Texture({ source: full.source, frame: bounds }));

        TextureUtils.getRenderer().render({ target: texture, container: sprite, clear: true });
        sprite.destroy({ texture: true, textureSource: false });

        return {
            texture,
            thumbnail: { layers: [ { texture, x: 0, y: 0, colorLayerIndex: 0 } ], width: bounds.width, height: bounds.height },
        };
    } finally {
        avatarImage.dispose();
    }
};

const getHeadThumbnail = (figure: string, gender: AvatarGenderType): PartThumbnail | Promise<PartThumbnail | undefined> => {
    const cached = headThumbnails.get(figure);

    if (cached) return cached.thumbnail;

    const inFlight = headPending.get(figure);

    if (inFlight) return inFlight;

    const renderManager = GetAvatarRenderManager();

    // Everything loaded: the imager hands back a real image straight away (a placeholder
    // otherwise, which `captureHead` rejects - it kicks off the downloads as a side effect).
    const immediate = renderManager.createAvatarImage(figure, AvatarScaleType.Large, gender, { resetFigure: () => {} });
    const rendered = immediate && captureHead(immediate);

    if (rendered) {
        headThumbnails.set(figure, rendered);

        return rendered.thumbnail;
    }

    // The imager validates the figure (adding the gender's mandatory parts), so let it download
    // what *that* figure needs rather than guessing from the face alone.
    const promise = renderManager.createAvatarImageAsync(figure, AvatarScaleType.Large, gender)
        .then((avatarImage) => {
            const built = avatarImage && captureHead(avatarImage);

            if (built) headThumbnails.set(figure, built);

            return built?.thumbnail;
        })
        .catch(() => undefined)
        .finally(() => headPending.delete(figure));

    headPending.set(figure, promise);

    return promise;
};

/** Drops every face texture not in `keep` - faces are per skin colour, so a colour change (or leaving the tab) frees the old set. */
const pruneHeadThumbnails = (keep: Set<string>) => {
    for (const [ figure, entry ] of headThumbnails) {
        if (keep.has(figure)) continue;

        TexturePool.releaseTexture(entry.texture);
        headThumbnails.delete(figure);
    }
};

const getThumbnail = (partSet: IFigurePartSet): PartThumbnail | Promise<PartThumbnail | undefined> => {
    const key = partKey(partSet);
    const cached = thumbnails.get(key);

    if (cached) return cached;

    const inFlight = pending.get(key);

    if (inFlight) return inFlight;

    const renderManager = GetAvatarRenderManager();
    const figureContainer = renderManager.createFigureContainer(key);

    // Assets already loaded: resolve synchronously so the first render already has them.
    if (renderManager.isFigureContainerReady(figureContainer)) {
        const built = buildThumbnail(partSet);

        if (built) {
            thumbnails.set(key, built);

            return built;
        }
    }

    // The listener form rather than `downloadAvatarFigureAsync`: it queues the request until the
    // download manager is ready, and fires once *every* library the part needs has loaded -
    // including ones another caller (the preview avatar, a neighbouring cell) already started.
    const downloaded = new Promise<void>(resolve => renderManager.downloadAvatarFigure(figureContainer, { resetFigure: () => resolve() }));

    const promise = downloaded
        .then(async () => {
            // Assets register a tick after the library reports loaded in some paths; give it a few tries.
            for (let attempt = 0; attempt < BUILD_RETRIES; attempt++) {
                const built = buildThumbnail(partSet);

                if (built) {
                    thumbnails.set(key, built);

                    return built;
                }

                await new Promise(next => setTimeout(next, BUILD_RETRY_DELAY_MS));
            }

            return undefined;
        })
        .catch(() => undefined)
        .finally(() => pending.delete(key));

    pending.set(key, promise);

    return promise;
};

/** What a grid cell needs to ask for its thumbnail: its part set, or (faces) its id and the figure's skin colours. */
export interface PartThumbnailRequest {
    id: number;
    partSet?: IFigurePartSet;
    partColors: (IPartColor | undefined)[];
}

/**
 * Thumbnails for a whole part grid, keyed by part id. Parts whose library is already loaded
 * are present on the first render; the rest fill in as their libraries download (show a
 * placeholder meanwhile). Colours aren't part of a clothing thumbnail - the grid tints at draw
 * time - but they are part of a face's (`hd`), which is re-rendered when the skin tone changes.
 */
export const usePartThumbnails = (parts: PartThumbnailRequest[], setType: string): Record<number, PartThumbnail | undefined> => {
    const { gender } = useAvatarEditorSelectors();
    const isHead = setType === HEAD_SET_TYPE;

    const request = (part: PartThumbnailRequest): PartThumbnail | Promise<PartThumbnail | undefined> | undefined => {
        if (isHead) return part.id >= 0 ? getHeadThumbnail(headFigureOf(part.id, part.partColors), gender) : undefined;

        return part.partSet ? getThumbnail(part.partSet) : undefined;
    };

    const seed = () => {
        const result: Record<number, PartThumbnail | undefined> = {};

        for (const part of parts) {
            const thumbnail = request(part);

            if (thumbnail && !(thumbnail instanceof Promise)) result[part.id] = thumbnail;
        }

        return result;
    };

    const [ ready, setReady ] = useState<Record<number, PartThumbnail | undefined>>(seed);

    useEffect(() => {
        let cancelled = false;

        pruneHeadThumbnails(new Set(isHead ? parts.filter(part => part.id >= 0).map(part => headFigureOf(part.id, part.partColors)) : []));

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setReady(seed());

        for (const part of parts) {
            const thumbnail = request(part);

            if (!(thumbnail instanceof Promise)) continue;

            void thumbnail.then((built) => {
                if (!cancelled && built) setReady(current => (current[part.id] === built ? current : { ...current, [part.id]: built }));
            });
        }

        return () => {
            cancelled = true;
        };
    }, [ parts, setType, gender ]);

    // Face textures are only useful while an editor is open.
    useEffect(() => () => pruneHeadThumbnails(new Set()), []);

    return ready;
};
