/**
 * How a Flash window skin's entities become the layers the theme draws (`BackgroundLayerConfig`) -
 * the rules, shared by whatever builds a theme (Nitro Studio's import of a client release) and
 * typed by the components that draw it.
 *
 * A skin state is a `<template>` (regions of the sheet) and a `<layout>` (where each region sits at
 * the skin's own size, and how it follows a resize on each axis). `BitmapSkinRenderer.draw` walks the
 * layout's entities in order: `fixed` stays, `move` shifts by the size gained, `strech` / `tiled`
 * grow by it (a 1x1 region is a fill), `center` re-centres. A group of those entities becomes the
 * layer that draws it:
 *
 * - a grid of `fixed` / `strech` / `move` columns and rows over the whole skin is a nine-slice of the
 *   group composed at the skin's size, its insets the fixed and moving edges (`NineSliceLayer`);
 * - a grid whose middle tiles on one axis is a nine-slice that repeats its centre;
 * - one entity over the whole skin is a sprite of it (`SpriteLayer`, which fills its box);
 * - anything else - pieces that move, re-centre or tile on their own - is a `composite` of pieces,
 *   each placed as the renderer places it (`CompositeLayer`), a tiled one as its own `tile` layer.
 *
 * This holds only the rules: reading the skin and cutting or drawing its bitmaps is the builder's.
 * Each layer asks the builder for the bitmap it names (`SkinArtKey`) and takes back its texture key.
 */
import type { BackgroundLayerConfig } from '../layer/BackgroundLayer';
import type { CompositeLayerPieceProps } from '../layer/CompositeLayer';

/** A layer a group of skin pieces becomes - what the theme's components draw. */
export type SkinLayer = BackgroundLayerConfig;

/** The renderer's scale modes (`SkinLayoutEntity`); anything else - `stretch` included - is `fixed`. */
export type SkinScale = 'fixed' | 'move' | 'strech' | 'tiled' | 'center';

export interface SkinRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/** One entity of a skin state, as the renderer draws it. */
export interface SkinPiece {
    name: string;
    /** Where the layout puts it at the skin's own size. */
    at: SkinRect;
    /** Its region of the sheet. */
    from: SkinRect;
    h: SkinScale;
    v: SkinScale;
}

/** A skin state's size - every piece's extent - and every piece it draws. */
export interface SkinStateGeometry {
    width: number;
    height: number;
    pieces: readonly SkinPiece[];
}

/** A bitmap a layer names, for the builder to draw. */
export type SkinArt =
    /** The pieces drawn where the renderer puts them at the skin's own size. */
    | { kind: 'sheet'; pieces: readonly SkinPiece[] }
    /** The pieces drawn where the renderer puts them in a window of this size. */
    | { kind: 'sized'; pieces: readonly SkinPiece[]; width: number; height: number }
    /** One piece's region of the sheet, as it is. */
    | { kind: 'piece'; piece: SkinPiece };

/**
 * Draws `art` and returns the texture key it is drawn under. `part` is a piece's name where the
 * bitmap is that piece's own within the group (a composite's piece, a tile); the group's own
 * bitmap has none.
 */
export type SkinArtKey = (art: SkinArt, part?: string) => string;

export const isTiledSkinPiece = (piece: SkinPiece): boolean => piece.h === 'tiled' || piece.v === 'tiled';

/** Where the renderer draws a piece when the skin is at its own size - `center` in the middle of it. */
export const skinPieceNaturalRect = (piece: SkinPiece, width: number, height: number): SkinRect => ({
    x: piece.h === 'center' ? Math.floor((width / 2) - (piece.from.width / 2)) : piece.at.x,
    y: piece.v === 'center' ? Math.floor((height / 2) - (piece.from.height / 2)) : piece.at.y,
    // `strech` / `tiled` take the layout rect's size; every other mode copies the region's own pixels.
    width: (piece.h === 'strech' || piece.h === 'tiled') ? piece.at.width : piece.from.width,
    height: (piece.v === 'strech' || piece.v === 'tiled') ? piece.at.height : piece.from.height,
});

