import { ButtonGroupComponentProps, ButtonGroupVariant, buttonGroupVariant, createButtonGroupComponent, ThemeVariants, windowLayout } from './utils';

/**
 * `button_group_center` - the rows of `habbo_element_description_xml`. The `_white` skin (style 2)
 * cuts exactly style 0's regions, and style 100 is the style 0 skin on the illumina plain button's
 * layout, so both draw style 0's files.
 */
export const BUTTON_GROUP_CENTER_VARIANTS: ThemeVariants<ButtonGroupVariant> = {
    0: { ...buttonGroupVariant('buttongroupcenter-0', 1), ...windowLayout('habbo_window_layout_button') },
    1: { ...buttonGroupVariant('buttongroupcenter-1', 1), ...windowLayout('habbo_window_layout_button_black') },
    2: { ...buttonGroupVariant('buttongroupcenter-0', 1), ...windowLayout('habbo_window_layout_button') },
    100: { ...buttonGroupVariant('buttongroupcenter-0', 1), ...windowLayout('illumina_light_button_plain') },
};

export type ButtonGroupCenterProps = ButtonGroupComponentProps;

export const ButtonGroupCenter = createButtonGroupComponent('ButtonGroupCenter', 'buttonGroupCenter', BUTTON_GROUP_CENTER_VARIANTS);
