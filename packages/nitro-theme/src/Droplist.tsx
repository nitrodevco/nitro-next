import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, SpriteLayer } from './layer';
import { ThemeProps, ThemeVariant, wrapTextChildren } from './utils';

/** The skin's `arrow` entity: a fixed 16px square. */
const ARROW_SIZE = 16;

export type DroplistVariant = ThemeVariant & {
    arrowTextureKey: string;
    arrowTop: number;
    arrowRight: number;
};

export interface DroplistProps extends ThemeProps<DroplistVariant> {
    children?: ReactNode;
}

/**
 * Flash's `DropListController` (`droplist`): the skin with its caption, and the skin's `arrow` at
 * its distance from the top right corner.
 */
export const Droplist: ForwardRefExoticComponent<DroplistProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DroplistProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, children }, ref) => {
        const { ownCascade, config, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<DroplistVariant>({
            cascadeKey: 'droplist', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor,
        });

        // The caption stops short of the arrow, which keeps its distance to the top right corner.
        const arrowSpace = config.arrowTextureKey ? (config.arrowRight ?? 0) + ARROW_SIZE + 2 : 2;

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{ position: 'relative', minWidth: 40, minHeight: 22, paddingLeft: 2, paddingRight: arrowSpace, ...config.layout, ...layout }}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                {config.arrowTextureKey && (
                    <SpriteLayer
                        textureKey={config.arrowTextureKey}
                        layout={{
                            // Out of the row: at the skin's distance from the top right corner, not placed after the caption.
                            position: 'absolute',
                            right: config.arrowRight,
                            top: config.arrowTop,
                            width: ARROW_SIZE,
                            height: ARROW_SIZE,
                        }}
                    />
                )}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Droplist.displayName = 'Droplist';
