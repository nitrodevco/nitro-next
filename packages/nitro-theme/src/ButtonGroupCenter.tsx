import { ButtonGroupComponentProps, createButtonGroupComponent } from './utils';

export type ButtonGroupCenterProps = ButtonGroupComponentProps;

/** `button_group_center`: its variants are the theme's `buttonGroupCenter` - the client's rows of that type, their skins and window layouts. */
export const ButtonGroupCenter = createButtonGroupComponent('ButtonGroupCenter', 'buttonGroupCenter');
