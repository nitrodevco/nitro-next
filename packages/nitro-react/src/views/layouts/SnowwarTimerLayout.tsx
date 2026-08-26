import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `426_snowwar_timer_xml` (layout "snowwar_timer", 100x46) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarTimerLayoutProps {
    layout?: BoxLayout;
}

export const SnowwarTimerLayout = ({ layout }: SnowwarTimerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 46, ...layout }}>
            <Region
                params={64}
                layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 46 }}
            >
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                >
                    <Border
                        variant="0"
                        name="checksumIndicator"
                        params={16}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="time_left_stroke"
                    tags={[ 'stroke' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 16, width: 80, top: 6, height: 31, minWidth: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="01:23"
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <Region
                    name="time_left"
                    params={16}
                    layout={{ position: 'absolute', left: 16, width: 80, top: 6, height: 31, minWidth: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="01:23"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
