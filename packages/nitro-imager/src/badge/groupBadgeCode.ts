/** Which table a layer's part comes from: the badge's base shape, or a symbol laid over it. */
export type BadgeLayerKind = 'base' | 'symbol';

/** One layer of a group badge, as its code names it. */
export interface BadgeLayer {
    kind: BadgeLayerKind;
    partId: number;
    colorId: number;
    /** The cell of the 3x3 grid the part is centred on, 0-8 left to right, top to bottom. */
    position: number;
}

/** A layer's token: a prefix, two digits of part, two of colour and one of position. */
export const BADGE_TOKEN_LENGTH = 6;

/** A symbol from 100 up is written `t` with its id less 100, so the id still fits two digits. */
const SYMBOL_ALT_OFFSET = 100;

/** One base and four symbols, what the editor makes. */
export const MAX_BADGE_LAYERS = 5;

const TOKEN = /^([bst])(\d\d)(\d\d)(\d)$/;

/**
 * The layers of a group badge code - the string the hotel stores for a group and the client
 * hands to the imager unread (`b05114s06114`): up to five tokens run together in layer order,
 * as Turbo's `GuildBadgeCodes.Build` writes them,
 *
 *     b + part(2) + colour(2) + position(1)    the base
 *     s + part(2) + colour(2) + position(1)    a symbol, parts 1-99
 *     t + (part - 100)(2) + colour(2) + position(1)    a symbol, parts 100-199
 *
 * A token that does not read is skipped rather than failing the badge: the code may have been
 * typed into the database by hand, and the rest of it still draws. So is a position off the grid.
 */
export const parseGroupBadgeCode = (code: string): BadgeLayer[] => {
    const layers: BadgeLayer[] = [];

    for (let offset = 0; (offset + BADGE_TOKEN_LENGTH) <= code.length; offset += BADGE_TOKEN_LENGTH) {
        if (layers.length === MAX_BADGE_LAYERS) break;

        const match = TOKEN.exec(code.slice(offset, offset + BADGE_TOKEN_LENGTH));

        if (!match) continue;

        const [ , prefix, part, color, position ] = match;
        const positionValue = Number(position);

        if (positionValue > 8) continue;

        layers.push({
            kind: (prefix === 'b') ? 'base' : 'symbol',
            partId: Number(part) + ((prefix === 't') ? SYMBOL_ALT_OFFSET : 0),
            colorId: Number(color),
            position: positionValue,
        });
    }

    return layers;
};
