import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `games_left_region` of GamesMainLayout - configured through the parent's `gamesLeftRegion` prop. */
export interface GamesMainLayoutGamesLeftRegionProps {
    captionGamesLeft?: string;
    captionGamesLeftStroke?: string;
    captionGamesLobbyGetGames?: string;
    layout?: BoxLayout;
    onGamesLeftRegion?: () => void;
    srcBtnMoreGames10?: string;
    srcBtnMoreGames100?: string;
    srcBtnMoreGames300?: string;
    tintBtnMoreGames10?: string;
    tintBtnMoreGames100?: string;
    tintBtnMoreGames300?: string;
}

export const GamesMainLayoutGamesLeftRegion = ({ captionGamesLeft, captionGamesLeftStroke, captionGamesLobbyGetGames, layout, onGamesLeftRegion, srcBtnMoreGames10, srcBtnMoreGames100, srcBtnMoreGames300, tintBtnMoreGames10, tintBtnMoreGames100, tintBtnMoreGames300 }: GamesMainLayoutGamesLeftRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="games_left_region"
            onPointerTap={onGamesLeftRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 11, width: 229, top: 0, height: 121, ...layout }}
        >
            <Region
                backgroundColor="#b9e2ec"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 28, flexDirection: 'row', gap: 5 }}
            >
                <ThemeText
                    text={t('snowwar.games_left')}
                    layout={{ width: 135, height: 19, flexShrink: 0 }}
                />
                <Region layout={{ width: 60, height: 30, flexShrink: 0 }}>
                    <ThemeText
                        text={captionGamesLeftStroke ?? '0'}
                        textOptions={{ fill: '#1077ac' }}
                        name="games_left_stroke"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 26 }}
                    />
                    <ThemeText
                        text={captionGamesLeft ?? '0'}
                        textOptions={{ fill: '#ffffff' }}
                        name="games_left"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 26 }}
                    />
                </Region>
            </Region>
            <ThemeText
                text={captionGamesLobbyGetGames ?? t('snowwar.buy_more_games')}
                name="games.lobby.get.games"
                layout={{ position: 'absolute', left: 0, width: 175, top: 31, height: 19 }}
            />
            <Region layout={{ position: 'absolute', left: 0, width: 220, top: 52, height: 70, flexDirection: 'row', gap: 8 }}>
                <ThemeImage
                    name="btn_more_games_10"
                    src={srcBtnMoreGames10 ?? layoutImage('btn_more_games_10.png')}
                    tint={tintBtnMoreGames10}
                    layout={{ width: 52, height: 62, flexShrink: 0 }}
                />
                <ThemeImage
                    name="btn_more_games_100"
                    src={srcBtnMoreGames100 ?? layoutImage('btn_more_games_100.png')}
                    tint={tintBtnMoreGames100}
                    layout={{ width: 52, height: 62, flexShrink: 0 }}
                />
                <ThemeImage
                    name="btn_more_games_300"
                    src={srcBtnMoreGames300 ?? layoutImage('btn_more_games_300.png')}
                    tint={tintBtnMoreGames300}
                    layout={{ width: 52, height: 62, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};
