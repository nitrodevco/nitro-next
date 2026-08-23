import './pixiElements';

import { Children, type ReactNode } from 'react';

import { Text } from '../Text';
import { TextStyleKey } from './textStyles';

export const wrapTextChildren = (children: ReactNode, text?: {
    textStyle?: TextStyleKey;
    textColor?: string;
}): ReactNode => Children.map(children, (child) => {
    if (typeof child !== 'string' && typeof child !== 'number') return child;

    if (typeof child === 'string' && child.trim() === '') return null;

    return (
        <Text
            text={String(child)}
            textStyle={text?.textStyle}
            textOptions={{ fill: text?.textColor }}
        />
    );
});
