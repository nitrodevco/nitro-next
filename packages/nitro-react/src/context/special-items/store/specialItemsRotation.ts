/**
 * The carousel of the special items display - `SpecialItemsView`'s rotation fields and the
 * arithmetic of `update`, `navigateTo`, `onNextClick` / `onPreviousClick`,
 * `updatePlaqueAndSpotlight`, the `plaqueAndSpotlightBlend` setter and
 * `SpecialItemElementView.updateRotation` / `updatePointAndFocus`, as pure functions of one state
 * object so the store can step it from the ticker and the view can draw it.
 *
 * Kept as literal as the Flash code, quirks included: an element's focus is the one its last
 * `updateRotation` computed, so `updatePlaqueAndSpotlight` reads the previous frame's focus; the
 * spotlight's blend is compared against `§_-328§`, which Flash initialises to 1 and never
 * assigns, so it is only re-set while it is more than 0.1 away from 1 or exactly 0.4; and a
 * window's `x`/`y` are `int` locals, so they truncate.
 */

/** `SpecialItemElementView`'s point on the ellipse and its focus, for an element at `index`. */
export interface SpecialItemPoint {
    x: number;
    y: number;
    focus: number;
}

export interface SpecialItemsRotation {
    /** `§_-R5§`: the element the carousel is heading for, and the selected page. */
    target: number;
    /** `§_-92L§`: where the carousel is, in elements (wraps at the element count). */
    position: number;
    /** `§_-E2m§`: the eased speed, in elements per second. */
    speed: number;
    /** `§_-r1A§`: moving. */
    animating: boolean;
    /** `§_-YQ§`: moving backwards. */
    reverse: boolean;
    /** `_extraCycles`: whole turns still to make before settling (a click while already on the way). */
    extraCycles: number;
    /** `§_-W26§`: the element the plaque is for, -1 while none is in focus. */
    plaqueIndex: number;
    /** The element whose title, description and icon the plaque shows - kept while `plaqueIndex` is -1. */
    plaqueItem: number;
    /** The position the elements were last placed at (`updateRotationAnimation`): their focus values come from it. */
    placedPosition: number;
    /** Each element's product image `blend`, as `updateRotation` last applied it. */
    elementBlends: number[];
    /** `§_-82x§`: the plaque's texts, icon and scrollbar blend. */
    plaqueBlend: number;
    /** `spotlightBaseImg.blend` / `spotlightImg.blend`. */
    spotlightBlend: number;
}

/** `§_-328§`: the value `plaqueAndSpotlightBlend` compares the spotlight's blend to - never written after its initialiser. */
const SPOTLIGHT_COMPARED_BLEND = 1;

/** `SpecialItemElementView.updatePointAndFocus`. */
export const getSpecialItemPoint = (index: number, position: number, total: number): SpecialItemPoint => {
    let distance = index - position;

    const wrappedUp = distance + total;
    const wrappedDown = distance - total;

    if (Math.abs(wrappedUp) < Math.abs(distance)) distance = wrappedUp;
    else if (Math.abs(wrappedDown) < Math.abs(distance)) distance = wrappedDown;

    let focus = 0;

    if (Math.abs(distance) < 0.5) focus = 1 - (Math.abs(distance) * 2);

    let angle = 180 + (90 * distance);

    angle = Math.min(Math.max(angle, 0), 360);

    const radians = (angle * 3.141592653589793) / 180;

    return { x: 0.5 - (0.5 * Math.sin(radians)), y: 0.5 - (0.5 * Math.cos(radians)), focus };
};

/** `updateRotation`: the product display's `x`/`y` inside `item_rotation` (both `int`). */
export const getSpecialItemWindowPosition = (point: SpecialItemPoint): { x: number; y: number } => ({
    x: Math.trunc(((point.x * 216) - 80) + 42),
    y: Math.trunc((point.y * 73) - 113),
});

/** `updateRotation`'s blend for an element, applied only past its 0.05 buffering. */
const nextElementBlend = (current: number, point: SpecialItemPoint, total: number): number => {
    let blend = point.y;

    if (total <= 4) blend = Math.max(0.25, blend);
    else if (blend < 0.05) blend = 0;

    blend = Math.min(blend, 1);

    const changed = (Math.abs(current - blend) > 0.05) || ((blend === 0) && (current !== 0)) || ((blend === 1) && (current !== 1));

    return changed ? blend : current;
};

/** `updateRotationAnimation`: every element placed at `position`. */
const placeElements = (state: SpecialItemsRotation, total: number): SpecialItemsRotation => {
    const elementBlends: number[] = [];

    for (let index = 0; index < total; index++) elementBlends.push(nextElementBlend(state.elementBlends[index] ?? 1, getSpecialItemPoint(index, state.position, total), total));

    return { ...state, elementBlends, placedPosition: state.position };
};

/** The focus value `SpecialItemElementView` holds for an element: computed at its last placing. */
const focusOf = (state: SpecialItemsRotation, index: number, total: number): number => getSpecialItemPoint(index, state.placedPosition, total).focus;

/** The `plaqueAndSpotlightBlend` setter. */
const applyPlaqueAndSpotlightBlend = (state: SpecialItemsRotation, blend: number): SpecialItemsRotation => {
    let spotlight = 0.4;

    if (blend > 0.8) spotlight = 0.4 + (((blend - 0.8) / 0.2) * 0.6);

    // Flash's `|§_-328§ - s| > 0.1 || s == 0.4 && §_-328§ != 0.4 || s == 1 && §_-328§ != 1`, with `§_-328§` forever 1.
    const spotlightChanged = (Math.abs(SPOTLIGHT_COMPARED_BLEND - spotlight) > 0.1) || (spotlight === 0.4);
    const plaqueChanged = (Math.abs(state.plaqueBlend - blend) > 0.1) || ((blend === 0) && (state.plaqueBlend !== 0)) || ((blend === 1) && (state.plaqueBlend !== 1));

    return {
        ...state,
        spotlightBlend: spotlightChanged ? spotlight : state.spotlightBlend,
        plaqueBlend: plaqueChanged ? blend : state.plaqueBlend,
    };
};

