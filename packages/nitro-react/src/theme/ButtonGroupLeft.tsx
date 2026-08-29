import { ButtonGroupComponentProps, createButtonGroupComponent } from './utils';
import { BUTTON_GROUP_LEFT_VARIANTS } from './variants/buttonGroupLeft';

export type ButtonGroupLeftProps = ButtonGroupComponentProps;

export const ButtonGroupLeft = createButtonGroupComponent('ButtonGroupLeft', 'buttonGroupLeft', BUTTON_GROUP_LEFT_VARIANTS);
