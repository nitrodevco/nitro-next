import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1547_layout_vip_buy_xml` (layout "ctlg_vip_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutVipBuy_1547LayoutProps {
    ctlgVipBuy?: LayoutVipBuy_1547LayoutCtlgVipBuyProps;
    layout?: BoxLayout;
}

export const LayoutVipBuy_1547Layout = ({ ctlgVipBuy, layout }: LayoutVipBuy_1547LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutVipBuy_1547LayoutCtlgVipBuy {...ctlgVipBuy} />
        </Region>
    );
};

/** Named region `item_list_vip` of LayoutVipBuy_1547Layout - configured through the parent's `itemListVip` prop. */
export interface LayoutVipBuy_1547LayoutItemListVipProps {
    layout?: BoxLayout;
}

export const LayoutVipBuy_1547LayoutItemListVip = ({ layout }: LayoutVipBuy_1547LayoutItemListVipProps) => {
    return (
        <Region
            name="item_list_vip"
            params={2064}
            layout={{ position: 'absolute', left: 19, width: 336, top: 170, bottom: 33, flexDirection: 'column', gap: 4, ...layout }}
        />
    );
};

/** Named region `hccenter_link_container` of LayoutVipBuy_1547Layout - configured through the parent's `hccenterLinkContainer` prop. */
export interface LayoutVipBuy_1547LayoutHccenterLinkContainerProps {
    captionHccenterLink?: string;
    layout?: BoxLayout;
    onHccenterLinkContainer?: () => void;
}

export const LayoutVipBuy_1547LayoutHccenterLinkContainer = ({ captionHccenterLink, layout, onHccenterLinkContainer }: LayoutVipBuy_1547LayoutHccenterLinkContainerProps) => {
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

/** Named region `vipBuyWidget` of LayoutVipBuy_1547Layout - configured through the parent's `vipBuyWidget` prop. */
export interface LayoutVipBuy_1547LayoutVipBuyWidgetProps {
    captionVipInfo?: string;
    captionVipTitle?: string;
    hccenterLinkContainer?: LayoutVipBuy_1547LayoutHccenterLinkContainerProps;
    itemListVip?: LayoutVipBuy_1547LayoutItemListVipProps;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutVipBuy_1547LayoutVipBuyWidget = ({ captionVipInfo, captionVipTitle, hccenterLinkContainer, itemListVip, layout, srcCtlgTeaserimg1 }: LayoutVipBuy_1547LayoutVipBuyWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="vipBuyWidget"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
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
            <LayoutVipBuy_1547LayoutItemListVip {...itemListVip} />
            <LayoutVipBuy_1547LayoutHccenterLinkContainer {...hccenterLinkContainer} />
        </Region>
    );
};

/** Named region `ctlg_vip_buy` of LayoutVipBuy_1547Layout - configured through the parent's `ctlgVipBuy` prop. */
export interface LayoutVipBuy_1547LayoutCtlgVipBuyProps {
    layout?: BoxLayout;
    vipBuyWidget?: LayoutVipBuy_1547LayoutVipBuyWidgetProps;
}

export const LayoutVipBuy_1547LayoutCtlgVipBuy = ({ layout, vipBuyWidget }: LayoutVipBuy_1547LayoutCtlgVipBuyProps) => {
    return (
        <Region
            name="ctlg_vip_buy"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <LayoutVipBuy_1547LayoutVipBuyWidget {...vipBuyWidget} />
        </Region>
    );
};
