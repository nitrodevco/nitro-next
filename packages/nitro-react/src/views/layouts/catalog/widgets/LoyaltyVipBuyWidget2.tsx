import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `loyaltyVipBuyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutLoyaltyVipBuy_1714Layout); each passes its own placement through `layout`.
 */
/** Named region `loyaltyVipBuyWidget` of LoyaltyVipBuyWidget2 - configured through the parent's `loyaltyVipBuyWidget` prop. */
export interface LoyaltyVipBuyWidget2Props extends CatalogWidgetFlags {
    captionVipInfo?: string;
    captionVipLink?: string;
    captionVipTitle?: string;
    itemsItemListVip?: ReactNode;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LoyaltyVipBuyWidget2 = ({ captionVipInfo, captionVipLink, captionVipTitle, itemsItemListVip, layout, srcCtlgTeaserimg1 }: LoyaltyVipBuyWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="loyaltyVipBuyWidget"
            layout={{ position: 'absolute', justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 161, width: 158, top: 3, height: 165, minWidth: 158, maxWidth: 158, minHeight: 165, maxHeight: 165, flexDirection: 'column', gap: 4 }}>
                <ThemeText
                    text={captionVipTitle ?? t('catalog.vip.buy.title')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 158 }}
                    name="vip_title"
                    verticalAlign="top"
                    layout={{ width: 158, height: 17, flexShrink: 0, minWidth: 158, maxWidth: 158 }}
                />
                <ThemeText
                    text={captionVipInfo ?? t('catalog.vip.buy.info')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 158 }}
                    name="vip_info"
                    verticalAlign="top"
                    layout={{ width: 158, height: 17, flexShrink: 0, minWidth: 158, maxWidth: 158 }}
                />
            </Region>
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/hc_catalog_teaser.gif'}
                layout={{ position: 'absolute', left: 3, width: 152, top: 3, height: 161 }}
            />
            <ThemeText
                text={captionVipLink ?? t('catalog.vip.buy.link')}
                textOptions={{ fill: '#038ef4', align: 'center' }}
                name="vip_link"
                layout={{ position: 'absolute', marginLeft: 2, marginRight: -2, width: 286, top: 330, height: 17 }}
            />
            <Region
                name="item_list_vip"
                layout={{ position: 'absolute', left: 19, width: 286, top: 170, height: 157, minWidth: 286, maxWidth: 286, flexDirection: 'column', gap: 4 }}
            >
                {itemsItemListVip}
            </Region>
        </Region>
    );
};
