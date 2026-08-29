import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { SnowwarResultsPlayerTeam2LayoutPlayerDataContainer, SnowwarResultsPlayerTeam2LayoutPlayerDataContainerProps } from './SnowwarResultsPlayerTeam2LayoutPlayerDataContainer';

/** Generated from `335_snowwar_results_player_team_2_xml` (layout "snowwar_results_player_team_2", 289x62) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarResultsPlayerTeam2LayoutProps {
    captionPlayerScore?: string;
    captionPlayerScoreStroke?: string;
    layout?: BoxLayout;
    onAddFriend?: () => void;
    playerDataContainer?: SnowwarResultsPlayerTeam2LayoutPlayerDataContainerProps;
    srcLoadingIcon?: string;
    srcPlayerImage?: string;
    srcPlayerImageBackground?: string;
    srcPlayerScoreBackground?: string;
    srcPlayerScoreGlow?: string;
    strokeTextColor?: string;
    tintLoadingIcon?: string;
    tintPlayerImage?: string;
    tintPlayerImageBackground?: string;
    tintPlayerScoreBackground?: string;
    tintPlayerScoreGlow?: string;
    visibleAddFriend?: boolean;
    visibleLoadingIcon?: boolean;
}

export const SnowwarResultsPlayerTeam2Layout = ({ captionPlayerScore, captionPlayerScoreStroke, layout, onAddFriend, playerDataContainer, srcLoadingIcon, srcPlayerImage, srcPlayerImageBackground, srcPlayerScoreBackground, srcPlayerScoreGlow, strokeTextColor, tintLoadingIcon, tintPlayerImage, tintPlayerImageBackground, tintPlayerScoreBackground, tintPlayerScoreGlow, visibleAddFriend, visibleLoadingIcon }: SnowwarResultsPlayerTeam2LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 289, height: 62, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row' }}>
                <Region
                    name="playerScoreContainer"
                    layout={{ width: 61, height: 62, flexShrink: 0, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="playerScoreBackground"
                        src={srcPlayerScoreBackground ?? layoutImage('red_ball.png')}
                        tint={tintPlayerScoreBackground}
                        layout={{ position: 'absolute', left: 0, width: 59, top: 0, height: 59 }}
                    />
                    <ThemeImage
                        name="playerScoreGlow"
                        src={srcPlayerScoreGlow}
                        tint={tintPlayerScoreGlow}
                        layout={{ position: 'absolute', left: 0, width: 61, top: 0, height: 62 }}
                    />
                    <Region
                        name="playerScore_stroke"
                        layout={{ position: 'absolute', left: 0, width: 60, top: 17, height: 24, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPlayerScoreStroke ?? '102'}
                            textOptions={{ fill: strokeTextColor ?? '#fd6859', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="playerScore"
                        layout={{ position: 'absolute', left: 0, width: 60, top: 17, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPlayerScore ?? '102'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    {(visibleLoadingIcon ?? false) && (
                        <ThemeImage
                            name="loadingIcon"
                            src={srcLoadingIcon}
                            tint={tintLoadingIcon}
                            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 50, top: 5, height: 50 }}
                        />
                    )}
                </Region>
                <SnowwarResultsPlayerTeam2LayoutPlayerDataContainer {...playerDataContainer} />
                <Region
                    name="playerImageContainer"
                    layout={{ width: 64, height: 62, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="playerImageBackground"
                        src={srcPlayerImageBackground ?? layoutImage('red_square.png')}
                        tint={tintPlayerImageBackground}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
                    />
                    <ThemeImage
                        name="playerImage"
                        src={srcPlayerImage}
                        tint={tintPlayerImage}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
                    />
                    {(visibleAddFriend ?? false) && (
                        <Region
                            name="addFriend"
                            tooltip={t('snowwar.add_friend.tooltip')}
                            onPointerTap={onAddFriend}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        >
                            <ThemeImage
                                src={layoutImage('add_friend_icon_red.png')}
                                layout={{ position: 'absolute', left: 41, width: 20, top: 3, height: 20 }}
                            />
                        </Region>
                    )}
                </Region>
            </Region>
        </Region>
    );
};
