import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

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
    // `border-image-slice: 15 0 2 0 fill` / `border-image-width: 15px 0px 0px 0px` for this
    // variant, matching the attached original Habbo skin XML's `top`(14x15)/`btm`(14x4) region
    // split. bottomHeight here dropped to 0 during the Pixi port, pulling the nine-slice's
    // stretched "fill" region 2px further into the source texture than intended (rows 15-19
    // instead of 15-17); the zero `borderWidth.bottom` override (DOM-only, see
    // BackgroundLayerConfig.ts's `NineSliceBorderWidth` docblock) means those trimmed 2px are
    // never themselves drawn as a visible border band, matching the original slice-without-a-
    // band technique - Pixi can't replicate that half, only the trimmed-fill half.
    3: {
        layer: NineSlice('tabcontent-3-default-src', 0, 15, 0, 2, { bottom: 0 }),
        layout: { paddingTop: 6, paddingLeft: 5, paddingRight: 5, paddingBottom: 2, marginTop: 1 },
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