/**
 * The nine-slice insets of a group, when it is one: its columns are a `fixed` run, a `strech` one and
 * a `move` one (any may be missing), its rows likewise, and between them they cover the skin.
 *
 * The grid is the whole state's (`grid`), not the group's: a frame's untinted body starts under its
 * tinted title bar, and sliced on its own pieces alone the empty rows above it would be the stretched
 * middle - a band of nothing down the window.
 */
export const skinNineSlice = (pieces: readonly SkinPiece[], width: number, height: number, grid: readonly SkinPiece[] = pieces): [ number, number, number, number ] | undefined => {
    if (!pieces.length || pieces.some(piece => piece.h === 'center' || piece.v === 'center' || piece.h === 'tiled' || piece.v === 'tiled')) return undefined;

    const edge = (axis: 'h' | 'v', mode: SkinScale): [ number, number ] | undefined => {
        const spans = grid.filter(piece => piece[axis] === mode).map(piece => (axis === 'h' ? [ piece.at.x, piece.at.x + piece.at.width ] : [ piece.at.y, piece.at.y + piece.at.height ]));

        if (!spans.length) return undefined;

        const start = Math.min(...spans.map(span => span[0]));
        const end = Math.max(...spans.map(span => span[1]));

        return [ start, end ];
    };

    const [ left, right ] = [ edge('h', 'fixed'), edge('h', 'move') ];
    const [ top, bottom ] = [ edge('v', 'fixed'), edge('v', 'move') ];
    const leftWidth = left ? left[1] : 0;
    const rightWidth = right ? width - right[0] : 0;
    const topHeight = top ? top[1] : 0;
    const bottomHeight = bottom ? height - bottom[0] : 0;

    // Every piece has to sit in the cell its modes name: fixed columns left of the stretch, moving ones right of it.
    const fits = pieces.every((piece) => {
        const inColumn = piece.h === 'fixed' ? (piece.at.x + piece.at.width <= leftWidth) : piece.h === 'move' ? (piece.at.x >= width - rightWidth) : (piece.at.x >= leftWidth && piece.at.x + piece.at.width <= width - rightWidth);
        const inRow = piece.v === 'fixed' ? (piece.at.y + piece.at.height <= topHeight) : piece.v === 'move' ? (piece.at.y >= height - bottomHeight) : (piece.at.y >= topHeight && piece.at.y + piece.at.height <= height - bottomHeight);

        return inColumn && inRow;
    });

    return fits ? [ leftWidth, topHeight, rightWidth, bottomHeight ] : undefined;
};

/** The pieces that make a state's grid: every one but those that tile or re-centre on their own. */
export const skinGrid = (state: SkinStateGeometry): SkinPiece[] => state.pieces.filter(piece => piece.h !== 'center' && piece.v !== 'center' && piece.h !== 'tiled' && piece.v !== 'tiled');

/** The piece lies over the whole of its state's skin. */
const coversSkin = (piece: SkinPiece, state: SkinStateGeometry): boolean => piece.at.x === 0 && piece.at.y === 0 && piece.at.width === state.width && piece.at.height === state.height;

/**
 * A composite piece placed as the renderer places the entity (`CompositeLayerPieceProps`). A `tiled`
 * axis grows with the window as `strech` does; `CompositeLayer` stretches the bitmap over it rather
 * than repeating it, so a group with a tile is drawn as its own `tile` layers where it can be.
 */
const compositePiece = (piece: SkinPiece, textureKey: string, width: number, height: number): CompositeLayerPieceProps => {
    const field: CompositeLayerPieceProps = { textureKey };

    if (piece.h === 'move') {
        field.right = width - (piece.at.x + piece.at.width);
        field.width = piece.from.width;
    } else if (piece.h === 'strech' || piece.h === 'tiled') {
        field.left = piece.at.x;
        field.right = width - (piece.at.x + piece.at.width);
    } else if (piece.h === 'center') {
        field.width = piece.from.width;
        field.alignSelf = 'center';
    } else {
        field.left = piece.at.x;
        field.width = piece.from.width;
    }

    if (piece.v === 'move') {
        field.bottom = height - (piece.at.y + piece.at.height);
        field.height = piece.from.height;
    } else if (piece.v === 'strech' || piece.v === 'tiled') {
        field.top = piece.at.y;
        field.bottom = height - (piece.at.y + piece.at.height);
    } else if (piece.v === 'center') {
        field.height = piece.from.height;
        field.alignSelf = 'center';
    } else {
        field.top = piece.at.y;
        field.height = piece.from.height;
    }

    return field;
};

