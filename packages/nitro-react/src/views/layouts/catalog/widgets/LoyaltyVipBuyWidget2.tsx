import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `loyaltyVipBuyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutLoyaltyVipBuy_1620Layout); each passes its own placement through `layout`.
 */
/** Named region `item_list_vip` of LoyaltyVipBuyWidget2 - configured through the parent's `itemListVip` prop. */
export interface LoyaltyVipBuyWidget2ItemListVipProps {
    layout?: BoxLayout;
}

export const LoyaltyVipBuyWidget2ItemListVip = ({ layout }: LoyaltyVipBuyWidget2ItemListVipProps) => {
    return (
        <Region
            name="item_list_vip"
            layout={{ position: 'absolute', left: 19, width: 316, top: 170, bottom: 33, flexDirection: 'column', gap: 4, ...layout }}
        />
    );
};

/** Named region `loyaltyVipBuyWidget` of LoyaltyVipBuyWidget2 - configured through the parent's `loyaltyVipBuyWidget` prop. */
export interface LoyaltyVipBuyWidget2Props extends CatalogWidgetFlags {
    captionVipInfo?: string;
    captionVipLink?: string;
    captionVipTitle?: string;
    itemListVip?: LoyaltyVipBuyWidget2ItemListVipProps;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LoyaltyVipBuyWidget2 = ({ captionVipInfo, captionVipLink, captionVipTitle, itemListVip, layout, srcCtlgTeaserimg1 }: LoyaltyVipBuyWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="loyaltyVipBuyWidget"
            layout={{ position: 'absolute', justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 161, width: 188, top: 3, height: 165, flexDirection: 'column', gap: 4 }}>
                <Region
                    name="vip_title"
                    layout={{ width: 158, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionVipTitle ?? t('catalog.vip.buy.title')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 158 }}
                    />
                </Region>
                <Region
                    name="vip_info"
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
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/hc_catalog_teaser.gif'}
                layout={{ position: 'absolute', left: 3, width: 152, top: 3, height: 161 }}
            />
            <LoyaltyVipBuyWidget2ItemListVip {...itemListVip} />
            <Region
                name="vip_link"
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
