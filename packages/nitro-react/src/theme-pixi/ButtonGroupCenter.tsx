import { type ButtonGroupComponentProps, type ButtonGroupVariant,createButtonGroupComponent, layerState } from './utils/buttonGroupFactory';

/**
 * Full port of theme/ButtonGroupCenter.tsx's 4-variant table. Slice geometry is the asymmetric
 * `3_3_3_1` (left edge thinner than the other three), matching theme/ButtonGroupCenter.tsx's
 * `border-image-slice`/`-width` values exactly (CSS order top/right/bottom/left -> pixi
 * left/top/right/bottom). Variants '1' and '2' additionally thin the left edge to 2px on
 * hover (`3_3_3_2`); '0' and '100' keep `3_3_3_1` in every state.
 *
 * Variant '2' has its own asset-reuse quirk: default/selected/disabled reuse '0's art, but
 * hover gets its own `buttongroupcenter-2-hovering-src` texture (confirmed from the DOM class
 * string, not a guess) - unlike ButtonGroupLeft's variant '2' (which reuses '0' art
 * everywhere) or ButtonGroupRight's variant '2' (which also reuses '0' art everywhere,
 * including hover).
 */
const BUTTON_GROUP_CENTER_VARIANTS: Record<string, ButtonGroupVariant> = {
    // default
    '0': {
        states: {
            default: layerState('buttongroupcenter-0-default-src', 1, 3, 3, 3),
            hovering: layerState('buttongroupcenter-0-hovering-src', 1, 3, 3, 3),
            selected: layerState('buttongroupcenter-0-selected-src', 1, 3, 3, 3),
            disabled: layerState('buttongroupcenter-0-disabled-src', 1, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-regular', color: '#000000',
    },
    // black
    '1': {
        states: {
            default: layerState('buttongroupcenter-1-default-src', 1, 3, 3, 3),
            hovering: layerState('buttongroupcenter-1-hovering-src', 2, 3, 3, 3),
            selected: layerState('buttongroupcenter-1-selected-src', 1, 3, 3, 3),
            disabled: layerState('buttongroupcenter-1-disabled-src', 1, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-regular', color: '#ffffff',
    },
    // white (default/selected/disabled reuse '0' art; hover gets its own '2'-specific asset)
    '2': {
        states: {
            default: layerState('buttongroupcenter-0-default-src', 1, 3, 3, 3),
            hovering: layerState('buttongroupcenter-2-hovering-src', 2, 3, 3, 3),
            selected: layerState('buttongroupcenter-0-selected-src', 1, 3, 3, 3),
            disabled: layerState('buttongroupcenter-0-disabled-src', 1, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-regular', color: '#000000',
    },
    // landing view / IL button size (reuses '0' art, no hover-thinning)
    '100': {
        states: {
            default: layerState('buttongroupcenter-0-default-src', 1, 3, 3, 3),
            hovering: layerState('buttongroupcenter-0-hovering-src', 1, 3, 3, 3),
            selected: layerState('buttongroupcenter-0-selected-src', 1, 3, 3, 3),
            disabled: layerState('buttongroupcenter-0-disabled-src', 1, 3, 3, 3),
        },
        paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
        minWidth: 28, minHeight: 28,
        textStyleKey: 'text-style-il-button', color: '#000000',
    },
};

export type ButtonGroupCenterProps = ButtonGroupComponentProps;

export const ButtonGroupCenter = createButtonGroupComponent('ButtonGroupCenter', 'buttonGroupCenter', BUTTON_GROUP_CENTER_VARIANTS);
