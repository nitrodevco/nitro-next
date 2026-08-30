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
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Icon
                    variant="14"
                    name="club_icon"
                    layout={{ position: 'absolute', left: 6, width: 16, top: 7, height: 16 }}
                />
                <ThemeText
                    text={captionInfoText ?? t('notifications.text.club_gift')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 174 }}
                    name="info_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: -7, width: 174, top: 7, height: 36 }}
                />
                <Button
                    variant="4"
                    name="open_catalog_button"
                    onPointerTap={onOpenCatalogButton}
                    layout={{ position: 'absolute', right: 8, width: 216, bottom: 10, height: 28 }}
                >
                    {t('notifications.button.show_gift_list')}
                </Button>
                <Region
                    name="cancel_link_region"
                    onPointerTap={onCancelLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 8, width: 147, top: 49, height: 18 }}
                >
                    <ThemeText
                        text={captionCancelLink ?? t('notifications.button.later')}
                        textOptions={{ fill: '#ffffff' }}
                        name="cancel_link"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 1 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
