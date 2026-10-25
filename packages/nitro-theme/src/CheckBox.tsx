import { createToggleButton, ToggleButtonProps } from './toggleButton';

export type CheckBoxProps = ToggleButtonProps;

/** `checkbox`: its variants are the theme's `checkBox`. */
export const CheckBox = createToggleButton('CheckBox', 'checkBox');
