import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `424_snowwar_loading_background_xml` (layout "snowwar_loading_background", 1153x553) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLoadingBackgroundLayoutProps {
    layout?: BoxLayout;
    srcSky?: string;
    srcSunshine?: string;
    srcVista1?: string;
    srcVista2?: string;
    srcVista3?: string;
}

export const SnowwarLoadingBackgroundLayout = ({ layout, srcSky, srcSunshine, srcVista1, srcVista2, srcVista3 }: SnowwarLoadingBackgroundLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1153, height: 553, ...layout }}>
            <Region
                backgroundColor="#eefafc"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="sky"
                    src={srcSky ?? layoutImage('bg_sky.png')}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 158 }}
                />
                <ThemeImage
                    name="sunshine"
                    src={srcSunshine ?? layoutImage('bg_sunshine.png')}
                    layout={{ position: 'absolute', width: 569, top: 0, height: 144 }}
                />
                <ThemeImage
                    name="vista_1"
                    src={srcVista1 ?? layoutImage('bg_vista_1.png')}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 90, height: 133 }}
                />
                <ThemeImage
                    name="vista_2"
                    src={srcVista2 ?? layoutImage('bg_vista_2.png')}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 125, height: 187 }}
                />
                <ThemeImage
                    name="vista_3"
                    src={srcVista3 ?? layoutImage('bg_vista_3.png')}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 163, height: 274 }}
                />
            </Region>
        </Region>
    );
};
