import { AvatarActionStateType, AvatarExpressionStates, AvatarGenderType, AvatarGestureStates } from '@nitrodevco/nitro-api';

/**
 * Each drawn from the large (`h`) assets at the room's full scale: `n` as drawn, `l` doubled,
 * `s` halved afterwards as the zoomed-out room is - no `sh` art is used.
 */
export type AvatarImageSize = 's' | 'n' | 'l';

export type ImageFormat = 'png' | 'gif';

/** One action the figure is drawn doing, as `IAvatarImage.appendAction` takes it. */
export interface AvatarRequestAction {
    action: AvatarActionStateType;
    parameter?: string | number;
}

/** Everything an avatar image is drawn from, read and checked; two equal requests draw the same image. */
export interface AvatarRenderRequest {
    figure: string;
    gender: AvatarGenderType;
    size: AvatarImageSize;
    direction: number;
    headDirection: number;
    headOnly: boolean;
    posture: AvatarActionStateType;
    /** The other actions, in the order the room appends them (`AvatarVisualization.processActionsForAvatar`). */
    actions: AvatarRequestAction[];
    effect: number;
    /** The animation frame drawn, for a still image. */
    frame: number;
    /** Every frame of the animation, as an animated gif. */
    animate: boolean;
    /** Cut to the figure's visible pixels, with a pixel of transparent gap around it. */
    crop: boolean;
    format: ImageFormat;
}

/** Habbo's imaging names for a posture, and the room's own. */
const POSTURES: Record<string, AvatarActionStateType> = {
    std: AvatarActionStateType.Stand,
    wlk: AvatarActionStateType.Walk,
    mv: AvatarActionStateType.Walk,
    sit: AvatarActionStateType.Sit,
    lay: AvatarActionStateType.Lay,
    swim: AvatarActionStateType.Swim,
    float: AvatarActionStateType.Float,
};

/** Actions that take an item or sign id: `crr=6`, `drk=2`, `sig=11`. */
const PARAMETER_ACTIONS: Record<string, AvatarActionStateType> = {
    crr: AvatarActionStateType.CarryObject,
    cri: AvatarActionStateType.CarryObject,
    drk: AvatarActionStateType.UseObject,
    usei: AvatarActionStateType.UseObject,
    sig: AvatarActionStateType.Sign,
    sign: AvatarActionStateType.Sign,
};

/** Habbo's `wav` and the room's expression names (`wave`, `blow`, `laugh` ...). */
const EXPRESSIONS: Record<string, AvatarActionStateType> = {
    wav: AvatarActionStateType.Wave,
    ...Object.fromEntries([ ...AvatarExpressionStates ].map(state => [ state, state ])),
};

/** A gesture: a face (`sml`, `sad`, `agr`, `srp`), or the two the imaging api adds - `spk` talking, `eyb` eyes shut. */
const GESTURES: Record<string, AvatarRequestAction | undefined> = {
    std: undefined,
    spk: { action: AvatarActionStateType.Talk },
    eyb: { action: AvatarActionStateType.Sleep },
    ...Object.fromEntries([ ...AvatarGestureStates ]
        .filter(state => state !== AvatarActionStateType.Stand)
        .map(state => [ state, { action: AvatarActionStateType.Gesture, parameter: state } ])),
};

/** A figure string: `type-set[-colour[-colour]]` parts joined by dots. */
const FIGURE = /^[a-z]{2}-\d+(-\d+)*(\.[a-z]{2}-\d+(-\d+)*)*$/;

export const MAX_FIGURE_LENGTH = 512;
export const MAX_FRAME = 1000;
export const MAX_ITEM_ID = 9999;
export const MAX_EFFECT_ID = 99999;
export const MAX_DANCE = 4;

/** The names `action` and `gesture` take, for the index page to list what is read here. */
export const AVATAR_REQUEST_TOKENS = {
    postures: Object.keys(POSTURES),
    parameterActions: Object.keys(PARAMETER_ACTIONS),
    expressions: Object.keys(EXPRESSIONS),
    gestures: Object.keys(GESTURES),
} as const;

export class AvatarRequestError extends Error {}

