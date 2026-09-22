import { ButtonGroupComponentProps, ButtonGroupVariant, buttonGroupVariant, createButtonGroupComponent, ThemeVariants, windowLayout } from './utils';

/**
 * `button_group_left` - the rows of `habbo_element_description_xml`. The `_white` skin (style 2)
 * cuts exactly style 0's regions, and style 100 is the style 0 skin on the illumina plain button's
 * layout, so both draw style 0's files.
 */
export const BUTTON_GROUP_LEFT_VARIANTS: ThemeVariants<ButtonGroupVariant> = {
    0: { ...buttonGroupVariant('buttongroupleft-0', 3), ...windowLayout('habbo_window_layout_button') },
    1: { ...buttonGroupVariant('buttongroupleft-1', 3), ...windowLayout('habbo_window_layout_button_black') },
    2: { ...buttonGroupVariant('buttongroupleft-0', 3), ...windowLayout('habbo_window_layout_button') },
    100: { ...buttonGroupVariant('buttongroupleft-0', 3), ...windowLayout('illumina_light_button_plain') },
};

export type ButtonGroupLeftProps = ButtonGroupComponentProps;

export const ButtonGroupLeft = createButtonGroupComponent('ButtonGroupLeft', 'buttonGroupLeft', BUTTON_GROUP_LEFT_VARIANTS);
