import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1620_layout_loyalty_vip_buy_xml` (layout "ctlg_loyalty_vip_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutLoyaltyVipBuy_1620LayoutProps {
    captionVipInfo?: string;
    captionVipLink?: string;
    captionVipTitle?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutLoyaltyVipBuy_1620Layout = ({ captionVipInfo, captionVipLink, captionVipTitle, layout, srcCtlgTeaserimg1 }: LayoutLoyaltyVipBuy_1620LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_loyalty_vip_buy"
                params={2064}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
            >
                <Region
                    name="loyaltyVipBuyWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
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
                    <Region
                        name="item_list_vip"
                        params={2064}
                        layout={{ position: 'absolute', left: 19, width: 316, top: 170, bottom: 33, flexDirection: 'column', gap: 4 }}
                    />
                    <Region
                        name="vip_link"
                        params={787473}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -141, width: 286, bottom: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionVipLink ?? t('catalog.vip.buy.link')}
                            textOptions={{ fill: '#038ef4', align: 'center' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
