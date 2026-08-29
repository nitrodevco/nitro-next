import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2434_clock_base_xml` (layout "clock_base", 36x37) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClockBaseLayoutProps {
    captionSeparator?: string;
    captionUnit?: string;
    captionValue?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const ClockBaseLayout = ({ captionSeparator, captionUnit, captionValue, colorableTextColor, layout }: ClockBaseLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 36, height: 37, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row' }}>
                <Region
                    name="counter"
                    layout={{ width: 27, alignSelf: 'stretch', flexShrink: 0 }}
                >
                    <ThemeImage
                        src={layoutImage('illumina_light_clock_background.png')}
                        layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 23 }}
                    />
                    <Region
                        name="value"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionValue ?? '00'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="unit"
                        layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionUnit ?? 'hrs'}
                            textOptions={{ fill: colorableTextColor, align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="separator"
                    layout={{ width: 9, height: 20, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSeparator ?? ':'}
                        textOptions={{ fill: colorableTextColor }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
