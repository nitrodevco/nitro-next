import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1617_layout_builders_club_loyalty_xml` (layout "layout_builders_club_loyalty", 360x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBuildersClubLoyaltyLayoutProps {
    ctlgBuildersClubLoyalty?: LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyaltyProps;
    layout?: BoxLayout;
}

export const LayoutBuildersClubLoyaltyLayout = ({ ctlgBuildersClubLoyalty, layout }: LayoutBuildersClubLoyaltyLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 508, ...layout }}>
            <LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyalty {...ctlgBuildersClubLoyalty} />
        </Region>
    );
};

/** Named region `item_cost_box` of LayoutBuildersClubLoyaltyLayout - configured through the parent's `itemCostBox` prop. */
export interface LayoutBuildersClubLoyaltyLayoutItemCostBoxProps {
    layout?: BoxLayout;
}

export const LayoutBuildersClubLoyaltyLayoutItemCostBox = ({ layout }: LayoutBuildersClubLoyaltyLayoutItemCostBoxProps) => {
    return (
        <Region
            name="item_cost_box"
            params={147472}
            layout={{ width: 20, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `loyalty_list` of LayoutBuildersClubLoyaltyLayout - configured through the parent's `loyaltyList` prop. */
export interface LayoutBuildersClubLoyaltyLayoutLoyaltyListProps {
    captionItemHeader?: string;
    itemCostBox?: LayoutBuildersClubLoyaltyLayoutItemCostBoxProps;
    layout?: BoxLayout;
    onItemBuy?: () => void;
}

export const LayoutBuildersClubLoyaltyLayoutLoyaltyList = ({ captionItemHeader, itemCostBox, layout, onItemBuy }: LayoutBuildersClubLoyaltyLayoutLoyaltyListProps) => {
    const t = useTranslation();

    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 287, top: 0, bottom: 20, ...layout }}
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
                        <LayoutBuildersClubLoyaltyLayoutItemCostBox {...itemCostBox} />
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="item_buy"
                        params={393233}
                        tintColor="#0a9bc5"
                        onPointerTap={onItemBuy}
                        layout={{ position: 'absolute', right: 4, width: 142, top: 37, height: 35, minWidth: 40 }}
                    >
                        {t('buy')}
                    </ButtonThick>
                </Border>
            </Region>
        </ScrollArea>
    );
};

/** Named region `builderLoyaltyWidget` of LayoutBuildersClubLoyaltyLayout - configured through the parent's `builderLoyaltyWidget` prop. */
export interface LayoutBuildersClubLoyaltyLayoutBuilderLoyaltyWidgetProps {
    layout?: BoxLayout;
    loyaltyList?: LayoutBuildersClubLoyaltyLayoutLoyaltyListProps;
}

export const LayoutBuildersClubLoyaltyLayoutBuilderLoyaltyWidget = ({ layout, loyaltyList }: LayoutBuildersClubLoyaltyLayoutBuilderLoyaltyWidgetProps) => {
    return (
        <Region
            name="builderLoyaltyWidget"
            params={2064}
            layout={{ position: 'absolute', left: 14, width: 300, top: 108, bottom: 20, ...layout }}
        >
            <LayoutBuildersClubLoyaltyLayoutLoyaltyList {...loyaltyList} />
        </Region>
    );
};

/** Named region `ctlg_builders_club_loyalty` of LayoutBuildersClubLoyaltyLayout - configured through the parent's `ctlgBuildersClubLoyalty` prop. */
export interface LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyaltyProps {
    builderLoyaltyWidget?: LayoutBuildersClubLoyaltyLayoutBuilderLoyaltyWidgetProps;
    captionCtlgDescription?: string;
    layout?: BoxLayout;
}

export const LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyalty = ({ builderLoyaltyWidget, captionCtlgDescription, layout }: LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyaltyProps) => {
    return (
        <Region
            name="ctlg_builders_club_loyalty"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
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
            <LayoutBuildersClubLoyaltyLayoutBuilderLoyaltyWidget {...builderLoyaltyWidget} />
            <ThemeImage
                params={16}
                src="${image.library.url}catalogue/bc_top.png"
                layout={{ position: 'absolute', left: 249, width: 111, top: 21, height: 282 }}
            />
        </Region>
    );
};
