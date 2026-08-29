import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1585_layout_vip_buy_xml` (layout "ctlg_vip_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutVipBuy_1585LayoutProps {
    ctlgVipBuy?: LayoutVipBuy_1585LayoutCtlgVipBuyProps;
    layout?: BoxLayout;
}

export const LayoutVipBuy_1585Layout = ({ ctlgVipBuy, layout }: LayoutVipBuy_1585LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutVipBuy_1585LayoutCtlgVipBuy {...ctlgVipBuy} />
        </Region>
    );
};

/** Named region `item_list_vip` of LayoutVipBuy_1585Layout - configured through the parent's `itemListVip` prop. */
export interface LayoutVipBuy_1585LayoutItemListVipProps {
    layout?: BoxLayout;
}

export const LayoutVipBuy_1585LayoutItemListVip = ({ layout }: LayoutVipBuy_1585LayoutItemListVipProps) => {
    return (
        <Region
            name="item_list_vip"
            params={16}
            layout={{ position: 'absolute', left: 19, width: 286, top: 170, height: 157, minWidth: 286, maxWidth: 286, flexDirection: 'column', gap: 4, ...layout }}
        />
    );
};

/** Named region `vipBuyWidget` of LayoutVipBuy_1585Layout - configured through the parent's `vipBuyWidget` prop. */
export interface LayoutVipBuy_1585LayoutVipBuyWidgetProps {
    captionVipInfo?: string;
    captionVipLink?: string;
    captionVipTitle?: string;
    itemListVip?: LayoutVipBuy_1585LayoutItemListVipProps;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutVipBuy_1585LayoutVipBuyWidget = ({ captionVipInfo, captionVipLink, captionVipTitle, itemListVip, layout, srcCtlgTeaserimg1 }: LayoutVipBuy_1585LayoutVipBuyWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="vipBuyWidget"
            params={16}
            layout={{ position: 'absolute', left: 10, width: 340, top: 80, height: 380, justifyContent: 'center', ...layout }}
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
            <LayoutVipBuy_1585LayoutItemListVip {...itemListVip} />
        </Region>
    );
};

/** Named region `ctlg_vip_buy` of LayoutVipBuy_1585Layout - configured through the parent's `ctlgVipBuy` prop. */
export interface LayoutVipBuy_1585LayoutCtlgVipBuyProps {
    layout?: BoxLayout;
    vipBuyWidget?: LayoutVipBuy_1585LayoutVipBuyWidgetProps;
}

export const LayoutVipBuy_1585LayoutCtlgVipBuy = ({ layout, vipBuyWidget }: LayoutVipBuy_1585LayoutCtlgVipBuyProps) => {
    return (
        <Region
            name="ctlg_vip_buy"
            params={16}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <LayoutVipBuy_1585LayoutVipBuyWidget {...vipBuyWidget} />
        </Region>
    );
};
