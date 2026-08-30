import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `GAMES` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutGAMESItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onGAMES?: () => void;
    srcIconsToolbarGames?: string;
    visibleBgGames?: boolean;
    visibleIconsToolbarGames?: boolean;
    visibleText?: boolean;
}

export const ToolbarViewLayoutGAMESItem = ({ captionText, context, layout, onGAMES, srcIconsToolbarGames, visibleBgGames, visibleIconsToolbarGames, visibleText }: ToolbarViewLayoutGAMESItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'room', 'hotel' ].includes(context)) && (
            <Region
                name="GAMES"
                onPointerTap={onGAMES}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                {(visibleBgGames ?? true) && (
                    <Border
                        variant="2"
                        name="bg_games"
                        tintColor="#57544d"
                        layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                    >
                        {(visibleIconsToolbarGames ?? true) && (
                            <ThemeImage
                                name="icons_toolbar_games"
                                src={srcIconsToolbarGames ?? layoutImage('icons_toolbar_games_normal.png')}
                                layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                            />
                        )}
                    </Border>
                )}
                {(visibleText ?? true) && (
                    <ThemeText
                        text={captionText ?? t('toolbar.icon.label.games')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="text"
                        layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17 }}
                    />
                )}
            </Region>
        )
    );
};
