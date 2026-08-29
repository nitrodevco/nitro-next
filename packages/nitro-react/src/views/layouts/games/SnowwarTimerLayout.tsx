import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `426_snowwar_timer_xml` (layout "snowwar_timer", 100x46) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarTimerLayoutProps {
    captionTimeLeft?: string;
    captionTimeLeftStroke?: string;
    layout?: BoxLayout;
    visibleChecksumIndicator?: boolean;
}

export const SnowwarTimerLayout = ({ captionTimeLeft, captionTimeLeftStroke, layout, visibleChecksumIndicator }: SnowwarTimerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 46, ...layout }}>
            <Region layout={{ position: 'absolute', right: 0, width: 100, top: 0, height: 46 }}>
                <Region
                    visible={visibleChecksumIndicator ?? false}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                >
                    <Border
                        variant="0"
                        name="checksumIndicator"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="time_left_stroke"
                    tags={[ 'stroke' ]}
                    layout={{ position: 'absolute', left: 16, width: 80, top: 6, height: 31, minWidth: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTimeLeftStroke ?? '01:23'}
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <Region
                    name="time_left"
                    layout={{ position: 'absolute', left: 16, width: 80, top: 6, height: 31, minWidth: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTimeLeft ?? '01:23'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
