import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/**
 * Catalog widget `vipBuyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutVipBuy_1585Layout); each passes its own placement through `layout`.
 */
/** Named region `item_list_vip` of VipBuyWidget - configured through the parent's `itemListVip` prop. */
export interface VipBuyWidgetItemListVipProps {
    layout?: BoxLayout;
}

export const VipBuyWidgetItemListVip = ({ layout }: VipBuyWidgetItemListVipProps) => {
    return (
        <Region
            name="item_list_vip"
            params={16}
            layout={{ position: 'absolute', left: 19, width: 286, top: 170, height: 157, minWidth: 286, maxWidth: 286, flexDirection: 'column', gap: 4, ...layout }}
        />
    );
};

/** Named region `vipBuyWidget` of VipBuyWidget - configured through the parent's `vipBuyWidget` prop. */
export interface VipBuyWidgetProps {
    captionVipInfo?: string;
    captionVipLink?: string;
    captionVipTitle?: string;
    itemListVip?: VipBuyWidgetItemListVipProps;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const VipBuyWidget = ({ captionVipInfo, captionVipLink, captionVipTitle, itemListVip, layout, srcCtlgTeaserimg1 }: VipBuyWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="vipBuyWidget"
            params={16}
            layout={{ position: 'absolute', justifyContent: 'center', ...layout }}
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
                    layout={{ width: 158, height: 272, flexShrink: 0, minWidth: 158, maxWidth: 158, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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
                layout={{ position: 'absolute', left: 3, width: 152, top: 3, height: 291 }}
            />
            <Region
                name="vip_link"
                params={786449}
                layout={{ position: 'absolute', marginLeft: -8, marginRight: 8, width: 286, top: 330, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionVipLink ?? t('catalog.vip.buy.link')}
                    textOptions={{ fill: '#038ef4', align: 'center' }}
                />
            </Region>
            <VipBuyWidgetItemListVip {...itemListVip} />
        </Region>
    );
};
