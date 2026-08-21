import { type ButtonGroupComponentProps, type ButtonGroupVariant,createButtonGroupComponent, layerState } from './utils/buttonGroupFactory';

/**
 * Full port of theme/ButtonGroupRight.tsx's 4-variant table. Slice geometry is the asymmetric
 * `3_3_3_1` (left edge thinner than the other three), same shape as ButtonGroupCenter. Unlike
 * Center, EVERY variant here (including '0' and '100') thins the left edge to 2px on hover
 * (`3_3_3_2`) - confirmed from the DOM class strings, not assumed uniform with Center.
 *
 * Variant '2' reuses '0's art in every state, including hover (`--buttongroupright-0-hovering-
 * src`, not a '2'-specific texture) - making it visually identical to variant '0'. This is the
 * opposite of ButtonGroupCenter's variant '2', which DOES get its own hover-only asset.
 */
const BUTTON_GROUP_RIGHT_VARIANTS: Record<string, ButtonGroupVariant> = {
    // default
    '0': {
        states: {
            default: layerState('buttongroupright-0-default-src', 1, 3, 3, 3),
            hovering: layerState('buttongroupright-0-hovering-src', 2, 3, 3, 3),
            selected: layerState('buttongroupright-0-selected-src', 1, 3, 3, 3),
            disabled: layerState('buttongroupright-0-disabled-src', 1, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-regular', color: '#000000',
    },
    // black
    '1': {
        states: {
            default: layerState('buttongroupright-1-default-src', 1, 3, 3, 3),
            hovering: layerState('buttongroupright-1-hovering-src', 2, 3, 3, 3),
            selected: layerState('buttongroupright-1-selected-src', 1, 3, 3, 3),
            disabled: layerState('buttongroupright-1-disabled-src', 1, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-regular', color: '#ffffff',
    },
    // white (reuses '0' art in every state, including hover - effectively identical to '0')
    '2': {
        states: {
            default: layerState('buttongroupright-0-default-src', 1, 3, 3, 3),
            hovering: layerState('buttongroupright-0-hovering-src', 2, 3, 3, 3),
            selected: layerState('buttongroupright-0-selected-src', 1, 3, 3, 3),
            disabled: layerState('buttongroupright-0-disabled-src', 1, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-regular', color: '#000000',
    },
    // landing view / IL button size (reuses '0' art)
    '100': {
        states: {
            default: layerState('buttongroupright-0-default-src', 1, 3, 3, 3),
            hovering: layerState('buttongroupright-0-hovering-src', 2, 3, 3, 3),
            selected: layerState('buttongroupright-0-selected-src', 1, 3, 3, 3),
            disabled: layerState('buttongroupright-0-disabled-src', 1, 3, 3, 3),
        },
        paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
        minWidth: 28, minHeight: 28,
        textStyleKey: 'text-style-il-button', color: '#000000',
    },
};

export type ButtonGroupRightProps = ButtonGroupComponentProps;

export const ButtonGroupRight = createButtonGroupComponent('ButtonGroupRight', 'buttonGroupRight', BUTTON_GROUP_RIGHT_VARIANTS);
