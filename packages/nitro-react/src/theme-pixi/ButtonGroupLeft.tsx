import { type ButtonGroupComponentProps, type ButtonGroupVariant,createButtonGroupComponent, layerState } from './utils/buttonGroupFactory';

/**
 * Full port of theme/ButtonGroupLeft.tsx's 4-variant table. Slice geometry is the symmetric
 * `3_3_3_3` in every state of every variant (unlike Center/Right, which thin their left edge).
 * Variants '2' and '100' both reuse '0's art in every state - a real DOM quirk (their class
 * strings reference `--buttongroupleft-0-*`, not `-2-*`/`-100-*`), not an omission.
 */
const BUTTON_GROUP_LEFT_VARIANTS: Record<string, ButtonGroupVariant> = {
    // default
    '0': {
        states: {
            default: layerState('buttongroupleft-0-default-src', 3, 3, 3, 3),
            hovering: layerState('buttongroupleft-0-hovering-src', 3, 3, 3, 3),
            selected: layerState('buttongroupleft-0-selected-src', 3, 3, 3, 3),
            disabled: layerState('buttongroupleft-0-disabled-src', 3, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-regular', color: '#000000',
    },
    // black
    '1': {
        states: {
            default: layerState('buttongroupleft-1-default-src', 3, 3, 3, 3),
            hovering: layerState('buttongroupleft-1-hovering-src', 3, 3, 3, 3),
            selected: layerState('buttongroupleft-1-selected-src', 3, 3, 3, 3),
            disabled: layerState('buttongroupleft-1-disabled-src', 3, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-regular', color: '#ffffff',
    },
    // white (reuses '0' art in every state)
    '2': {
        states: {
            default: layerState('buttongroupleft-0-default-src', 3, 3, 3, 3),
            hovering: layerState('buttongroupleft-0-hovering-src', 3, 3, 3, 3),
            selected: layerState('buttongroupleft-0-selected-src', 3, 3, 3, 3),
            disabled: layerState('buttongroupleft-0-disabled-src', 3, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-regular', color: '#000000',
    },
    // landing view / IL button size (reuses '0' art)
    '100': {
        states: {
            default: layerState('buttongroupleft-0-default-src', 3, 3, 3, 3),
            hovering: layerState('buttongroupleft-0-hovering-src', 3, 3, 3, 3),
            selected: layerState('buttongroupleft-0-selected-src', 3, 3, 3, 3),
            disabled: layerState('buttongroupleft-0-disabled-src', 3, 3, 3, 3),
        },
        paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
        minWidth: 28, minHeight: 28,
        textStyleKey: 'text-style-il-button', color: '#000000',
    },
};

export type ButtonGroupLeftProps = ButtonGroupComponentProps;

export const ButtonGroupLeft = createButtonGroupComponent('ButtonGroupLeft', 'buttonGroupLeft', BUTTON_GROUP_LEFT_VARIANTS);
