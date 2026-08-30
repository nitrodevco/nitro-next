import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2608_running_number_xml` (layout "running_number", 60x23) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RunningNumberLayoutProps {
    captionNumberField?: string;
    layout?: BoxLayout;
    srcLeft?: string;
    srcMiddle?: string;
    srcRight?: string;
}

export const RunningNumberLayout = ({ captionNumberField, layout, srcLeft, srcMiddle, srcRight }: RunningNumberLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 60, height: 23, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="left"
                    src={srcLeft ?? layoutImage('illumina_light_clock_background_left.png')}
                    layout={{ position: 'absolute', left: 0, width: 3, top: 0, height: 23 }}
                />
                <ThemeImage
                    name="middle"
                    src={srcMiddle ?? layoutImage('illumina_light_clock_background_mid.png')}
                    layout={{ position: 'absolute', left: 3, right: 3, top: 0, height: 23 }}
                />
                <ThemeImage
                    name="right"
                    src={srcRight ?? layoutImage('illumina_light_clock_background_right.png')}
                    layout={{ position: 'absolute', right: 0, width: 3, top: 0, height: 23 }}
                />
                <ThemeText
                    text={captionNumberField ?? ''}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                    name="number_field"
                    layout={{ position: 'absolute', left: 0, top: 3, height: 4, minWidth: 60 }}
                />
            </Region>
        </Region>
    );
};
