import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `2992_club_gift_notification_xml` (layout "achievement_notification", 192x82) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubGiftNotificationLayoutProps {
    captionCancelLink?: string;
    captionInfoText?: string;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    onOpenCatalogButton?: () => void;
}

export const ClubGiftNotificationLayout = ({ captionCancelLink, captionInfoText, layout, onCancelLinkRegion, onOpenCatalogButton }: ClubGiftNotificationLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 82, ...layout }}>
            <Border
                variant="9"
                tintColor="#686661"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 82 }}
            >
                <Icon
                    variant="14"
                    name="club_icon"
                    layout={{ position: 'absolute', left: 6, width: 16, top: 7, height: 16 }}
                />
                <Region
                    name="info_text"
                    layout={{ position: 'absolute', left: 25, width: 174, top: 7, height: 36, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoText ?? t('notifications.text.club_gift')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 174 }}
                    />
                </Region>
                <Button
                    variant="4"
                    name="open_catalog_button"
                    onPointerTap={onOpenCatalogButton}
                    layout={{ position: 'absolute', right: 8, width: 216, top: 44, height: 28 }}
                >
                    {t('notifications.button.show_gift_list')}
                </Button>
                <Region
                    name="cancel_link_region"
                    onPointerTap={onCancelLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 8, width: 147, top: 49, height: 18 }}
                >
                    <Region
                        name="cancel_link"
                        layout={{ position: 'absolute', left: 0, width: 147, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCancelLink ?? t('notifications.button.later')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
