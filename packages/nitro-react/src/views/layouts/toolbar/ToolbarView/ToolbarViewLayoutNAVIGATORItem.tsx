import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `NAVIGATOR` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutNAVIGATORItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onNAVIGATOR?: () => void;
    srcIconsToolbarNavigator?: string;
    visibleBgNavigator?: boolean;
    visibleIconsToolbarNavigator?: boolean;
    visibleText?: boolean;
}

export const ToolbarViewLayoutNAVIGATORItem = ({ captionText, context, layout, onNAVIGATOR, srcIconsToolbarNavigator, visibleBgNavigator, visibleIconsToolbarNavigator, visibleText }: ToolbarViewLayoutNAVIGATORItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'hotel', 'room', 'gameCenter' ].includes(context)) && (
            <Region
                name="NAVIGATOR"
                onPointerTap={onNAVIGATOR}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                {(visibleBgNavigator ?? true) && (
                    <Border
                        variant="2"
                        name="bg_navigator"
                        tintColor="#57544d"
                        layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                    >
                        {(visibleIconsToolbarNavigator ?? true) && (
                            <ThemeImage
                                name="icons_toolbar_navigator"
                                src={srcIconsToolbarNavigator ?? layoutImage('icons_toolbar_navigator_normal.png')}
                                layout={{ position: 'absolute', width: 60, top: -2, height: 60 }}
                            />
                        )}
                    </Border>
                )}
                {(visibleText ?? true) && (
                    <ThemeText
                        text={captionText ?? t('toolbar.icon.label.navigator')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="text"
                        layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17 }}
                    />
                )}
            </Region>
        )
    );
};
