import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `366_snowwar_team_scores_xml` (layout "snowwar_team_scores", 189x147) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarTeamScoresLayoutProps {
    captionScoreBlue?: string;
    captionScoreBlueStroke?: string;
    captionScoreRed?: string;
    captionScoreRedStroke?: string;
    layout?: BoxLayout;
    srcBackgroundImage?: string;
    strokeTextColor?: string;
    tintBackgroundImage?: string;
}

export const SnowwarTeamScoresLayout = ({ captionScoreBlue, captionScoreBlueStroke, captionScoreRed, captionScoreRedStroke, layout, srcBackgroundImage, strokeTextColor, tintBackgroundImage }: SnowwarTeamScoresLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 189, height: 147, ...layout }}>
            <Region layout={{ position: 'absolute', right: 0, width: 189, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="backgroundImage"
                    src={srcBackgroundImage ?? layoutImage('ui_timer_and_points.png')}
                    tint={tintBackgroundImage}
                    layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 147 }}
                />
                <Region layout={{ position: 'absolute', left: 29, width: 56, top: 44, height: 27 }}>
                    <Region
                        name="score_blue_stroke"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionScoreBlueStroke ?? '0'}
                            textOptions={{ fill: strokeTextColor ?? '#1077ac', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="score_blue"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionScoreBlue ?? '0'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region layout={{ position: 'absolute', left: 104, width: 56, top: 44, height: 27 }}>
                    <Region
                        name="score_red_stroke"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionScoreRedStroke ?? '0'}
                            textOptions={{ fill: '#fd6859', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="score_red"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionScoreRed ?? '0'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