/**
 * A grid whose middle tiles on one axis (a scrollbar lift: `top`, `grd` tiled down, `btm`): a nine-slice
 * repeating its centre (`repeat`), its sheet drawn with the tile once at its own size so the centre is
 * exactly the bitmap that repeats. An axis every piece keeps `fixed` is not sliced - the skin is that
 * size across (`isFixedWidth`), and so is the window it draws in.
 */
const repeatingNineSlice = (pieces: readonly SkinPiece[], state: SkinStateGeometry, art: SkinArtKey): BackgroundLayerConfig | undefined => {
    const tiled = pieces.filter(isTiledSkinPiece);
    const axis = tiled.every(piece => piece.v === 'tiled' && piece.h !== 'tiled') ? 'y' : tiled.every(piece => piece.h === 'tiled' && piece.v !== 'tiled') ? 'x' : undefined;

    if (!tiled.length || !axis || pieces.some(piece => piece.h === 'center' || piece.v === 'center')) return undefined;

    // One tile size, or the centre is no single bitmap.
    const sizes = new Set(tiled.map(piece => (axis === 'y' ? piece.from.height : piece.from.width)));

    if (sizes.size !== 1) return undefined;

    const asGrid = pieces.map(piece => ({ ...piece, h: piece.h === 'tiled' ? 'strech' : piece.h, v: piece.v === 'tiled' ? 'strech' : piece.v }));
    const insets = skinNineSlice(asGrid, state.width, state.height);

    if (!insets) return undefined;

    const [ left, top, right, bottom ] = insets;
    const fixedAcross = (key: 'h' | 'v') => pieces.every(piece => piece[key] === 'fixed');
    const [ leftWidth, rightWidth ] = fixedAcross('h') ? [ 0, 0 ] : [ left, right ];
    const [ topHeight, bottomHeight ] = fixedAcross('v') ? [ 0, 0 ] : [ top, bottom ];

    // The tiles must be the whole centre on their axis, or the repeat would reach pieces they don't.
    const centred = tiled.every(piece => (axis === 'y'
        ? piece.at.y === top && piece.at.y + piece.at.height === state.height - bottom
        : piece.at.x === left && piece.at.x + piece.at.width === state.width - right));

    if (!centred || leftWidth + rightWidth >= state.width || topHeight + bottomHeight >= state.height) return undefined;

    const tile = [ ...sizes ][0];
    const width = axis === 'x' ? left + tile + right : state.width;
    const height = axis === 'y' ? top + tile + bottom : state.height;

    return { kind: 'nineSlice', textureKey: art({ kind: 'sized', pieces, width, height }), leftWidth, topHeight, rightWidth, bottomHeight, repeat: axis };
};

/**
 * The layers a group of a state's pieces is drawn as: one sprite, one nine-slice, or - a group that is
 * neither (a face whose `center` curves re-centre on their own) - a composite of every piece, each
 * placed as the renderer places it; and a `tile` layer for each piece that tiles on its own. A
 * nine-slice never goes into a composite: a composite draws a piece as one sprite, and the sheet would
 * be stretched whole.
 *
 * `artSized` is a component whose box is its art (a bubble's pointer, a button's state face), not one
 * its layout sizes.
 */
