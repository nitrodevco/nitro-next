import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeProps, wrapTextChildren } from './utils';
import { DROPLIST_VARIANTS, DroplistVariant } from './variants/droplist';

export interface DroplistProps extends ThemeProps<DroplistVariant> {
    children?: ReactNode;
}

export const Droplist: ForwardRefExoticComponent<DroplistProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DroplistProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, visible, children }, ref) => {
        const { ownCascade, config, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'droplist', variants: DROPLIST_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
        });

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{ minWidth: 40, minHeight: 22, paddingLeft: 2, paddingRight: 2, ...config.layout, ...layout }}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                {config.arrowTextureKey && (
                    <BackgroundLayer
                        layer={Stretch(config.arrowTextureKey)}
                        layout={{
                            right: config.arrowRight,
                            top: config.arrowTop,
                            width: 16,
                            height: 16,
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
