import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2434_clock_base_xml` (layout "clock_base", 36x37) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClockBaseLayoutProps {
    layout?: BoxLayout;
}

export const ClockBaseLayout = ({ layout }: ClockBaseLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 36, height: 37, ...layout }}>
            <Region
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 37, flexDirection: 'row' }}
            >
                <Region
                    name="counter"
                    params={16}
                    layout={{ width: 27, height: 37, flexShrink: 0 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('illumina_light_clock_background.png')}
                        layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 23 }}
                    />
                    <Region
                        name="value"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 27, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="00"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="unit"
                        tags={[ 'COLORABLE' ]}
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 27, top: 23, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="hrs"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="separator"
                    tags={[ 'COLORABLE' ]}
                    params={16}
                    layout={{ width: 9, height: 20, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text=":" />
                </Region>
            </Region>
        </Region>
    );
};
