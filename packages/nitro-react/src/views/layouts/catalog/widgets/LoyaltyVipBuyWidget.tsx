import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/**
 * Catalog widget `loyaltyVipBuyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutLoyaltyVipBuy_1620Layout); each passes its own placement through `layout`.
 */
/** Named region `item_list_vip` of LoyaltyVipBuyWidget - configured through the parent's `itemListVip` prop. */
export interface LoyaltyVipBuyWidgetItemListVipProps {
    layout?: BoxLayout;
}

export const LoyaltyVipBuyWidgetItemListVip = ({ layout }: LoyaltyVipBuyWidgetItemListVipProps) => {
    return (
        <Region
            name="item_list_vip"
            params={2064}
            layout={{ position: 'absolute', left: 19, width: 316, top: 170, bottom: 33, flexDirection: 'column', gap: 4, ...layout }}
        />
    );
};

/** Named region `loyaltyVipBuyWidget` of LoyaltyVipBuyWidget - configured through the parent's `loyaltyVipBuyWidget` prop. */
export interface LoyaltyVipBuyWidgetProps {
    captionVipInfo?: string;
    captionVipLink?: string;
    captionVipTitle?: string;
    itemListVip?: LoyaltyVipBuyWidgetItemListVipProps;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LoyaltyVipBuyWidget = ({ captionVipInfo, captionVipLink, captionVipTitle, itemListVip, layout, srcCtlgTeaserimg1 }: LoyaltyVipBuyWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="loyaltyVipBuyWidget"
            tags={[ 'EMBEDDED' ]}
            params={2064}
            layout={{ position: 'absolute', justifyContent: 'center', ...layout }}
        >
            <Region
                tags={[ 'own_items_grid' ]}
                params={16}
                layout={{ position: 'absolute', left: 161, width: 188, top: 3, height: 165, flexDirection: 'column', gap: 4 }}
            >
                <Region
                    name="vip_title"
                    params={786576}
                    layout={{ width: 158, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionVipTitle ?? t('catalog.vip.buy.title')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 158 }}
                    />
                </Region>
                <Region
                    name="vip_info"
                    params={786576}
                    layout={{ width: 158, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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
            <LoyaltyVipBuyWidgetItemListVip {...itemListVip} />
            <Region
                name="vip_link"
                params={787473}
                layout={{ position: 'absolute', marginLeft: 2, marginRight: -2, width: 286, bottom: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionVipLink ?? t('catalog.vip.buy.link')}
                    textOptions={{ fill: '#038ef4', align: 'center' }}
                />
            </Region>
        </Region>
    );
};
