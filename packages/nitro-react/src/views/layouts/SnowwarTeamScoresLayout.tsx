import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `366_snowwar_team_scores_xml` (layout "snowwar_team_scores", 189x147) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarTeamScoresLayoutProps {
    layout?: BoxLayout;
}

export const SnowwarTeamScoresLayout = ({ layout }: SnowwarTeamScoresLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 189, height: 147, ...layout }}>
            <Region
                params={64}
                layout={{ position: 'absolute', left: 0, width: 189, top: 0, height: 147 }}
            >
                <ThemeImage
                    name="backgroundImage"
                    tags={[ 'bitmap' ]}
                    params={16}
                    src={layoutImage('ui_timer_and_points.png')}
                    layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 147 }}
                />
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 29, width: 56, top: 44, height: 27 }}
                >
                    <Region
                        name="score_blue_stroke"
                        tags={[ 'stroke' ]}
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 56, top: 0, height: 27, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="0"
                            textOptions={{ fill: '#1077ac', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="score_blue"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 56, top: 0, height: 26, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="0"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 104, width: 56, top: 44, height: 27 }}
                >
                    <Region
                        name="score_red_stroke"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 56, top: 0, height: 27, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="0"
                            textOptions={{ fill: '#fd6859', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="score_red"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 56, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="0"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