export const skinGroupLayers = (pieces: readonly SkinPiece[], state: SkinStateGeometry, artSized: boolean, art: SkinArtKey): BackgroundLayerConfig[] => {
    const { width, height } = state;
    const layers: BackgroundLayerConfig[] = [];
    const tiled = pieces.filter(isTiledSkinPiece);
    const rest = pieces.filter(piece => !tiled.includes(piece));
    const repeating = repeatingNineSlice(pieces, state, art);

    if (repeating) return [ repeating ];

    // `SkinLayout.isFixedWidth` / `isFixedHeight`: every entity fixed on both axes is a bitmap of one
    // size, drawn at it, top left, whatever the window's size. Where the component takes its size
    // from its art (a header's close button is placed with no size of its own) that is a sprite; where
    // its box is sized by its layout (header 3's 6px block in a bar the frame's width) a sprite would
    // stretch over the box, so it is one piece at its own size.
    const fixedSize = rest.length > 0 && rest.every(piece => piece.h === 'fixed' && piece.v === 'fixed');

    if (fixedSize) {
        const textureKey = art({ kind: 'sheet', pieces: rest });

        layers.push(artSized
            ? { kind: 'sprite', textureKey }
            : { kind: 'composite', pieces: [ { textureKey, left: 0, top: 0, width, height } ] });
    } else if (artSized && rest.length === 1 && !tiled.length && ((state.pieces.length === 1) || coversSkin(rest[0], state))) {
        // One piece in a component sized by its art (a bubble's pointer, `move` / `center` in its
        // skin): the box is the piece, so however the skin places it, it is the bitmap at its size.
        // Not one piece of several that does not cover the skin, which the box is not: a sprite fills
        // the box, and an illumina multi middle button's lone untinted piece - its 1px
        // `button_etch_center` along the bottom, `strech` / `move` - covered the whole button and hid
        // its face. Such a piece is placed as the rest are, below.
        layers.push({ kind: 'sprite', textureKey: art({ kind: 'piece', piece: rest[0] }) });
    } else if (rest.length === 1 && rest[0].h === 'strech' && rest[0].v === 'strech' && coversSkin(rest[0], state)) {
        layers.push({ kind: 'sprite', textureKey: art({ kind: 'piece', piece: rest[0] }) });
    } else if (rest.length) {
        const grid = skinNineSlice(rest, width, height, skinGrid(state));
        // A grid whose edges take the whole skin on an axis has no centre to stretch there (a
        // scrollbar track: 17 fixed across, stretched down) - a nine-slice with an empty centre
        // column, which the renderer draws as nothing like Flash does. Its pieces place exactly.
        const insets = grid && grid[0] + grid[2] < width && grid[1] + grid[3] < height ? grid : undefined;

        if (insets) {
            layers.push({ kind: 'nineSlice', textureKey: art({ kind: 'sheet', pieces: rest }), leftWidth: insets[0], topHeight: insets[1], rightWidth: insets[2], bottomHeight: insets[3] });
        } else {
            layers.push({ kind: 'composite', pieces: rest.map(piece => compositePiece(piece, art({ kind: 'piece', piece }, piece.name), width, height)) });
        }
    }

    for (const piece of tiled) {
        const at = skinPieceNaturalRect(piece, width, height);
        const textureKey = art({ kind: 'piece', piece }, piece.name);

        // A tile over the whole skin (a header's `header_center` and `header_shine`) fills the box it
        // is drawn in: given insets and no size, a tiling leaf lays out at its texture's own size -
        // the header's strip shrank to its 6px tile.
        if (at.x === 0 && at.y === 0 && at.width === width && at.height === height) {
            layers.push({ kind: 'tile', textureKey });

            continue;
        }

        layers.push({
            kind: 'tile',
            textureKey,
            ...(piece.h === 'tiled' ? { left: at.x, right: width - (at.x + at.width) } : { left: at.x, width: at.width }),
            ...(piece.v === 'tiled' ? { top: at.y, bottom: height - (at.y + at.height) } : { top: at.y }),
        });
    }

    return layers;
};

/**
 * The one layer a slot holds for a group of pieces: the group's own layer where it is one (a sprite, a
 * nine-slice, a full-bleed tile); otherwise a composite of every piece, each placed by its own scale
 * mode as the renderer draws it - never a nine-slice stretched whole into a composite.
 */
export const skinSlotLayer = (pieces: readonly SkinPiece[], state: SkinStateGeometry, artSized: boolean, art: SkinArtKey): BackgroundLayerConfig | undefined => {
    const layers = skinGroupLayers(pieces, state, artSized, art);

    if (layers.length <= 1) return layers[0];

    return { kind: 'composite', pieces: pieces.map(piece => compositePiece(piece, art({ kind: 'piece', piece }, piece.name), state.width, state.height)) };
};
