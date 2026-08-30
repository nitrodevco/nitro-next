import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { GamesMainLayoutGamesLeftRegion, GamesMainLayoutGamesLeftRegionProps } from './GamesMainLayoutGamesLeftRegion';

/** Named region `footer_container` of GamesMainLayout - configured through the parent's `footerContainer` prop. */
export interface GamesMainLayoutFooterContainerProps {
    captionGamesLobbyGetVip?: string;
    captionPlayText?: string;
    gamesLeftRegion?: GamesMainLayoutGamesLeftRegionProps;
    layout?: BoxLayout;
    onGamesVipRegion?: () => void;
    onPlayButton?: () => void;
    srcHcIcon?: string;
    tintHcIcon?: string;
}

export const GamesMainLayoutFooterContainer = ({ captionGamesLobbyGetVip, captionPlayText, gamesLeftRegion, layout, onGamesVipRegion, onPlayButton, srcHcIcon, tintHcIcon }: GamesMainLayoutFooterContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="footer_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 364, height: 124, ...layout }}
        >
            <GamesMainLayoutGamesLeftRegion {...gamesLeftRegion} />
            <Region
                name="games_vip_region"
                onPointerTap={onGamesVipRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 202, width: 187, top: -2, height: 44, maxWidth: 200 }}
            >
                <ThemeImage
                    name="hc_icon"
                    src={srcHcIcon ?? layoutImage('hc_icon.png')}
                    tint={tintHcIcon}
                    layout={{ position: 'absolute', left: 0, width: 24, top: 6, height: 24 }}
                />
                <ThemeText
                    text={captionGamesLobbyGetVip ?? t('snowwar.get_more_games')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 158 }}
                    name="games.lobby.get.vip"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 31, width: 158, top: 2, height: 35, maxWidth: 200 }}
                />
            </Region>
            <ContainerButton
                variant="3"
                name="play.button"
                tintColor="#55cc00"
                onPointerTap={onPlayButton}
                layout={{ position: 'absolute', right: 13, width: 190, top: 64, height: 50, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPlayText ?? t('snowwar.play')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </ContainerButton>
        </Region>
    );
};
