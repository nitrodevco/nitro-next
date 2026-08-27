import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1617_layout_builders_club_loyalty_xml` (layout "layout_builders_club_loyalty", 360x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBuildersClubLoyaltyLayoutProps {
    captionCtlgDescription?: string;
    captionItemHeader?: string;
    layout?: BoxLayout;
    onItemBuy?: () => void;
}

export const LayoutBuildersClubLoyaltyLayout = ({ captionCtlgDescription, captionItemHeader, layout, onItemBuy }: LayoutBuildersClubLoyaltyLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 508, ...layout }}>
            <Region
                name="ctlg_builders_club_loyalty"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 508 }}
            >
                <Region
                    name="ctlg_description"
                    params={1}
                    layout={{ position: 'absolute', left: 15, width: 276, top: 28, height: 80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgDescription ?? '<b>Formatted</b> text'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 276 }}
                    />
                </Region>
                <ThemeImage
                    params={16}
                    src="${image.library.url}catalogue/bc_bottom.png"
                    layout={{ position: 'absolute', left: 290, width: 72, top: 316, height: 90 }}
                />
                <Region
                    name="builderLoyaltyWidget"
                    params={2064}
                    layout={{ position: 'absolute', left: 14, width: 300, top: 108, height: 380 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 287, top: 0, height: 360 }}
                    >
                        <Region
                            name="loyalty_list"
                            params={2064}
                            layout={{ flexDirection: 'column', gap: 12, width: '100%' }}
                        >
                            <Border
                                variant="2"
                                params={16}
                                tintColor="#d7d7cf"
                                layout={{ width: 269, height: 77, flexShrink: 0 }}
                            >
                                <Border
                                    variant="3"
                                    params={16}
                                    tintColor="#afafa9"
                                    layout={{ position: 'absolute', left: 5, width: 260, top: 5, height: 25 }}
                                >
                                    <ThemeImage
                                        params={16}
                                        src="${image.library.url}/catalogue/icon_193.png"
                                        layout={{ position: 'absolute', left: 8, width: 15, top: 5, height: 15 }}
                                    />
                                    <Region
                                        name="item_header"
                                        params={16}
                                        layout={{ position: 'absolute', left: 33, width: 88, top: 2, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={captionItemHeader ?? 'item name'}
                                            textStyle="text-style-u-headline-medium"
                                            textOptions={{ fill: '#ffffff' }}
                                        />
                                    </Region>
                                </Border>
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 9, width: 125, top: 45, height: 24, flexDirection: 'row', gap: 3 }}
                                >
                                    <Region
                                        name="item_cost_box"
                                        params={147472}
                                        layout={{ width: 20, height: 22, flexShrink: 0 }}
                                    />
                                </Region>
                                <ButtonThick
                                    variant="5"
                                    name="item_buy"
                                    params={393233}
                                    tintColor="#0a9bc5"
                                    onPointerTap={onItemBuy}
                                    layout={{ position: 'absolute', left: 123, width: 142, top: 37, height: 35, minWidth: 40 }}
                                >
                                    {t('buy')}
                                </ButtonThick>
                            </Border>
                        </Region>
                    </ScrollArea>
                </Region>
                <ThemeImage
                    params={16}
                    src="${image.library.url}catalogue/bc_top.png"
                    layout={{ position: 'absolute', left: 249, width: 111, top: 21, height: 282 }}
                />
            </Region>
        </Region>
    );
};
