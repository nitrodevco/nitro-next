import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `424_snowwar_loading_background_xml` (layout "snowwar_loading_background", 1153x553) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLoadingBackgroundLayoutProps {
    layout?: BoxLayout;
}

export const SnowwarLoadingBackgroundLayout = ({ layout }: SnowwarLoadingBackgroundLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1153, height: 553, ...layout }}>
            <Region
                params={2176}
                backgroundColor="#eefafc"
                layout={{ position: 'absolute', left: 0, width: 1153, top: 0, height: 553 }}
            >
                <ThemeImage
                    name="sky"
                    tags={[ 'bitmap' ]}
                    params={144}
                    src={layoutImage('bg_sky.png')}
                    layout={{ position: 'absolute', left: 0, width: 1153, top: 0, height: 158 }}
                />
                <ThemeImage
                    name="sunshine"
                    tags={[ 'bitmap' ]}
                    params={208}
                    src={layoutImage('bg_sunshine.png')}
                    layout={{ position: 'absolute', left: 292, width: 569, top: 0, height: 144 }}
                />
                <ThemeImage
                    name="vista_1"
                    tags={[ 'bitmap' ]}
                    params={144}
                    src={layoutImage('bg_vista_1.png')}
                    layout={{ position: 'absolute', left: 0, width: 1153, top: 90, height: 133 }}
                />
                <ThemeImage
                    name="vista_2"
                    tags={[ 'bitmap' ]}
                    params={144}
                    src={layoutImage('bg_vista_2.png')}
                    layout={{ position: 'absolute', left: 0, width: 1153, top: 125, height: 187 }}
                />
                <ThemeImage
                    name="vista_3"
                    tags={[ 'bitmap' ]}
                    params={144}
                    src={layoutImage('bg_vista_3.png')}
                    layout={{ position: 'absolute', left: 0, width: 1153, top: 163, height: 274 }}
                />
            </Region>
        </Region>
    );
};
