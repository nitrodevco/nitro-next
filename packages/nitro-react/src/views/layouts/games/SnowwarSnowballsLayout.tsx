import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `418_snowwar_snowballs_xml` (layout "snowwar_snowballs", 57x260) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarSnowballsLayoutProps {
    layout?: BoxLayout;
    makeSnowball?: SnowwarSnowballsLayoutMakeSnowballProps;
    srcBackgroundImage?: string;
    srcBall0?: string;
    srcBall1?: string;
    srcBall2?: string;
    srcBall3?: string;
    srcBall4?: string;
    srcBallProgress?: string;
    srcEmptyFlashImage?: string;
}

export const SnowwarSnowballsLayout = ({ layout, makeSnowball, srcBackgroundImage, srcBall0, srcBall1, srcBall2, srcBall3, srcBall4, srcBallProgress, srcEmptyFlashImage }: SnowwarSnowballsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 57, height: 260, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 57, alignSelf: 'center', marginTop: 83, marginBottom: -83, height: 260 }}>
                <Region layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 202 }}>
                    <ThemeImage
                        name="backgroundImage"
                        tags={[ 'bitmap' ]}
                        src={srcBackgroundImage ?? layoutImage('ui_ball_indicator_bg.png')}
                        layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 202 }}
                    />
                    <ThemeImage
                        name="ball_4"
                        tags={[ 'bitmap' ]}
                        src={srcBall4 ?? layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 14, height: 30 }}
                    />
                    <ThemeImage
                        name="ball_3"
                        tags={[ 'bitmap' ]}
                        src={srcBall3 ?? layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 50, height: 30 }}
                    />
                    <ThemeImage
                        name="ball_2"
                        tags={[ 'bitmap' ]}
                        src={srcBall2 ?? layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 86, height: 30 }}
                    />
                    <ThemeImage
                        name="ball_1"
                        tags={[ 'bitmap' ]}
                        src={srcBall1 ?? layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 122, height: 30 }}
                    />
                    <ThemeImage
                        name="ball_0"
                        tags={[ 'bitmap' ]}
                        src={srcBall0 ?? layoutImage('ui_ball.png')}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 158, height: 30 }}
                    />
                    <ThemeImage
                        name="ballProgress"
                        tags={[ 'bitmap' ]}
                        src={srcBallProgress}
                        layout={{ position: 'absolute', left: 14, width: 30, top: 158, height: 30 }}
                    />
                    <ThemeImage
                        name="emptyFlashImage"
                        tags={[ 'bitmap' ]}
                        src={srcEmptyFlashImage}
                        layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 202 }}
                    />
                </Region>
                <SnowwarSnowballsLayoutMakeSnowball {...makeSnowball} />
            </Region>
        </Region>
    );
};

/** Named region `make_snowball` of SnowwarSnowballsLayout - configured through the parent's `makeSnowball` prop. */
export interface SnowwarSnowballsLayoutMakeSnowballProps {
    layout?: BoxLayout;
    onMakeSnowball?: () => void;
    srcMakeSnowballImage?: string;
    tags?: string[];
}

export const SnowwarSnowballsLayoutMakeSnowball = ({ layout, onMakeSnowball, srcMakeSnowballImage, tags }: SnowwarSnowballsLayoutMakeSnowballProps) => {
    return (
        <Region
            name="make_snowball"
            tags={tags}
            backgroundColor="#000000"
            onPointerTap={onMakeSnowball}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 57, top: 202, height: 58, ...layout }}
        >
            <ThemeImage
                name="makeSnowballImage"
                tags={[ 'bitmap' ]}
                src={srcMakeSnowballImage ?? layoutImage('ui_make_balls_up.png')}
                layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 58 }}
            />
        </Region>
    );
};
