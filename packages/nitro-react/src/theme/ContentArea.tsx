import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

/** `ContentArea` variants - the Flash `style` ids it draws. */
export type ContentAreaVariant = ThemeVariant;

const CONTENT_AREA_VARIANTS: ThemeVariants<ContentAreaVariant> = {
    0: { layout: { paddingBottom: 3, paddingLeft: 6, paddingRight: 6 } },
    3: { layout: { position: 'relative', paddingLeft: 3, paddingRight: 3, paddingTop: 0, paddingBottom: 4 } },
};

export interface ContentAreaProps extends ThemeProps<ContentAreaVariant> {
    children?: ReactNode;
}

export const ContentArea: ForwardRefExoticComponent<ContentAreaProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContentAreaProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, children }, ref) => {
        const { ownCascade, config, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'contentArea', variants: CONTENT_AREA_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
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
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

ContentArea.displayName = 'ContentArea';
