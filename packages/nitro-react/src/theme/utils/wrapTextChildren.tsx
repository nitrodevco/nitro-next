import './pixiElements';

import { Children, ReactNode } from 'react';

import { ThemeText } from '../ThemeText';
import { TextStyleKey } from './textStyles';

export const wrapTextChildren = (children: ReactNode, text?: {
    textStyle?: TextStyleKey;
    textColor?: string;
}): ReactNode => Children.map(children, (child) => {
    if (typeof child !== 'string' && typeof child !== 'number') return child;

    if (typeof child === 'string' && child.trim() === '') return null;

    return (
        <ThemeText
            text={String(child)}
            textStyle={text?.textStyle}
            textOptions={{ fill: text?.textColor }}
        />
    );
});
