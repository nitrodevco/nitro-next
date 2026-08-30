import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `vipBuyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutVipBuy_1547Layout); each passes its own placement through `layout`.
 */
/** Named region `vipBuyWidget` of VipBuyWidget - configured through the parent's `vipBuyWidget` prop. */
export interface VipBuyWidgetProps extends CatalogWidgetFlags {
    captionHccenterLink?: string;
    captionVipInfo?: string;
    captionVipTitle?: string;
    itemsItemListVip?: ReactNode;
    layout?: BoxLayout;
    onHccenterLinkContainer?: () => void;
    srcCtlgTeaserimg1?: string;
}

export const VipBuyWidget = ({ captionHccenterLink, captionVipInfo, captionVipTitle, itemsItemListVip, layout, onHccenterLinkContainer, srcCtlgTeaserimg1 }: VipBuyWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="vipBuyWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 161, width: 198, top: 3, height: 165, flexDirection: 'column', gap: 4 }}>
                <ThemeText
                    text={captionVipTitle ?? t('catalog.vip.buy.title')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 178 }}
                    name="vip_title"
                    verticalAlign="top"
                    layout={{ width: 178, height: 17, flexShrink: 0 }}
                />
                <ThemeText
                    text={captionVipInfo ?? t('catalog.vip.buy.info')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 178 }}
                    name="vip_info"
                    verticalAlign="top"
                    layout={{ width: 178, height: 17, flexShrink: 0 }}
                />
            </Region>
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/hc_catalog_teaser.gif'}
                layout={{ position: 'absolute', left: 3, width: 152, top: 3, height: 291 }}
            />
            <Region
                name="item_list_vip"
                layout={{ position: 'absolute', left: 19, width: 336, top: 170, bottom: 33, flexDirection: 'column', gap: 4 }}
            >
                {itemsItemListVip}
            </Region>
            <Region
                name="hccenter_link_container"
                onPointerTap={onHccenterLinkContainer}
                cursor="pointer"
                layout={{ position: 'absolute', right: 25, width: 316, bottom: 9, height: 17, minWidth: 316, maxWidth: 316 }}
            >
                <ThemeText
                    text={captionHccenterLink ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 236, align: 'center' }}
                    name="hccenter_link"
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 40, width: 236, bottom: 0, height: 30, minWidth: 236, maxWidth: 236 }}
                />
            </Region>
        </Region>
    );
};
