import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ScrollArea, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { SpecialItemsDisplayLayoutItemDescItem } from './SpecialItemsDisplayLayoutItemDescItem';
import { SpecialItemsDisplayLayoutItemTitleItem } from './SpecialItemsDisplayLayoutItemTitleItem';

/** Named region `bottom` of SpecialItemsDisplayLayout - configured through the parent's `bottom` prop. */
export interface SpecialItemsDisplayLayoutBottomProps {
    itemsItemScrollArea?: ReactNode;
    layout?: BoxLayout;
    productIcon?: ReactNode;
    srcTemp?: string;
    visibleBottomborder2?: boolean;
    visibleTemp?: boolean;
}

export const SpecialItemsDisplayLayoutBottom = ({ itemsItemScrollArea, layout, productIcon, srcTemp, visibleBottomborder2, visibleTemp }: SpecialItemsDisplayLayoutBottomProps) => {
    return (
        <Region
            name="bottom"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 33, height: 135, ...layout }}
        >
            <Border
                variant="2"
                name="bottomborder_1"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 13, width: 394, top: 16, height: 110 }}
            />
            {(visibleBottomborder2 ?? false) && (
                <Border
                    variant="2"
                    name="bottomborder_2"
                    tintColor="#141414"
                    layout={{ position: 'absolute', left: 13, width: 394, top: 15, height: 110 }}
                />
            )}
            <Border
                variant="2"
                name="bottomborder_3"
                tintColor="#5a5a5a"
                layout={{ position: 'absolute', left: 13, width: 394, top: 10, height: 110 }}
            />
            <Border
                variant="2"
                tintColor="#262626"
                layout={{ position: 'absolute', left: 13, width: 394, top: 9, height: 110 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 10, width: 374, top: 7, height: 97 }}
                >
                    <Region
                        name="item_scroll_area"
                        layout={{ flexDirection: 'column', gap: 10, width: '100%' }}
                    >
                        {itemsItemScrollArea ?? (
                            <>
                                <SpecialItemsDisplayLayoutItemTitleItem />
                                <SpecialItemsDisplayLayoutItemDescItem />
                            </>
                        )}
                    </Region>
                </ScrollArea>
                {(visibleTemp ?? false) && (
                    <ThemeImage
                        name="temp"
                        src={srcTemp ?? layoutImage('bottom_bar_wired_menu.png')}
                        layout={{ position: 'absolute', right: 24, width: 40, top: 9, height: 40 }}
                    />
                )}
                <WidgetSlot
                    widgetType="product_icon"
                    name="product_icon"
                    layout={{ position: 'absolute', left: 330, width: 40, top: 9, height: 40 }}
                >
                    {productIcon}
                </WidgetSlot>
            </Border>
        </Region>
    );
};
