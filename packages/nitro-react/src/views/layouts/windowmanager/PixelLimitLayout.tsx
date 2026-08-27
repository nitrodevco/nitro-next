import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1967_pixel_limit_xml` (layout "pixelLimitWidget", 73x163) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PixelLimitLayoutProps {
    layout?: BoxLayout;
    srcMeter?: string;
}

export const PixelLimitLayout = ({ layout, srcMeter }: PixelLimitLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 73, height: 163, ...layout }}>
            <ThemeImage
                name="meter"
                params={16}
                src={srcMeter ?? '${image.library.url}reception/challenge_meter_20.png'}
                layout={{ position: 'absolute', left: 0, width: 73, top: 0, height: 163 }}
            />
        </Region>
    );
};
