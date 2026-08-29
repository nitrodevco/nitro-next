import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { GamesMainLayoutQuickPlayContainer, GamesMainLayoutQuickPlayContainerProps } from './GamesMainLayoutQuickPlayContainer';

/** Generated from `334_games_main_xml` (layout "games_main", 413x530) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GamesMainLayoutProps {
    captionCancelLink?: string;
    captionWaitText?: string;
    captionWaitTextStroke?: string;
    itemsPlayersGrid?: ReactNode;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    onClose?: () => void;
    quickPlayContainer?: GamesMainLayoutQuickPlayContainerProps;
    srcQuickPlayBackground?: string;
    tintQuickPlayBackground?: string;
    visibleSnowwarLobbyCont?: boolean;
}

export const GamesMainLayout = ({ captionCancelLink, captionWaitText, captionWaitTextStroke, itemsPlayersGrid, layout, onCancelLinkRegion, onClose, quickPlayContainer, srcQuickPlayBackground, tintQuickPlayBackground, visibleSnowwarLobbyCont }: GamesMainLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('games.main.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 413, height: 530, minWidth: 413, minHeight: 530, ...layout }}
        >
            <ThemeImage
                name="quick_play_background"
                src={srcQuickPlayBackground ?? layoutImage('quick_play_background.png')}
                tint={tintQuickPlayBackground}
                layout={{ position: 'absolute', left: 0, width: 407, top: 0, height: 355 }}
            />
            <GamesMainLayoutQuickPlayContainer {...quickPlayContainer} />
            {(visibleSnowwarLobbyCont ?? false) && (
                <Region
                    name="snowwar_lobby_cont"
                    layout={{ position: 'absolute', left: 0, right: -6, top: 0, height: 436 }}
                >
                    <Region
                        name="wait_text_stroke"
                        layout={{ position: 'absolute', left: 40, width: 335, top: 118, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionWaitTextStroke ?? 'Waiting for players...'}
                            textOptions={{ fill: '#1077ac', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="wait_text"
                        layout={{ position: 'absolute', left: 40, width: 335, top: 118, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionWaitText ?? 'Waiting for players...'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="players_grid"
                        layout={{ position: 'absolute', left: 40, width: 335, top: 178, height: 130, flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}
                    >
                        {itemsPlayersGrid}
                    </Region>
                    <Region
                        name="cancel_link_region"
                        onPointerTap={onCancelLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 178, width: 63, top: 385, height: 23 }}
                    >
                        <Region
                            name="cancel_link"
                            layout={{ position: 'absolute', left: 0, width: 83, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionCancelLink ?? t('generic.cancel')}
                        </Region>
                    </Region>
                </Region>
            )}
        </Frame>
    );
};
