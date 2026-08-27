import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `418_snowwar_snowballs_xml` (layout "snowwar_snowballs", 57x260) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarSnowballsLayoutProps {
    layout?: BoxLayout;
    onMakeSnowball?: () => void;
    srcBackgroundImage?: string;
    srcBall0?: string;
    srcBall1?: string;
    srcBall2?: string;
    srcBall3?: string;
    srcBall4?: string;
    srcBallProgress?: string;
    srcEmptyFlashImage?: string;
    srcMakeSnowballImage?: string;
}

export const SnowwarSnowballsLayout = ({ layout, onMakeSnowball, srcBackgroundImage, srcBall0, srcBall1, srcBall2, srcBall3, srcBall4, srcBallProgress, srcEmptyFlashImage, srcMakeSnowballImage }: SnowwarSnowballsLayoutProps) => {
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
                        src={srcBackgroundImage ?? layoutImage('ui_ball_indicator_bg.png')}
                        layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 202 }}
                    />
                    <ThemeImage
                        name="ball_4"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcBall4 ?? layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 14, height: 30 }}
                    />
                    <ThemeImage
                        name="ball_3"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcBall3 ?? layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 50, height: 30 }}
                    />
                    <ThemeImage
                        name="ball_2"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcBall2 ?? layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 86, height: 30 }}
                    />
                    <ThemeImage
                        name="ball_1"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcBall1 ?? layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 122, height: 30 }}
                    />
                    <ThemeImage
                        name="ball_0"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcBall0 ?? layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 158, height: 30 }}
                    />
                    <ThemeImage
                        name="ballProgress"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcBallProgress}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 158, height: 30 }}
                    />
                    <ThemeImage
                        name="emptyFlashImage"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcEmptyFlashImage}
                        layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 202 }}
                    />
                </Region>
                <Region
                    name="make_snowball"
                    params={17}
                    backgroundColor="#000000"
                    onPointerTap={onMakeSnowball}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 57, top: 202, height: 58 }}
                >
                    <ThemeImage
                        name="makeSnowballImage"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcMakeSnowballImage ?? layoutImage('ui_make_balls_up.png')}
                        layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 58 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