/**
 * An avatar image request from its query - Habbo's `avatarimage` parameters, so a page built for
 * Habbo's imager works unchanged:
 *
 * - `figure` (required), `gender` `M` / `F`
 * - `size` `s` / `n` / `l`, `direction` and `head_direction` 0-7, `headonly=1`
 * - `action`: a comma list of one posture (`std`, `wlk` / `mv`, `sit`, `lay`, `swim`, `float`),
 *   expressions (`wav`, `blow`, `laugh` ...), `crr=<item>` / `cri=`, `drk=<item>` / `usei=` and
 *   `sig=<sign>` / `sign=`
 * - `gesture`: `std`, `sml`, `sad`, `agr`, `srp`, `spk` or `eyb`
 * - `img_format` `png` / `gif`
 *
 * and what the room draws besides: `dance=1-4`, `effect=<id>`, `frame=<n>` (or `frame_num`) and
 * `animate=1` (every frame as an animated gif), and `crop=1` (cut to the figure, the white space
 * around it gone but for a pixel's gap). A value that is not one of these is an error, not
 * a guess.
 */
export const parseAvatarRequest = (query: Record<string, string | undefined>): AvatarRenderRequest => {
    const figure = (query.figure ?? '').trim();

    if (!figure || (figure.length > MAX_FIGURE_LENGTH) || !FIGURE.test(figure)) throw new AvatarRequestError('figure is missing or not a figure string');

    const direction = readInteger(query.direction, 'direction', 0, 7, 2);
    const animate = readFlag(query.animate);
    const actions: AvatarRequestAction[] = [];

    let posture = AvatarActionStateType.Stand;

    for (const token of (query.action ?? '').split(',').map(value => value.trim().toLowerCase()).filter(Boolean)) {
        const [ name, value ] = token.split('=', 2);

        if (POSTURES[name] && (value === undefined)) {
            posture = POSTURES[name];
        } else if (PARAMETER_ACTIONS[name]) {
            actions.push({ action: PARAMETER_ACTIONS[name], parameter: readInteger(value, name, 0, MAX_ITEM_ID, 0) });
        } else if (EXPRESSIONS[name] && (value === undefined)) {
            actions.push({ action: EXPRESSIONS[name] });
        } else {
            throw new AvatarRequestError(`action ${token} is not one the imager draws`);
        }
    }

    const gesture = (query.gesture ?? 'std').trim().toLowerCase();

    if (!(gesture in GESTURES)) throw new AvatarRequestError(`gesture ${gesture} is not one the imager draws`);

    if (GESTURES[gesture]) actions.push(GESTURES[gesture]);

    const dance = readInteger(query.dance, 'dance', 0, MAX_DANCE, 0);

    if (dance > 0) actions.push({ action: AvatarActionStateType.Dance, parameter: dance });

    const format = (query.img_format ?? (animate ? 'gif' : 'png')).toLowerCase();

    if ((format !== 'png') && (format !== 'gif')) throw new AvatarRequestError('img_format is png or gif');
    if (animate && (format !== 'gif')) throw new AvatarRequestError('an animated image is a gif');

    const size = (query.size ?? 'n').toLowerCase();

    if ((size !== 's') && (size !== 'n') && (size !== 'l')) throw new AvatarRequestError('size is s, n or l');

    return {
        figure,
        gender: (query.gender?.toUpperCase() === 'F') ? AvatarGenderType.Female : AvatarGenderType.Male,
        size,
        direction,
        headDirection: readInteger(query.head_direction, 'head_direction', 0, 7, direction),
        headOnly: readFlag(query.headonly),
        posture,
        actions,
        effect: readInteger(query.effect, 'effect', 0, MAX_EFFECT_ID, 0),
        frame: readInteger(query.frame ?? query.frame_num, 'frame', 0, MAX_FRAME, 0),
        animate,
        crop: readFlag(query.crop),
        format,
    };
};

/** The request as one string, in a fixed order: the cache key. */
export const avatarRequestKey = (request: AvatarRenderRequest): string => JSON.stringify([
    request.figure, request.gender, request.size, request.direction, request.headDirection, request.headOnly,
    request.posture, request.actions, request.effect, request.frame, request.animate, request.crop, request.format,
]);

const readInteger = (value: string | undefined, name: string, min: number, max: number, fallback: number): number => {
    if ((value === undefined) || (value === '')) return fallback;

    const parsed = Number(value);

    if (!Number.isInteger(parsed) || (parsed < min) || (parsed > max)) throw new AvatarRequestError(`${name} is a whole number from ${min} to ${max}`);

    return parsed;
};

const readFlag = (value: string | undefined): boolean => (value !== undefined) && (value !== '0') && (value.toLowerCase() !== 'false');
