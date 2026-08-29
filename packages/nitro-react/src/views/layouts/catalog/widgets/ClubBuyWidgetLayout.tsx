import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1652_clubBuyWidget_xml` (layout "clubBuyWidget", 320x345) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubBuyWidgetLayoutProps {
    clubBuyContent?: ClubBuyWidgetLayoutClubBuyContentProps;
    layout?: BoxLayout;
}

export const ClubBuyWidgetLayout = ({ clubBuyContent, layout }: ClubBuyWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 320, height: 345, ...layout }}>
            <ClubBuyWidgetLayoutClubBuyContent {...clubBuyContent} />
        </Region>
    );
};

/** Named region `item_list_hc` of ClubBuyWidgetLayout - configured through the parent's `itemListHc` prop. */
export interface ClubBuyWidgetLayoutItemListHcProps {
    layout?: BoxLayout;
}

export const ClubBuyWidgetLayoutItemListHc = ({ layout }: ClubBuyWidgetLayoutItemListHcProps) => {
    return (
        <Region
            name="item_list_hc"
            layout={{ position: 'absolute', left: 0, width: 151, top: 155, height: 140, flexDirection: 'column', gap: 4, ...layout }}
        />
    );
};

/** Named region `item_list_vip` of ClubBuyWidgetLayout - configured through the parent's `itemListVip` prop. */
export interface ClubBuyWidgetLayoutItemListVipProps {
    layout?: BoxLayout;
}

export const ClubBuyWidgetLayoutItemListVip = ({ layout }: ClubBuyWidgetLayoutItemListVipProps) => {
    return (
        <Region
            name="item_list_vip"
            layout={{ position: 'absolute', left: 155, width: 151, top: 155, height: 140, flexDirection: 'column', gap: 4, ...layout }}
        />
    );
};

/** Named region `club_buy_content` of ClubBuyWidgetLayout - configured through the parent's `clubBuyContent` prop. */
export interface ClubBuyWidgetLayoutClubBuyContentProps {
    captionClubHeader?: string;
    captionClubInfo?: string;
    captionClubLink?: string;
    captionClubRemaining?: string;
    itemListHc?: ClubBuyWidgetLayoutItemListHcProps;
    itemListVip?: ClubBuyWidgetLayoutItemListVipProps;
    layout?: BoxLayout;
}

export const ClubBuyWidgetLayoutClubBuyContent = ({ captionClubHeader, captionClubInfo, captionClubLink, captionClubRemaining, itemListHc, itemListVip, layout }: ClubBuyWidgetLayoutClubBuyContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="club_buy_content"
            layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 345, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                tintColor="#dfdfdf"
                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 22 }}
            />
            <Border
                variant="2"
                name="club_remaining_bg"
                tintColor="#dfdfdf"
                layout={{ position: 'absolute', left: 0, width: 307, top: 300, height: 25 }}
            />
            <Region
                name="club_header"
                layout={{ position: 'absolute', marginLeft: -6.5, marginRight: 6.5, width: 307, top: 2, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionClubHeader ?? t('catalog.club.buy.header')}
                    textStyle="text-style-u-headline-small"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                name="club_info"
                layout={{ position: 'absolute', left: 7, width: 307, top: 30, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionClubInfo ?? t('catalog.club.buy.info')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 307 }}
                />
            </Region>
            <Icon
                variant="18"
                name="icon_vip"
                layout={{ position: 'absolute', left: 40, width: 85, top: 104, height: 40 }}
            />
            <Region
                name="club_remaining"
                layout={{ position: 'absolute', left: 6, width: 151, top: 305, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionClubRemaining ?? t('catalog.club.buy.remaining')} />
            </Region>
            <ClubBuyWidgetLayoutItemListHc {...itemListHc} />
            <ClubBuyWidgetLayoutItemListVip {...itemListVip} />
            <Region
                name="club_link"
                layout={{ position: 'absolute', marginLeft: -6.5, marginRight: 6.5, width: 307, top: 330, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionClubLink ?? t('catalog.club.buy.link')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};
