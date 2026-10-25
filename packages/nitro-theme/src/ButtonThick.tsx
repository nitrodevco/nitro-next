import { ButtonProps, createButton } from './Button';
import { ThemeWithStatesVariant } from './utils';

export type ButtonThickVariant = ThemeWithStatesVariant;

export type ButtonThickProps = ButtonProps;

/** `button_thick` - a `ButtonController` like `button`: its variants are the theme's `buttonThick`. */
export const ButtonThick = createButton('ButtonThick', 'buttonThick');
