import { ButtonGroupComponentProps, createButtonGroupComponent } from './utils';
import { BUTTON_GROUP_RIGHT_VARIANTS } from './variants/buttonGroupRight';

export type ButtonGroupRightProps = ButtonGroupComponentProps;

export const ButtonGroupRight = createButtonGroupComponent('ButtonGroupRight', 'buttonGroupRight', BUTTON_GROUP_RIGHT_VARIANTS);
