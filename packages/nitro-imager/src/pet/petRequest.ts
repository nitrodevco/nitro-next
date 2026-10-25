import { FrameQuery, readFlag, readFrameQuery, readInteger } from '../http/readQuery';
import { RequestError } from '../http/RequestError';

/** A part laid over the pet (a horse's saddle or mane, a plant's leaves): `PetFigureData`'s custom part. */
export interface PetRequestPart {
    layerId: number;
    partId: number;
    paletteId: number;
}

/** Everything a pet image is drawn from, read and checked; two equal requests draw the same image. */
export interface PetRenderRequest extends FrameQuery {
    /** The pet's type: its index in the hotel's pet types (`renderer.petTypes`), or its name there. */
    type: number | string;
    paletteId: number;
    /** The colour the palette is tinted with, `0xffffff` for none. */
    color: number;
    parts: PetRequestPart[];
    headDirection: number;
    headOnly: boolean;
    /** Empty: the pet's own default posture. Checked against the pet's postures when it is drawn. */
    posture: string;
    /** Empty: none. Checked against the pet's gestures when it is drawn. */
    gesture: string;
}

/** The figure string the hotel stores for a pet and the client reads (`PetFigureData`): `type palette colour [count (layer part palette)...]`. */
const PET_FIGURE = /^\d{1,3} \d{1,4} [0-9a-f]{1,6}( \d{1,2}( -?\d{1,5})*)?$/i;

/** A pet type's name, as `renderer.petTypes` lists it, or a posture or gesture name, as a pet's visualization data names it. */
const NAME = /^[a-z][a-z0-9_]{0,31}$/;

export const MAX_PET_PALETTE = 9999;
export const MAX_PET_PARTS = 8;

/**
 * A pet image request from its query:
 *
 * - `figure`: the pet's figure string, as the hotel stores it - `type palette colour`, then the
 *   number of custom parts and each one's `layer part palette` (`15 2 ffffff 2 2 -1 0 3 -1 0`), with
 *   spaces (`+` or `%20` in a url); or else
 * - `type` (an index or name of `renderer.petTypes`: `0` or `dog`), `palette` and `color` (hex)
 * - `head_direction` 0-7 and `headonly=1`, besides `readFrameQuery`'s size, direction and frames
 * - `posture` (`std`, `sit`, `lay` ...) and `gesture` (`sml`, `agr` ...), each one the pet has
 *
 * A value that is not one of these is an error, not a guess.
 */
export const parsePetRequest = (query: Record<string, string | undefined>): PetRenderRequest => {
    const figure = (query.figure ?? '').trim().replace(/\s+/g, ' ');

    let type: number | string;
    let paletteId: number;
    let color: number;
    let parts: PetRequestPart[] = [];

    if (figure) {
        if (!PET_FIGURE.test(figure)) throw new RequestError('figure is a pet figure string: type palette colour [parts]');

        const values = figure.split(' ');

        type = Number(values[0]);
        paletteId = Number(values[1]);
        color = parseInt(values[2], 16);
        parts = readParts(values.slice(3));
    } else {
        const typeValue = (query.type ?? '').trim().toLowerCase();

        if (!typeValue) throw new RequestError('a pet is figure=<figure string>, or type=<type> with palette and color');

        if (/^\d+$/.test(typeValue)) type = Number(typeValue);
        else if (NAME.test(typeValue)) type = typeValue;
        else throw new RequestError('type is a pet type\'s number or name');

        paletteId = readInteger(query.palette, 'palette', 0, MAX_PET_PALETTE, 0);
        color = readColor(query.color);
    }

    const frames = readFrameQuery(query);

    return {
        ...frames,
        type,
        paletteId,
        color,
        parts,
        headDirection: readInteger(query.head_direction, 'head_direction', 0, 7, frames.direction),
        headOnly: readFlag(query.headonly),
        posture: readName(query.posture, 'posture'),
        gesture: readName(query.gesture, 'gesture'),
    };
};

/** The request as one string, in a fixed order: the cache key. */
export const petRequestKey = (request: PetRenderRequest): string => JSON.stringify([
    request.type, request.paletteId, request.color, request.parts, request.size, request.direction, request.headDirection,
    request.headOnly, request.posture, request.gesture, request.frame, request.animate, request.format,
]);

/** `count (layer part palette)...`, as `PetFigureData.getCustomData` reads it: the count must match what follows. */
const readParts = (values: string[]): PetRequestPart[] => {
    if (!values.length) return [];

    const count = Number(values[0]);
    const numbers = values.slice(1).map(Number);

    if ((count > MAX_PET_PARTS) || (numbers.length !== count * 3)) throw new RequestError(`figure names ${count} parts, each a layer, part and palette`);

    const parts: PetRequestPart[] = [];

    for (let i = 0; i < numbers.length; i += 3) parts.push({ layerId: numbers[i], partId: numbers[i + 1], paletteId: numbers[i + 2] });

    return parts;
};

const readColor = (value: string | undefined): number => {
    const text = (value ?? '').trim().replace(/^#/, '');

    if (!text) return 0xffffff;
    if (!/^[0-9a-f]{1,6}$/i.test(text)) throw new RequestError('color is a hex colour, ffffff for none');

    return parseInt(text, 16);
};

const readName = (value: string | undefined, name: string): string => {
    const text = (value ?? '').trim().toLowerCase();

    if (text && !NAME.test(text)) throw new RequestError(`${name} ${text} is not a name a pet has`);

    return text;
};
