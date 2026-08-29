import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `QUESTS` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutQUESTSItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onQUESTS?: () => void;
    srcIconsToolbarQuests?: string;
    visibleBgQuests?: boolean;
    visibleIconsToolbarQuests?: boolean;
    visibleText?: boolean;
}

export const ToolbarViewLayoutQUESTSItem = ({ captionText, context, layout, onQUESTS, srcIconsToolbarQuests, visibleBgQuests, visibleIconsToolbarQuests, visibleText }: ToolbarViewLayoutQUESTSItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'room' ].includes(context)) && (
            <Region
                name="QUESTS"
                onPointerTap={onQUESTS}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                {(visibleBgQuests ?? true) && (
                    <Border
                        variant="2"
                        name="bg_quests"
                        tintColor="#57544d"
                        layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                    >
                        {(visibleIconsToolbarQuests ?? true) && (
                            <ThemeImage
                                name="icons_toolbar_quests"
                                src={srcIconsToolbarQuests ?? layoutImage('icons_toolbar_quests_normal.png')}
                                layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                            />
                        )}
                    </Border>
                )}
                {(visibleText ?? true) && (
                    <Region
                        name="text"
                        layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionText ?? t('toolbar.icon.label.quests')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                )}
            </Region>
        )
    );
};
