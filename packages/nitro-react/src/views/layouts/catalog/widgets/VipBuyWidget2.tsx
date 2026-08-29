import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/**
 * Catalog widget `vipBuyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutVipBuy_1547Layout); each passes its own placement through `layout`.
 */
/** Named region `item_list_vip` of VipBuyWidget2 - configured through the parent's `itemListVip` prop. */
export interface VipBuyWidget2ItemListVipProps {
    layout?: BoxLayout;
}

export const VipBuyWidget2ItemListVip = ({ layout }: VipBuyWidget2ItemListVipProps) => {
    return (
        <Region
            name="item_list_vip"
            params={2064}
            layout={{ position: 'absolute', left: 19, width: 336, top: 170, bottom: 33, flexDirection: 'column', gap: 4, ...layout }}
        />
    );
};

/** Named region `hccenter_link_container` of VipBuyWidget2 - configured through the parent's `hccenterLinkContainer` prop. */
export interface VipBuyWidget2HccenterLinkContainerProps {
    captionHccenterLink?: string;
    layout?: BoxLayout;
    onHccenterLinkContainer?: () => void;
}

export const VipBuyWidget2HccenterLinkContainer = ({ captionHccenterLink, layout, onHccenterLinkContainer }: VipBuyWidget2HccenterLinkContainerProps) => {
    return (
        <Region
            name="hccenter_link_container"
            params={1310721}
            onPointerTap={onHccenterLinkContainer}
            cursor="pointer"
            layout={{ position: 'absolute', right: 25, width: 316, bottom: 9, height: 17, minWidth: 316, maxWidth: 316, ...layout }}
        >
            <Region
                name="hccenter_link"
                params={1310721}
                layout={{ position: 'absolute', right: 40, width: 236, bottom: 0, height: 30, minWidth: 236, maxWidth: 236, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionHccenterLink ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 236, align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `vipBuyWidget` of VipBuyWidget2 - configured through the parent's `vipBuyWidget` prop. */
export interface VipBuyWidget2Props {
    captionVipInfo?: string;
    captionVipTitle?: string;
    hccenterLinkContainer?: VipBuyWidget2HccenterLinkContainerProps;
    itemListVip?: VipBuyWidget2ItemListVipProps;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const VipBuyWidget2 = ({ captionVipInfo, captionVipTitle, hccenterLinkContainer, itemListVip, layout, srcCtlgTeaserimg1 }: VipBuyWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="vipBuyWidget"
            params={2064}
            layout={{ position: 'absolute', ...layout }}
        >
            <Region
                tags={[ 'own_items_grid' ]}
                params={16}
                layout={{ position: 'absolute', left: 161, width: 198, top: 3, height: 165, flexDirection: 'column', gap: 4 }}
            >
                <Region
                    name="vip_title"
                    params={144}
                    layout={{ width: 178, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionVipTitle ?? t('catalog.vip.buy.title')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 178 }}
                    />
                </Region>
                <Region
                    name="vip_info"
                    params={144}
                    layout={{ width: 178, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionVipInfo ?? t('catalog.vip.buy.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 178 }}
                    />
                </Region>
            </Region>
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/hc_catalog_teaser.gif'}
                layout={{ position: 'absolute', left: 3, width: 152, top: 3, height: 291 }}
            />
            <VipBuyWidget2ItemListVip {...itemListVip} />
            <VipBuyWidget2HccenterLinkContainer {...hccenterLinkContainer} />
        </Region>
    );
};
