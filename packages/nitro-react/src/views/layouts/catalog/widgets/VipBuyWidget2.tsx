import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/**
 * Catalog widget `vipBuyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutVipBuy_1585Layout); each passes its own placement through `layout`.
 */
/** Named region `item_list_vip` of VipBuyWidget2 - configured through the parent's `itemListVip` prop. */
export interface VipBuyWidget2ItemListVipProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const VipBuyWidget2ItemListVip = ({ layout, tags }: VipBuyWidget2ItemListVipProps) => {
    return (
        <Region
            name="item_list_vip"
            tags={tags}
            layout={{ position: 'absolute', left: 19, width: 286, top: 170, height: 157, minWidth: 286, maxWidth: 286, flexDirection: 'column', gap: 4, ...layout }}
        />
    );
};

/** Named region `vipBuyWidget` of VipBuyWidget2 - configured through the parent's `vipBuyWidget` prop. */
export interface VipBuyWidget2Props {
    captionVipInfo?: string;
    captionVipLink?: string;
    captionVipTitle?: string;
    itemListVip?: VipBuyWidget2ItemListVipProps;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
    tags?: string[];
}

export const VipBuyWidget2 = ({ captionVipInfo, captionVipLink, captionVipTitle, itemListVip, layout, srcCtlgTeaserimg1, tags }: VipBuyWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="vipBuyWidget"
            tags={tags}
            layout={{ position: 'absolute', justifyContent: 'center', ...layout }}
        >
            <Region
                tags={[ 'own_items_grid' ]}
                layout={{ position: 'absolute', left: 161, width: 158, top: 3, height: 165, minWidth: 158, maxWidth: 158, minHeight: 165, maxHeight: 165, flexDirection: 'column', gap: 4 }}
            >
                <Region
                    name="vip_title"
                    layout={{ width: 158, height: 17, flexShrink: 0, minWidth: 158, maxWidth: 158, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionVipTitle ?? t('catalog.vip.buy.title')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 158 }}
                    />
                </Region>
                <Region
                    name="vip_info"
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
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/hc_catalog_teaser.gif'}
                layout={{ position: 'absolute', left: 3, width: 152, top: 3, height: 291 }}
            />
            <Region
                name="vip_link"
                layout={{ position: 'absolute', marginLeft: -8, marginRight: 8, width: 286, top: 330, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionVipLink ?? t('catalog.vip.buy.link')}
                    textOptions={{ fill: '#038ef4', align: 'center' }}
                />
            </Region>
            <VipBuyWidget2ItemListVip {...itemListVip} />
        </Region>
    );
};
