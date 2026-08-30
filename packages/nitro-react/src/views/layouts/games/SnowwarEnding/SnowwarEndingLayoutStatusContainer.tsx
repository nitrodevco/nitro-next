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
                <ThemeText
                    text={t('snowwar.games_left')}
                    layout={{ width: 127, height: 18, flexShrink: 0 }}
                />
                <Region layout={{ width: 15, height: 26, flexShrink: 0 }}>
                    <ThemeText
                        text={captionGamesLeftStroke ?? '3'}
                        textOptions={{ fill: '#1077ac' }}
                        name="games_left_stroke"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                    <ThemeText
                        text={captionGamesLeft ?? '3'}
                        textOptions={{ fill: '#ffffff' }}
                        name="games_left"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                </Region>
            </Region>
            <ThemeText
                text={captionStatusTextGetVip ?? t('snowwar.get_more_games')}
                textOptions={{ align: 'center' }}
                name="status.text_get_vip"
                layout={{ position: 'absolute', width: 297, top: 27, height: 18 }}
            />
            {(visibleStatusTextGetMoreGames ?? false) && (
                <ThemeText
                    text={captionStatusTextGetMoreGames ?? t('snowwar.buy_x_games')}
                    textOptions={{ align: 'center' }}
                    name="status.text_get_more_games"
                    layout={{ position: 'absolute', width: 297, top: 27, height: 18 }}
                />
            )}
        </Region>
    );
};
