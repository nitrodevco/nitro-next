import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `418_snowwar_snowballs_xml` (layout "snowwar_snowballs", 57x260) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarSnowballsLayoutProps {
    layout?: BoxLayout;
}

export const SnowwarSnowballsLayout = ({ layout }: SnowwarSnowballsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 57, height: 260, ...layout }}>
            <Region
                params={3072}
                layout={{ position: 'absolute', left: 0, width: 57, top: 83, height: 260 }}
            >
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 202 }}
                >
                    <ThemeImage
                        name="backgroundImage"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('ui_ball_indicator_bg.png')}
                        layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 202 }}
                    />
                    <ThemeImage
                        name="ball_4"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 14, height: 30 }}
                    />
                    <ThemeImage
                        name="ball_3"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 50, height: 30 }}
                    />
                    <ThemeImage
                        name="ball_2"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 86, height: 30 }}
                    />
                    <ThemeImage
                        name="ball_1"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 122, height: 30 }}
                    />
                    <ThemeImage
                        name="ball_0"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 158, height: 30 }}
                    />
                    <ThemeImage
                        name="ballProgress"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 158, height: 30 }}
                    />
                    <ThemeImage
                        name="emptyFlashImage"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 202 }}
                    />
                </Region>
                <Region
                    name="make_snowball"
                    params={17}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 57, top: 202, height: 58 }}
                >
                    <ThemeImage
                        name="makeSnowballImage"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('ui_make_balls_up.png')}
                        layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 58 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
