import { ButtonGroupComponentProps, createButtonGroupComponent } from './utils';
import { BUTTON_GROUP_CENTER_VARIANTS } from './variants/buttonGroupCenter';

export type ButtonGroupCenterProps = ButtonGroupComponentProps;

export const ButtonGroupCenter = createButtonGroupComponent('ButtonGroupCenter', 'buttonGroupCenter', BUTTON_GROUP_CENTER_VARIANTS);
