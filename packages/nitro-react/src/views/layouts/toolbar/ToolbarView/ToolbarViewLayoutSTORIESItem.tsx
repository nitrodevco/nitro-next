import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `STORIES` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutSTORIESItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onSTORIES?: () => void;
    srcIconsToolbarStories?: string;
    visibleBgStories?: boolean;
    visibleIconsToolbarStories?: boolean;
    visibleText?: boolean;
}

export const ToolbarViewLayoutSTORIESItem = ({ captionText, context, layout, onSTORIES, srcIconsToolbarStories, visibleBgStories, visibleIconsToolbarStories, visibleText }: ToolbarViewLayoutSTORIESItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'hotel' ].includes(context)) && (
            <Region
                name="STORIES"
                onPointerTap={onSTORIES}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                {(visibleBgStories ?? true) && (
                    <Border
                        variant="2"
                        name="bg_stories"
                        tintColor="#57544d"
                        layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                    >
                        {(visibleIconsToolbarStories ?? true) && (
                            <ThemeImage
                                name="icons_toolbar_stories"
                                src={srcIconsToolbarStories ?? layoutImage('icons_toolbar_stories_normal.png')}
                                layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                            />
                        )}
                    </Border>
                )}
                {(visibleText ?? true) && (
                    <ThemeText
                        text={captionText ?? t('toolbar.icon.label.stories')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="text"
                        layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17 }}
                    />
                )}
            </Region>
        )
    );
};
