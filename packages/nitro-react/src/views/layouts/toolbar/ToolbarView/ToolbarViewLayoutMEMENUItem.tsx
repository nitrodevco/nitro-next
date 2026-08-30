import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `MEMENU` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutMEMENUItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onMEMENU?: () => void;
    srcGuideIcon?: string;
    srcIconMeMenu?: string;
    tintIconMeMenu?: string;
    visibleBgMemenu?: boolean;
    visibleGuideIcon?: boolean;
    visibleIconMeMenu?: boolean;
    visibleText?: boolean;
}

export const ToolbarViewLayoutMEMENUItem = ({ captionText, context, layout, onMEMENU, srcGuideIcon, srcIconMeMenu, tintIconMeMenu, visibleBgMemenu, visibleGuideIcon, visibleIconMeMenu, visibleText }: ToolbarViewLayoutMEMENUItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'room', 'hotel', 'gameCenter' ].includes(context)) && (
            <Region
                name="MEMENU"
                onPointerTap={onMEMENU}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                {(visibleBgMemenu ?? true) && (
                    <Border
                        variant="2"
                        name="bg_memenu"
                        tintColor="#57544d"
                        layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                    >
                        {(visibleIconMeMenu ?? true) && (
                            <ThemeImage
                                name="icon_me_menu"
                                src={srcIconMeMenu}
                                tint={tintIconMeMenu}
                                layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                            />
                        )}
                    </Border>
                )}
                {(visibleText ?? true) && (
                    <ThemeText
                        text={captionText ?? t('toolbar.icon.label.memenu')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="text"
                        layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17 }}
                    />
                )}
                {(visibleGuideIcon ?? false) && (
                    <ThemeImage
                        name="guide_icon"
                        src={srcGuideIcon ?? layoutImage('help_guide_icon.png')}
                        layout={{ position: 'absolute', left: 60, width: 13, top: 38, height: 26 }}
                    />
                )}
            </Region>
        )
    );
};
