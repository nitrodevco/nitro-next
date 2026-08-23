import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { ThemeProps, ThemeVariant, ThemeVariants, VariantCascadeProvider } from '#base/theme-core';

import { Box } from './Box';
import { BackgroundLayer, NineSlice } from './layer';
import { useThemeVariant, wrapTextChildren } from './utils';

type TabContentVariant = ThemeVariant;

const TAB_CONTENT_VARIANTS: ThemeVariants<TabContentVariant> = {
    // default
    0: {
        layer: NineSlice('border-0-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // black
    1: {
        layer: NineSlice('border-1-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // white
    2: {
        layer: NineSlice('border-2-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // shiny - the legacy DOM port (theme/TabContent.tsx, deleted) used
    // `border-image-slice: 15 0 2 0 fill` for this variant; the bottomHeight here dropped to 0
    // during the Pixi port, which pulls the nine-slice's stretched "fill" region 2px further
    // down the source texture than the original slices it from (rows 15-19 instead of 15-17).
    3: {
        layer: NineSlice('tabcontent-3-default-src', 0, 15, 0, 2),
        layout: { paddingTop: 6, paddingLeft: 5, paddingRight: 5, paddingBottom: 2, marginTop: -2 },
    },
};

export interface TabContentProps extends ThemeProps<TabContentVariant> {
    children?: ReactNode;
}

export const TabContent: ForwardRefExoticComponent<TabContentProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabContentProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, children }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'tabContent', variants: TAB_CONTENT_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
        });

        return (
            <Box
                ref={ref}
                zIndex={10}
                layout={{
                    height: '100%',
                    overflow: 'hidden',
                    ...config.layout,
                    ...layout,
                }}
                {...handlers}
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

TabContent.displayName = 'TabContent';
