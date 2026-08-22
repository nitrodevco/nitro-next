import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box } from './Box';
import { BackgroundLayer } from './layer';
import { useThemeVariant, wrapTextChildren } from './utils';
import { ThemeProps, ThemeVariant, ThemeVariants } from './variant';

type ContentAreaVariant = ThemeVariant;

const CONTENT_AREA_VARIANTS: ThemeVariants<ContentAreaVariant> = {
    '0': { layout: { paddingBottom: 3 } },
    '3': { layout: { position: 'relative' } },
};

export interface ContentAreaProps extends ThemeProps<ContentAreaVariant> {
    children?: ReactNode;
}

export const ContentArea: ForwardRefExoticComponent<ContentAreaProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContentAreaProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, children }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'contentArea', variants: CONTENT_AREA_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor
        });

        return (
            <Box
                ref={ref}
                zIndex={20}
                layout={{
                    flexDirection: 'column',
                    width: '100%',
                    flex: 1,
                    overflow: 'hidden',
                    ...config.layout,
                    ...layout,
                }}
                {...handlers}
            >
                {resolvedLayer && <BackgroundLayer layer={resolvedLayer} tintColor={resolvedTint} />}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

ContentArea.displayName = 'ContentArea';
