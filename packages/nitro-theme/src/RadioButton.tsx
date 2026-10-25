import { createToggleButton, ToggleButtonProps } from './toggleButton';

export type RadioButtonProps = ToggleButtonProps;

/** `radiobutton`: its variants are the theme's `radioButton`. */
export const RadioButton = createToggleButton('RadioButton', 'radioButton');
