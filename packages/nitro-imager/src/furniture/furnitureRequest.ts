import { FrameQuery, readFlag, readFrameQuery, readInteger } from '../http/readQuery';
import { RequestError } from '../http/RequestError';

/** Everything a furniture image is drawn from, read and checked; two equal requests draw the same image. */
export interface FurnitureRenderRequest extends FrameQuery {
    /** The furnidata class name, with its colour (`rare_dragonlamp*4`); empty when asked for by id. */
    name: string;
    /** The furnidata id; -1 when asked for by name. */
    id: number;
    /** The id is a wall item's: floor and wall items are numbered apart. */
    wall: boolean;
    /** The furniture's state (`FurnitureData`): which of its looks, and its animation. */
    state: number;
}

/** A furnidata class name, with an optional colour index: `throne`, `rare_dragonlamp*4`. */
const CLASS_NAME = /^[a-z0-9_.-]{1,100}(\*\d{1,4})?$/i;

export const MAX_FURNITURE_ID = 99_999_999;
export const MAX_FURNITURE_STATE = 9999;

/**
 * A furniture image request from its query:
 *
 * - `name`: the furnidata class name, with a colour as the furnidata writes it
 *   (`rare_dragonlamp*4`); or else `id`, the furnidata id, with `wall=1` for a wall item's
 * - `state`: which of its looks (a lamp on or off, a gate open or shut), and so its animation
 * - `readFrameQuery`'s size, direction and frames: a floor item's `direction` is 0, 2, 4 or 6,
 *   a wall item's 2 or 4, as the room turns them
 *
 * A value that is not one of these is an error, not a guess.
 */
export const parseFurnitureRequest = (query: Record<string, string | undefined>): FurnitureRenderRequest => {
    const name = (query.name ?? '').trim().toLowerCase();
    const id = readInteger(query.id, 'id', 0, MAX_FURNITURE_ID, -1);

    if (!name && (id < 0)) throw new RequestError('a furniture is name=<class name>, or id=<furnidata id> (and wall=1 for a wall item)');
    if (name && !CLASS_NAME.test(name)) throw new RequestError('name is a furnidata class name, with *<colour> for a coloured one');

    return {
        ...readFrameQuery(query),
        name,
        id: name ? -1 : id,
        wall: readFlag(query.wall),
        state: readInteger(query.state, 'state', 0, MAX_FURNITURE_STATE, 0),
    };
};

/** The request as one string, in a fixed order: the cache key. */
export const furnitureRequestKey = (request: FurnitureRenderRequest): string => JSON.stringify([
    request.name, request.id, request.wall, request.state, request.size, request.direction, request.frame, request.animate, request.format,
]);
