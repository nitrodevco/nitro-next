import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeProps, wrapTextChildren } from './utils';
import { CONTENT_AREA_VARIANTS, ContentAreaVariant } from './variants/contentArea';

export interface ContentAreaProps extends ThemeProps<ContentAreaVariant> {
    children?: ReactNode;
}

export const ContentArea: ForwardRefExoticComponent<ContentAreaProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContentAreaProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, children }, ref) => {
        const { ownCascade, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
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
