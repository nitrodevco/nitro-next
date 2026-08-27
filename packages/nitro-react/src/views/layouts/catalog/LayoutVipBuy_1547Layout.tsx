import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1547_layout_vip_buy_xml` (layout "ctlg_vip_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutVipBuy_1547LayoutProps {
    captionHccenterLink?: string;
    captionVipInfo?: string;
    captionVipTitle?: string;
    layout?: BoxLayout;
    onHccenterLinkContainer?: () => void;
    srcCtlgTeaserimg1?: string;
}

export const LayoutVipBuy_1547Layout = ({ captionHccenterLink, captionVipInfo, captionVipTitle, layout, onHccenterLinkContainer, srcCtlgTeaserimg1 }: LayoutVipBuy_1547LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_vip_buy"
                params={2064}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
            >
                <Region
                    name="vipBuyWidget"
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
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
                    <Region
                        name="item_list_vip"
                        params={2064}
                        layout={{ position: 'absolute', left: 19, width: 336, top: 170, bottom: 33, flexDirection: 'column', gap: 4 }}
                    />
                    <Region
                        name="hccenter_link_container"
                        params={1310721}
                        onPointerTap={onHccenterLinkContainer}
                        cursor="pointer"
                        layout={{ position: 'absolute', right: 25, width: 316, bottom: 9, height: 17, minWidth: 316, maxWidth: 316 }}
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
                </Region>
            </Region>
        </Region>
    );
};
