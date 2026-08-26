import { Children, ReactNode } from 'react';

import { ThemeText } from '../ThemeText';
import { TextStyleKey } from './textStyles';

type WrapTextOptions = { textStyle?: TextStyleKey; textColor?: string };

const wrapChild = (child: ReactNode, text: WrapTextOptions | undefined): ReactNode => {
    if (typeof child !== 'string' && typeof child !== 'number') return child;

    if (typeof child === 'string' && child.trim() === '') return null;

    return (
        <ThemeText
            text={String(child)}
            textStyle={text?.textStyle}
            textOptions={{ fill: text?.textColor }}
        />
    );
};

/**
 * By far the most common case at every call site is a single non-text child (an already-built
 * element, e.g. another themed component) - bail out before `Children.map` (which always clones
 * into a new array/keys every call, even for a single non-array child) whenever there's nothing
 * that could possibly need wrapping.
 */
export const wrapTextChildren = (children: ReactNode, text?: WrapTextOptions): ReactNode => {
    if (typeof children === 'string' || typeof children === 'number') return wrapChild(children, text);

    if (!Array.isArray(children)) return children;

    return Children.map(children, child => wrapChild(child, text));
};
