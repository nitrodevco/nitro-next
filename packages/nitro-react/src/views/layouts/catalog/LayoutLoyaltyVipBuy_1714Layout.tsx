import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1714_layout_loyalty_vip_buy_xml` (layout "ctlg_loyalty_vip_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutLoyaltyVipBuy_1714LayoutProps {
    ctlgLoyaltyVipBuy?: LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuyProps;
    layout?: BoxLayout;
}

export const LayoutLoyaltyVipBuy_1714Layout = ({ ctlgLoyaltyVipBuy, layout }: LayoutLoyaltyVipBuy_1714LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuy {...ctlgLoyaltyVipBuy} />
        </Region>
    );
};

/** Named region `item_list_vip` of LayoutLoyaltyVipBuy_1714Layout - configured through the parent's `itemListVip` prop. */
export interface LayoutLoyaltyVipBuy_1714LayoutItemListVipProps {
    layout?: BoxLayout;
}

export const LayoutLoyaltyVipBuy_1714LayoutItemListVip = ({ layout }: LayoutLoyaltyVipBuy_1714LayoutItemListVipProps) => {
    return (
        <Region
            name="item_list_vip"
            params={16}
            layout={{ position: 'absolute', left: 19, width: 286, top: 170, height: 157, minWidth: 286, maxWidth: 286, flexDirection: 'column', gap: 4, ...layout }}
        />
    );
};

/** Named region `loyaltyVipBuyWidget` of LayoutLoyaltyVipBuy_1714Layout - configured through the parent's `loyaltyVipBuyWidget` prop. */
export interface LayoutLoyaltyVipBuy_1714LayoutLoyaltyVipBuyWidgetProps {
    captionVipInfo?: string;
    captionVipLink?: string;
    captionVipTitle?: string;
    itemListVip?: LayoutLoyaltyVipBuy_1714LayoutItemListVipProps;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutLoyaltyVipBuy_1714LayoutLoyaltyVipBuyWidget = ({ captionVipInfo, captionVipLink, captionVipTitle, itemListVip, layout, srcCtlgTeaserimg1 }: LayoutLoyaltyVipBuy_1714LayoutLoyaltyVipBuyWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="loyaltyVipBuyWidget"
            params={16}
            layout={{ position: 'absolute', left: 13, width: 320, top: 67, height: 345, justifyContent: 'center', ...layout }}
        >
            <Region
                tags={[ 'own_items_grid' ]}
                params={16}
                layout={{ position: 'absolute', left: 161, width: 158, top: 3, height: 165, minWidth: 158, maxWidth: 158, minHeight: 165, maxHeight: 165, flexDirection: 'column', gap: 4 }}
            >
                <Region
                    name="vip_title"
                    params={786576}
                    layout={{ width: 158, height: 17, flexShrink: 0, minWidth: 158, maxWidth: 158, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionVipTitle ?? t('catalog.vip.buy.title')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 158 }}
                    />
                </Region>
                <Region
                    name="vip_info"
                    params={786576}
                    layout={{ width: 158, height: 17, flexShrink: 0, minWidth: 158, maxWidth: 158, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionVipInfo ?? t('catalog.vip.buy.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 158 }}
                    />
                </Region>
            </Region>
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/hc_catalog_teaser.gif'}
                layout={{ position: 'absolute', left: 3, width: 152, top: 3, height: 161 }}
            />
            <Region
                name="vip_link"
                params={786449}
                layout={{ position: 'absolute', marginLeft: 2, marginRight: -2, width: 286, top: 330, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionVipLink ?? t('catalog.vip.buy.link')}
                    textOptions={{ fill: '#038ef4', align: 'center' }}
                />
            </Region>
            <LayoutLoyaltyVipBuy_1714LayoutItemListVip {...itemListVip} />
        </Region>
    );
};

/** Named region `ctlg_loyalty_vip_buy` of LayoutLoyaltyVipBuy_1714Layout - configured through the parent's `ctlgLoyaltyVipBuy` prop. */
export interface LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuyProps {
    layout?: BoxLayout;
    loyaltyVipBuyWidget?: LayoutLoyaltyVipBuy_1714LayoutLoyaltyVipBuyWidgetProps;
}

export const LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuy = ({ layout, loyaltyVipBuyWidget }: LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuyProps) => {
    return (
        <Region
            name="ctlg_loyalty_vip_buy"
            params={16}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <LayoutLoyaltyVipBuy_1714LayoutLoyaltyVipBuyWidget {...loyaltyVipBuyWidget} />
        </Region>
    );
};
