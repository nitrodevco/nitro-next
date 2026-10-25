import { ButtonGroupComponentProps, createButtonGroupComponent } from './utils';

export type ButtonGroupLeftProps = ButtonGroupComponentProps;

/** `button_group_left`: its variants are the theme's `buttonGroupLeft` - the client's rows of that type, their skins and window layouts. */
export const ButtonGroupLeft = createButtonGroupComponent('ButtonGroupLeft', 'buttonGroupLeft');
