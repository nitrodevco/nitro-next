import { Container as PixiContainer, Graphics } from 'pixi.js';
import { forwardRef, useCallback } from 'react';

import { Box, BoxLayout } from './Box';
import { boxLayoutToStyle } from './dom';
import { getRenderMode, ThemeLayoutMeta } from './utils';

export type ShapeKind = 'rectangle' | 'round_rectangle' | 'ellipse' | 'rhombus';

export interface ShapeProps extends ThemeLayoutMeta {
    shape?: ShapeKind;
    color?: string;
    strokeColor?: string;
    strokeThickness?: number;
    radius?: number;
    alpha?: number;
    layout?: BoxLayout;
}

/**
 * The Flash `shape` element (a vector fill with an optional stroke). Drawn once into a
 * 100x100 unit box and stretched to its layout size by the layout engine, the same way
 * `ColorLayer` stretches its 1x1 rect - which means the stroke and corner radius scale with
 * the box rather than staying pixel-exact. Good enough for the decorative cutouts/dividers
 * the layouts use it for.
 */
export const Shape = forwardRef<PixiContainer, ShapeProps>(({ shape = 'rectangle', color = '#ffffff', strokeColor, strokeThickness = 0, radius = 0, alpha, layout, visible }, ref) => {
    const draw = useCallback((g: Graphics) => {
        g.clear();

        switch (shape) {
            case 'ellipse': g.ellipse(50, 50, 50, 50); break;
            case 'rhombus': g.poly([ 50, 0, 100, 50, 50, 100, 0, 50 ]); break;
            case 'round_rectangle': g.roundRect(0, 0, 100, 100, radius); break;
            default: g.rect(0, 0, 100, 100);
        }

        g.fill(color);

        if (strokeColor && strokeThickness > 0) g.stroke({ color: strokeColor, width: strokeThickness });
    }, [ shape, color, strokeColor, strokeThickness, radius ]);

    if (getRenderMode() === 'dom') {
        const borderRadius = shape === 'ellipse' ? '50%' : shape === 'round_rectangle' ? radius : undefined;

        return (
            <div style={{
                ...boxLayoutToStyle(layout),
                display: visible === false ? 'none' : undefined,
                backgroundColor: color,
                opacity: alpha,
                borderRadius,
                border: strokeColor && strokeThickness > 0 ? `${strokeThickness}px solid ${strokeColor}` : undefined,
                transform: shape === 'rhombus' ? 'rotate(45deg) scale(0.7071)' : undefined,
            }}
            />
        );
    }

    return (
        <Box
            ref={ref}
            visible={visible}
            layout={layout ?? {}}
        >
            <pixiGraphics
                eventMode="none"
                alpha={alpha}
                draw={draw}
                layout={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
        </Box>
    );
});

Shape.displayName = 'Shape';
