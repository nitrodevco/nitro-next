import { IGuildBadgeSettings, IGuildEditorData } from '@nitrodevco/nitro-packets';

/**
 * The badge editor's per-layer state - Flash's `BadgeLayerOptions`, as a plain record. A badge is
 * five of them: layer 0 is the base shape, layers 1-4 the symbols laid over it. `partIndex` and
 * `colorIndex` point into `GuildEditorData` (`baseParts` for layer 0, `layerParts` otherwise, and
 * `badgeColors` for the tint); -1 is "nothing picked", which is how an empty layer is sent.
 */
export interface BadgeLayerOptions {
    layerIndex: number;
    partIndex: number;
    colorIndex: number;
    gridX: number;
    gridY: number;
}

/** `BadgeEditorCtrl._layers` - the editor always has these five. */
export const BADGE_LAYER_COUNT = 5;

/** `BadgeLayerCtrl.BASE_LAYER_INDEX`: the one layer whose part comes from `baseParts` and which has no position. */
export const BADGE_BASE_LAYER_INDEX = 0;

/** `BadgeEditorPartItem.IMAGE_WIDTH` / `IMAGE_HEIGHT` - the badge and every part composite are this big. */
export const BADGE_IMAGE_WIDTH = 39;
export const BADGE_IMAGE_HEIGHT = 39;

/** `BadgeEditorPartItem.CELL_WIDTH` / `CELL_HEIGHT` - one cell of the 3x3 position grid, in badge pixels. */
export const BADGE_CELL_WIDTH = 13;
export const BADGE_CELL_HEIGHT = 13;

/** `BadgeLayerCtrl.updatePositionPicker` / `onPositionGridClick`: one cell of the picker's own grid art. */
export const BADGE_POSITION_CELL = 14;

export const createBadgeLayerOptions = (layerIndex: number): BadgeLayerOptions => ({
    layerIndex,
    partIndex: -1,
    colorIndex: -1,
    gridX: -1,
    gridY: -1,
});

/** `BadgeLayerOptions.setGrid`. */
export const badgeLayerFromPosition = (options: BadgeLayerOptions, position: number): BadgeLayerOptions => ({
    ...options,
    gridX: Math.floor(position % 3),
    gridY: Math.floor(position / 3),
});

/** `BadgeLayerOptions.position`. */
export const badgeLayerPosition = (options: BadgeLayerOptions): number => (options.gridY * 3) + options.gridX;

/** `BadgeEditorCtrl.getLayerPartId`: the server's part id for a layer, or -1 while it has none. */
export const badgeLayerPartId = (options: BadgeLayerOptions, editorData: IGuildEditorData | undefined): number => {
    if (!editorData || (options.partIndex < 0)) return -1;

    const parts = (options.layerIndex === BADGE_BASE_LAYER_INDEX) ? editorData.baseParts : editorData.layerParts;

    return (options.partIndex >= parts.length) ? -1 : parts[options.partIndex].id;
};

/** `BadgeEditorCtrl.getLayerColorId`. */
export const badgeLayerColorId = (options: BadgeLayerOptions, editorData: IGuildEditorData | undefined): number => {
    if (!editorData || (options.colorIndex < 0) || (options.colorIndex >= editorData.badgeColors.length)) return -1;

    return editorData.badgeColors[options.colorIndex].id;
};

/**
 * `BadgeEditorCtrl.getBadgeSettings`: the flat `partId, colorId, position` triples the create and
 * update composers send. A layer with no part, or whose colour is not one the editor offers, is
 * left out entirely.
 */
export const badgeSettingsFromLayers = (layers: BadgeLayerOptions[], editorData: IGuildEditorData | undefined): number[] => {
    const settings: number[] = [];

    for (const layer of layers) {
        const partId = badgeLayerPartId(layer, editorData);

        if (partId < 0) continue;

        const colorId = badgeLayerColorId(layer, editorData);

        if (colorId < 0) continue;

        settings.push(partId, colorId, badgeLayerPosition(layer));
    }

    return settings;
};

/**
 * `BadgeEditorCtrl.createLayerOption`: one layer read back out of the badge the server sent. A
 * layer the badge does not reach keeps its empty options with `colorIndex` 0, which is what Flash
 * leaves them at.
 */
export const badgeLayersFromSettings = (badgeSettings: IGuildBadgeSettings[], editorData: IGuildEditorData | undefined): BadgeLayerOptions[] =>
    Array.from({ length: BADGE_LAYER_COUNT }, (unused, layerIndex) => {
        const setting = badgeSettings[layerIndex];
        const empty: BadgeLayerOptions = { ...createBadgeLayerOptions(layerIndex), colorIndex: 0 };

        if (!setting || !editorData) return empty;

        const parts = (layerIndex === BADGE_BASE_LAYER_INDEX) ? editorData.baseParts : editorData.layerParts;
        const colorIndex = editorData.badgeColors.findIndex(color => color.id === setting.colorId);
        const partIndex = parts.findIndex(part => part.id === setting.partId);

        return {
            ...badgeLayerFromPosition(empty, setting.position),
            colorIndex: (colorIndex < 0) ? 0 : colorIndex,
            partIndex: (partIndex < 0) ? -1 : partIndex,
        };
    });

/**
 * `BadgeEditorCtrl.primaryColorIndex`: the colour of the last layer that actually draws, which is
 * what a new group's primary guild colour is matched against.
 */
export const badgePrimaryColorIndex = (layers: BadgeLayerOptions[], editorData: IGuildEditorData | undefined): number => {
    let index = 0;

    for (const layer of layers) {
        if ((badgeLayerPartId(layer, editorData) < 0) || (badgeLayerColorId(layer, editorData) < 0)) continue;

        index = layer.colorIndex;
    }

    return index;
};

/** `BadgeEditorCtrl.secondaryColorIndex`: the base layer's colour. */
export const badgeSecondaryColorIndex = (layers: BadgeLayerOptions[]): number => layers[BADGE_BASE_LAYER_INDEX]?.colorIndex ?? 0;

/**
 * `BadgeEditorPartItem.getPosition`: where a part's bitmap sits in the 39x39 badge for a layer's
 * grid cell - centred on the cell, then pushed back inside the badge.
 */
export const badgePartOffset = (options: BadgeLayerOptions, partWidth: number, partHeight: number): { x: number; y: number } => {
    let x = (BADGE_CELL_WIDTH * options.gridX) + (BADGE_CELL_WIDTH / 2) - (partWidth / 2);
    let y = (BADGE_CELL_HEIGHT * options.gridY) + (BADGE_CELL_HEIGHT / 2) - (partHeight / 2);

    if (x < 0) x = 0;
    if ((x + partWidth) > BADGE_IMAGE_WIDTH) x = BADGE_IMAGE_WIDTH - partWidth;
    if (y < 0) y = 0;
    if ((y + partHeight) > BADGE_IMAGE_HEIGHT) y = BADGE_IMAGE_HEIGHT - partHeight;

    return { x: Math.floor(x), y: Math.floor(y) };
};

/**
 * `BadgeEditorPartItem`'s file names: the part's bitmap and its mask, under
 * `image.library.badgepart.url`. A part with no mask file has none.
 */
export const badgePartImageUrls = (baseUrl: string, fileName: string, maskFileName: string): { image: string; mask: string | undefined } => {
    const strip = (name: string): string => name.replace('.gif', '').replace('.png', '');
    const mask = strip(maskFileName);

    return {
        image: `${baseUrl}badgepart_${strip(fileName)}.png`,
        mask: mask.length ? `${baseUrl}badgepart_${mask}.png` : undefined,
    };
};
