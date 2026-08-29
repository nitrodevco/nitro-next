import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Named region `statusContainer` of SnowwarEndingLayout - configured through the parent's `statusContainer` prop. */
export interface SnowwarEndingLayoutStatusContainerProps {
    captionGamesLeft?: string;
    captionGamesLeftStroke?: string;
    captionStatusTextGetMoreGames?: string;
    captionStatusTextGetVip?: string;
    layout?: BoxLayout;
    onStatusContainer?: () => void;
    visibleStatusTextGetMoreGames?: boolean;
}

export const SnowwarEndingLayoutStatusContainer = ({ captionGamesLeft, captionGamesLeftStroke, captionStatusTextGetMoreGames, captionStatusTextGetVip, layout, onStatusContainer, visibleStatusTextGetMoreGames }: SnowwarEndingLayoutStatusContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="statusContainer"
            onPointerTap={onStatusContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 293, width: 297, top: 321, height: 61, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', top: 0, flexDirection: 'row', gap: 5 }}>
                <Region layout={{ width: 127, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {t('snowwar.games_left')}
                </Region>
                <Region layout={{ width: 15, height: 26, flexShrink: 0 }}>
                    <Region
                        name="games_left_stroke"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionGamesLeftStroke ?? '3'}
                            textOptions={{ fill: '#1077ac' }}
                        />
                    </Region>
                    <Region
                        name="games_left"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionGamesLeft ?? '3'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Region>
            <Region
                name="status.text_get_vip"
                layout={{ position: 'absolute', width: 297, top: 27, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionStatusTextGetVip ?? t('snowwar.get_more_games')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            {(visibleStatusTextGetMoreGames ?? false) && (
                <Region
                    name="status.text_get_more_games"
                    layout={{ position: 'absolute', width: 297, top: 27, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionStatusTextGetMoreGames ?? t('snowwar.buy_x_games')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            )}
        </Region>
    );
};
