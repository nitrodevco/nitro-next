import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `2992_club_gift_notification_xml` (layout "achievement_notification", 192x82) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubGiftNotificationLayoutProps {
    cancelLinkRegion?: ClubGiftNotificationLayoutCancelLinkRegionProps;
    captionInfoText?: string;
    layout?: BoxLayout;
    onOpenCatalogButton?: () => void;
}

export const ClubGiftNotificationLayout = ({ cancelLinkRegion, captionInfoText, layout, onOpenCatalogButton }: ClubGiftNotificationLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 82, ...layout }}>
            <Border
                variant="9"
                params={273}
                tintColor="#686661"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 82 }}
            >
                <Icon
                    variant="14"
                    name="club_icon"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 16, top: 7, height: 16 }}
                />
                <Region
                    name="info_text"
                    params={16}
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
                    params={409617}
                    onPointerTap={onOpenCatalogButton}
                    layout={{ position: 'absolute', right: 8, width: 216, top: 44, height: 28 }}
                >
                    {t('notifications.button.show_gift_list')}
                </Button>
                <ClubGiftNotificationLayoutCancelLinkRegion {...cancelLinkRegion} />
            </Border>
        </Region>
    );
};

/** Named region `cancel_link_region` of ClubGiftNotificationLayout - configured through the parent's `cancelLinkRegion` prop. */
export interface ClubGiftNotificationLayoutCancelLinkRegionProps {
    captionCancelLink?: string;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
}

export const ClubGiftNotificationLayoutCancelLinkRegion = ({ captionCancelLink, layout, onCancelLinkRegion }: ClubGiftNotificationLayoutCancelLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel_link_region"
            params={147473}
            onPointerTap={onCancelLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 8, width: 147, top: 49, height: 18, ...layout }}
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
    );
};
