import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/**
 * Catalog widget `builderLoyaltyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutBuildersClubLoyaltyLayout); each passes its own placement through `layout`.
 */
/** Named region `item_cost_box` of BuilderLoyaltyWidget - configured through the parent's `itemCostBox` prop. */
export interface BuilderLoyaltyWidgetItemCostBoxProps {
    layout?: BoxLayout;
}

export const BuilderLoyaltyWidgetItemCostBox = ({ layout }: BuilderLoyaltyWidgetItemCostBoxProps) => {
    return (
        <Region
            name="item_cost_box"
            params={147472}
            layout={{ width: 20, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `loyalty_list` of BuilderLoyaltyWidget - configured through the parent's `loyaltyList` prop. */
export interface BuilderLoyaltyWidgetLoyaltyListProps {
    captionItemHeader?: string;
    itemCostBox?: BuilderLoyaltyWidgetItemCostBoxProps;
    layout?: BoxLayout;
    onItemBuy?: () => void;
}

export const BuilderLoyaltyWidgetLoyaltyList = ({ captionItemHeader, itemCostBox, layout, onItemBuy }: BuilderLoyaltyWidgetLoyaltyListProps) => {
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
                        <BuilderLoyaltyWidgetItemCostBox {...itemCostBox} />
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

/** Named region `builderLoyaltyWidget` of BuilderLoyaltyWidget - configured through the parent's `builderLoyaltyWidget` prop. */
export interface BuilderLoyaltyWidgetProps {
    layout?: BoxLayout;
    loyaltyList?: BuilderLoyaltyWidgetLoyaltyListProps;
}

export const BuilderLoyaltyWidget = ({ layout, loyaltyList }: BuilderLoyaltyWidgetProps) => {
    return (
        <Region
            name="builderLoyaltyWidget"
            params={2064}
            layout={{ position: 'absolute', ...layout }}
        >
            <BuilderLoyaltyWidgetLoyaltyList {...loyaltyList} />
        </Region>
    );
};
