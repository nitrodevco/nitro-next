import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2608_running_number_xml` (layout "running_number", 60x23) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RunningNumberLayoutProps {
    layout?: BoxLayout;
}

export const RunningNumberLayout = ({ layout }: RunningNumberLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 60, height: 23, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 23 }}
            >
                <ThemeImage
                    name="left"
                    params={16}
                    src={layoutImage('illumina_light_clock_background_left.png')}
                    layout={{ position: 'absolute', left: 0, width: 3, top: 0, height: 23 }}
                />
                <ThemeImage
                    name="middle"
                    params={144}
                    src={layoutImage('illumina_light_clock_background_mid.png')}
                    layout={{ position: 'absolute', left: 3, width: 54, top: 0, height: 23 }}
                />
                <ThemeImage
                    name="right"
                    params={262224}
                    src={layoutImage('illumina_light_clock_background_right.png')}
                    layout={{ position: 'absolute', left: 57, width: 3, top: 0, height: 23 }}
                />
                <Region
                    name="number_field"
                    params={4194320}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 3, height: 4, minWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                />
            </Region>
        </Region>
    );
};
