import './pixiElements';

import { Children, type ReactNode } from 'react';

import { Text } from '../Text';

export const wrapTextChildren = (children: ReactNode): ReactNode => Children.map(children, child => {
    if (typeof child !== 'string' && typeof child !== 'number') return child;
    if (typeof child === 'string' && child.trim() === '') return null;

    return <Text text={String(child)} />;
});