/** `setItemPlaque`: nothing when the plaque already shows that element. */
const setItemPlaque = (state: SpecialItemsRotation, index: number): SpecialItemsRotation => ((index === state.plaqueIndex) ? state : { ...state, plaqueIndex: index, plaqueItem: index });

/** `resetToFirstElement` (with `selectedPage = 0`): the first element in focus, at rest. */
export const createSpecialItemsRotation = (total: number): SpecialItemsRotation => {
    let state: SpecialItemsRotation = {
        target: 0,
        position: 0,
        speed: 0,
        animating: false,
        reverse: false,
        extraCycles: 0,
        plaqueIndex: -1,
        plaqueItem: 0,
        placedPosition: 0,
        elementBlends: [],
        plaqueBlend: 1,
        spotlightBlend: 1,
    };

    if (!total) return state;

    state = setItemPlaque(state, 0);
    state = placeElements(state, total);

    return applyPlaqueAndSpotlightBlend(state, 1);
};

/** `navigateTo(index, fromArrow, reverse)`: `selectedPage` and `markItemVisited` are the caller's. */
export const navigateSpecialItems = (state: SpecialItemsRotation, index: number, fromArrow: boolean = false, reverse: boolean = false): SpecialItemsRotation => {
    let next = { ...state, target: index };

    if (!fromArrow) {
        next.extraCycles = 0;
        reverse = false;

        if (next.position > index) reverse = true;
    }

    next.reverse = reverse;

    if (!next.animating) next = { ...next, speed: 0, animating: true };

    return next;
};

/** `onNextClick`. */
export const nextSpecialItem = (state: SpecialItemsRotation, total: number): SpecialItemsRotation => {
    const wasForward = state.animating && !state.reverse;
    const next = navigateSpecialItems(state, (state.target + 1) % total, true, false);
    let extraCycles = Math.max(0, next.extraCycles);

    if (wasForward && (((next.position > (next.target - 1)) && (next.position < next.target)) || ((next.position > (total - 1)) && (next.target === 0)))) extraCycles += 1;

    return { ...next, extraCycles };
};

/** `onPreviousClick`. */
export const previousSpecialItem = (state: SpecialItemsRotation, total: number): SpecialItemsRotation => {
    const wasReverse = state.animating && state.reverse;
    const next = navigateSpecialItems(state, ((state.target - 1) + total) % total, true, true);
    let extraCycles = Math.min(0, next.extraCycles);

    if (wasReverse && ((next.position > next.target) && (next.position < (next.target + 1)))) extraCycles -= 1;

    return { ...next, extraCycles };
};

/** `updatePlaqueAndSpotlight`. */
const updatePlaqueAndSpotlight = (state: SpecialItemsRotation, total: number): SpecialItemsRotation => {
    if (!state.animating) return setItemPlaque(applyPlaqueAndSpotlightBlend(state, 1), state.target);

    let next = state;
    let focus = 0;

    if (next.plaqueIndex !== -1) focus = focusOf(next, next.plaqueIndex, total);

    if ((next.plaqueIndex !== next.target) && (next.plaqueIndex !== -1) && (focus === 0)) next = { ...next, plaqueIndex: -1 };

    if ((next.plaqueIndex !== next.target) && (next.extraCycles === 0) && (next.speed < Math.min(2, total - 1))) {
        const targetFocus = focusOf(next, next.target, total);

        if (targetFocus > focus) {
            focus = targetFocus;
            next = setItemPlaque(next, next.target);
        }
    }

    return applyPlaqueAndSpotlightBlend(next, focus);
};

/** `update(deltaTime)`: one frame of the carousel, `deltaTime` in milliseconds. */
export const stepSpecialItemsRotation = (state: SpecialItemsRotation, deltaTime: number, total: number): SpecialItemsRotation => {
    if (!state.animating || (deltaTime <= 0)) return state;

    const framesPerSecond = 1000 / deltaTime;
    let distance = state.target - state.position;

    if ((distance > 0) && state.reverse) distance -= total;
    else if ((distance < 0) && !state.reverse) distance += total;

    if ((!state.reverse && (state.extraCycles > 0)) || (state.reverse && (state.extraCycles < 0))) distance += state.extraCycles * total;

    let speed = Math.abs(distance) * 2;

    if (speed > state.speed) speed = (state.speed * 0.95) + (speed * 0.05);
    else speed = (state.speed * 0.85) + (speed * 0.15);

    speed = Math.max(0.05, speed);

    let step = speed / framesPerSecond;

    if (state.reverse) step *= -1;

    let next: SpecialItemsRotation = { ...state, speed };

    if ((!state.reverse && (step > distance)) || (state.reverse && (step < distance))) {
        next = { ...next, animating: false, position: state.target, extraCycles: 0 };
    } else {
        let position = state.position + step;
        let extraCycles = state.extraCycles;

        if (extraCycles !== 0) {
            const remainder = distance % total;

            if ((extraCycles > 0) && !state.reverse && (step > remainder)) extraCycles -= 1;
            else if ((extraCycles < 0) && state.reverse && (step < remainder)) extraCycles += 1;
        }

        if (position > total) position -= total;
        else if (position < 0) position += total;

        next = { ...next, position, extraCycles };
    }

    next = updatePlaqueAndSpotlight(next, total);

    return placeElements(next, total);
};
