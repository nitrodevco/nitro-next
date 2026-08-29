import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `383_snowwar_own_stats_xml` (layout "snowwar_own_stats", 171x73) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarOwnStatsLayoutProps {
    captionPersonalScore?: string;
    captionPersonalScoreStroke?: string;
    layout?: BoxLayout;
    srcBackgroundFlashImage?: string;
    srcBackgroundImage?: string;
    srcEnergyBar?: string;
    srcUserImage?: string;
}

export const SnowwarOwnStatsLayout = ({ captionPersonalScore, captionPersonalScoreStroke, layout, srcBackgroundFlashImage, srcBackgroundImage, srcEnergyBar, srcUserImage }: SnowwarOwnStatsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 171, height: 73, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 171, bottom: 0, height: 73 }}>
                <ThemeImage
                    name="backgroundImage"
                    tags={[ 'bitmap' ]}
                    src={srcBackgroundImage ?? layoutImage('ui_me_bg.png')}
                    layout={{ position: 'absolute', left: 0, width: 171, top: 0, height: 73 }}
                />
                <ThemeImage
                    name="energy_bar"
                    tags={[ 'bitmap' ]}
                    src={srcEnergyBar ?? layoutImage('ui_me_health_5.png')}
                    layout={{ position: 'absolute', left: 73, width: 8, top: 14, height: 46 }}
                />
                <ThemeImage
                    name="backgroundFlashImage"
                    tags={[ 'bitmap' ]}
                    src={srcBackgroundFlashImage}
                    layout={{ position: 'absolute', left: 100, width: 57, top: 8, height: 57 }}
                />
                <ThemeImage
                    name="user_image"
                    src={srcUserImage}
                    layout={{ position: 'absolute', left: 0, width: 73, top: 0, height: 73 }}
                />
                <Region
                    name="personal_score_stroke"
                    tags={[ 'stroke' ]}
                    layout={{ position: 'absolute', left: 101, width: 55, top: 20, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionPersonalScoreStroke ?? '99'}
                        textOptions={{ fill: '#1077ac', align: 'center' }}
                    />
                </Region>
                <Region
                    name="personal_score"
                    layout={{ position: 'absolute', left: 101, width: 55, top: 20, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionPersonalScore ?? '99'}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
