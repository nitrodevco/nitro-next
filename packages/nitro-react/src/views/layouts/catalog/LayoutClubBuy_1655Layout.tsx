import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1655_layout_club_buy_xml` (layout "ctlg_club_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubBuy_1655LayoutProps {
    captionClubHeader?: string;
    captionClubInfo?: string;
    captionClubLink?: string;
    captionClubRemaining?: string;
    layout?: BoxLayout;
}

export const LayoutClubBuy_1655Layout = ({ captionClubHeader, captionClubInfo, captionClubLink, captionClubRemaining, layout }: LayoutClubBuy_1655LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_club_buy"
                params={2064}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
            >
                <Region
                    name="clubBuyWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, justifyContent: 'center' }}
                >
                    <Border
                        variant="2"
                        params={16}
                        tintColor="#dfdfdf"
                        layout={{ position: 'absolute', left: 10, width: 340, top: 0, height: 22, justifyContent: 'center' }}
                    >
                        <Region
                            name="club_header"
                            params={786448}
                            layout={{ position: 'absolute', marginLeft: -16.5, marginRight: 16.5, width: 307, top: 2, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionClubHeader ?? t('catalog.club.buy.header')}
                                textStyle="text-style-u-headline-small"
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                    </Border>
                    <Border
                        variant="2"
                        name="club_remaining_bg"
                        params={1040}
                        tintColor="#dfdfdf"
                        layout={{ position: 'absolute', left: 10, width: 340, bottom: 25, height: 25 }}
                    >
                        <Region
                            name="club_remaining"
                            params={16}
                            layout={{ position: 'absolute', left: 6, width: 151, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionClubRemaining ?? t('catalog.club.buy.remaining')} />
                        </Region>
                    </Border>
                    <Region
                        name="club_info"
                        params={16}
                        layout={{ position: 'absolute', left: 7, width: 307, top: 30, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionClubInfo ?? t('catalog.club.buy.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 307 }}
                        />
                    </Region>
                    <Icon
                        variant="18"
                        name="icon_vip"
                        params={16}
                        layout={{ position: 'absolute', left: 40, width: 85, top: 104, height: 40 }}
                    />
                    <Region
                        name="item_list_hc"
                        tags={[ 'own_items_grid' ]}
                        params={2064}
                        layout={{ position: 'absolute', left: 0, width: 171, top: 155, bottom: 55, flexDirection: 'column', gap: 4 }}
                    />
                    <Region
                        name="item_list_vip"
                        tags={[ 'own_items_grid' ]}
                        params={2064}
                        layout={{ position: 'absolute', left: 180, width: 171, top: 155, bottom: 55, flexDirection: 'column', gap: 4 }}
                    />
                    <Region
                        name="club_link"
                        params={787473}
                        layout={{ position: 'absolute', width: 340, bottom: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionClubLink ?? t('catalog.club.buy.link')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
