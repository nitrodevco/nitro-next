import './utils/pixiElements';

import type { Container } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type JSX, type RefAttributes } from 'react';

/**
 * The flex/positioning primitive: a thin typed wrapper around pixiContainer + @pixi/layout's
 * `layout` prop (flexDirection, justifyContent, alignItems, gap, padding, position:
 * 'absolute'/'relative', percentage sizing, ...). Views compose everything from Box the way
 * they compose divs in the DOM theme package.
 */
export type BoxProps = JSX.IntrinsicElements['pixiContainer'];

/** The object-shaped half of the `layout` prop's type (it also allows boolean/null shorthand). */
export type BoxLayout = Extract<BoxProps['layout'], object>;

export const Box: ForwardRefExoticComponent<BoxProps & RefAttributes<Container>> = forwardRef<Container, BoxProps>((props, ref) => (
    <pixiContainer ref={ref} {...props} />
));

Box.displayName = 'Box';
