import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1655_layout_club_buy_xml` (layout "ctlg_club_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubBuy_1655LayoutProps {
    ctlgClubBuy?: LayoutClubBuy_1655LayoutCtlgClubBuyProps;
    layout?: BoxLayout;
}

export const LayoutClubBuy_1655Layout = ({ ctlgClubBuy, layout }: LayoutClubBuy_1655LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutClubBuy_1655LayoutCtlgClubBuy {...ctlgClubBuy} />
        </Region>
    );
};

/** Named region `item_list_hc` of LayoutClubBuy_1655Layout - configured through the parent's `itemListHc` prop. */
export interface LayoutClubBuy_1655LayoutItemListHcProps {
    layout?: BoxLayout;
}

export const LayoutClubBuy_1655LayoutItemListHc = ({ layout }: LayoutClubBuy_1655LayoutItemListHcProps) => {
    return (
        <Region
            name="item_list_hc"
            tags={[ 'own_items_grid' ]}
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 171, top: 155, bottom: 55, flexDirection: 'column', gap: 4, ...layout }}
        />
    );
};

/** Named region `item_list_vip` of LayoutClubBuy_1655Layout - configured through the parent's `itemListVip` prop. */
export interface LayoutClubBuy_1655LayoutItemListVipProps {
    layout?: BoxLayout;
}

export const LayoutClubBuy_1655LayoutItemListVip = ({ layout }: LayoutClubBuy_1655LayoutItemListVipProps) => {
    return (
        <Region
            name="item_list_vip"
            tags={[ 'own_items_grid' ]}
            params={2064}
            layout={{ position: 'absolute', left: 180, width: 171, top: 155, bottom: 55, flexDirection: 'column', gap: 4, ...layout }}
        />
    );
};

/** Named region `clubBuyWidget` of LayoutClubBuy_1655Layout - configured through the parent's `clubBuyWidget` prop. */
export interface LayoutClubBuy_1655LayoutClubBuyWidgetProps {
    captionClubHeader?: string;
    captionClubInfo?: string;
    captionClubLink?: string;
    captionClubRemaining?: string;
    itemListHc?: LayoutClubBuy_1655LayoutItemListHcProps;
    itemListVip?: LayoutClubBuy_1655LayoutItemListVipProps;
    layout?: BoxLayout;
}

export const LayoutClubBuy_1655LayoutClubBuyWidget = ({ captionClubHeader, captionClubInfo, captionClubLink, captionClubRemaining, itemListHc, itemListVip, layout }: LayoutClubBuy_1655LayoutClubBuyWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="clubBuyWidget"
            tags={[ 'EMBEDDED' ]}
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                params={16}
                tintColor="#dfdfdf"
                layout={{ position: 'absolute', left: 10, width: 340, top: 0, height: 22, justifyContent: 'center' }}
            >
                <Region
                    name="club_header"
                    params={786448}
                    layout={{ position: 'absolute', marginLeft: -16.5, marginRight: 16.5, width: 307, top: 2, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionClubHeader ?? t('catalog.club.buy.header')}
                        textStyle="text-style-u-headline-small"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Border>
            <Border
                variant="2"
                name="club_remaining_bg"
                params={1040}
                tintColor="#dfdfdf"
                layout={{ position: 'absolute', left: 10, width: 340, bottom: 25, height: 25 }}
            >
                <Region
                    name="club_remaining"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 151, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionClubRemaining ?? t('catalog.club.buy.remaining')} />
                </Region>
            </Border>
            <Region
                name="club_info"
                params={16}
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
                params={16}
                layout={{ position: 'absolute', left: 40, width: 85, top: 104, height: 40 }}
            />
            <LayoutClubBuy_1655LayoutItemListHc {...itemListHc} />
            <LayoutClubBuy_1655LayoutItemListVip {...itemListVip} />
            <Region
                name="club_link"
                params={787473}
                layout={{ position: 'absolute', width: 340, bottom: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionClubLink ?? t('catalog.club.buy.link')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `ctlg_club_buy` of LayoutClubBuy_1655Layout - configured through the parent's `ctlgClubBuy` prop. */
export interface LayoutClubBuy_1655LayoutCtlgClubBuyProps {
    clubBuyWidget?: LayoutClubBuy_1655LayoutClubBuyWidgetProps;
    layout?: BoxLayout;
}

export const LayoutClubBuy_1655LayoutCtlgClubBuy = ({ clubBuyWidget, layout }: LayoutClubBuy_1655LayoutCtlgClubBuyProps) => {
    return (
        <Region
            name="ctlg_club_buy"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <LayoutClubBuy_1655LayoutClubBuyWidget {...clubBuyWidget} />
        </Region>
    );
};
