import { type InteractionStates, type NineSliceLayerState, nineSliceLayerState } from './useInteractionState';

/**
 * Border-image data shared by TabButton and TabContainerButton - both DOM components
 * (theme/TabButton.tsx, theme/TabContainerButton.tsx) build their `variant` config from the
 * exact same `--tabbutton-{n}-{state}-src` var names, slices and widths; TabButton just adds
 * padding/min-size/text on top (its `cva` base carries those extra classes), while
 * TabContainerButton's `cva` base is `''` - bare chrome with no sizing of its own. Extracted
 * here (parallel to utils/buttonGroupFactory.tsx) so the two components share one variant
 * table instead of duplicating these values twice.
 *
 * DOM's `hover:` and `aria-selected:`/`active:` modifiers never combine with an
 * `aria-disabled:` rule for these two components (unlike Button/ContainerButton), so there is
 * no disabled art to port - only default/hovering/selected.
 */

/** DOM's `aria-selected:` and `active:` modifiers resolve to the exact same border-image in
 *  every variant, so both collapse to `resolveByState`'s `selected` field here. */
export type TabChromeStates = InteractionStates<NineSliceLayerState>;

const layer = nineSliceLayerState;

/**
 * Full port of the border-image portion of theme/TabButton.tsx & theme/TabContainerButton.tsx's
 * 4-variant tables. Every variant's `border-image-width` diverges from its `border-image-slice`
 * on at least one edge (e.g. variant '0' slices `5_5_2_5` but only renders `5px_5px_0px_5px` -
 * the bottom edge is sliced but drawn at 0 width, i.e. invisible) - the *width* numbers are what
 * actually render onscreen in DOM, so (matching every other nine-slice port in this package)
 * those are the values used for leftWidth/topHeight/rightWidth/bottomHeight below, not the
 * slice numbers. Variant '2' (white) reuses variant '0's `tabbutton-0-*` art wholesale -
 * confirmed from the DOM class strings, not assumed.
 */
export const TAB_BUTTON_CHROME_VARIANTS: Record<string, TabChromeStates> = {
    // default
    '0': {
        default: layer('tabbutton-0-default-src', 5, 5, 5, 0),
        hovering: layer('tabbutton-0-hovering-src', 5, 5, 5, 0),
        selected: layer('tabbutton-0-selected-src', 5, 5, 5, 0),
    },
    // black
    '1': {
        default: layer('tabbutton-1-default-src', 5, 5, 5, 0),
        hovering: layer('tabbutton-1-hovering-src', 5, 5, 5, 0),
        selected: layer('tabbutton-1-selected-src', 5, 5, 5, 0),
    },
    // white - reuses variant '0's art wholesale
    '2': {
        default: layer('tabbutton-0-default-src', 5, 5, 5, 0),
        hovering: layer('tabbutton-0-hovering-src', 5, 5, 5, 0),
        selected: layer('tabbutton-0-selected-src', 5, 5, 5, 0),
    },
    // shiny/pill
    '3': {
        default: layer('tabbutton-3-default-src', 9, 0, 9, 0),
        hovering: layer('tabbutton-3-hovering-src', 9, 0, 9, 0),
        selected: layer('tabbutton-3-selected-src', 9, 0, 9, 0),
    },
};
