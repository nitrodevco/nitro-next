import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2434_clock_base_xml` (layout "clock_base", 36x37) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClockBaseLayoutProps {
    captionSeparator?: string;
    counter?: ClockBaseLayoutCounterProps;
    layout?: BoxLayout;
}

export const ClockBaseLayout = ({ captionSeparator, counter, layout }: ClockBaseLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 36, height: 37, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row' }}>
                <ClockBaseLayoutCounter {...counter} />
                <Region
                    name="separator"
                    tags={[ 'COLORABLE' ]}
                    layout={{ width: 9, height: 20, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionSeparator ?? ':'} />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `counter` of ClockBaseLayout - configured through the parent's `counter` prop. */
export interface ClockBaseLayoutCounterProps {
    captionUnit?: string;
    captionValue?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ClockBaseLayoutCounter = ({ captionUnit, captionValue, layout, tags }: ClockBaseLayoutCounterProps) => {
    return (
        <Region
            name="counter"
            tags={tags}
            layout={{ width: 27, height: 37, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('illumina_light_clock_background.png')}
                layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 23 }}
            />
            <Region
                name="value"
                layout={{ position: 'absolute', left: 0, width: 27, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionValue ?? '00'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <Region
                name="unit"
                tags={[ 'COLORABLE' ]}
                layout={{ position: 'absolute', left: 0, width: 27, top: 23, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionUnit ?? 'hrs'}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};
