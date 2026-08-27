import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `3070_toolbar_hover_xml` (layout "toolbar_hover", 252x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ToolbarHoverLayoutProps {
    itemsItemList?: ReactNode;
    layout?: BoxLayout;
}

export const ToolbarHoverLayout = ({ itemsItemList, layout }: ToolbarHoverLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 252, height: 36, ...layout }}>
            <Border
                variant="6"
                name="toolbar_hover"
                params={147457}
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 0, width: 252, top: 0, height: 36 }}
            >
                <Region
                    name="item_list"
                    tags={[ 'SIMPLE_ITEM' ]}
                    params={8519698}
                    layout={{ position: 'absolute', left: 7, width: 245, top: 7, height: 25, flexDirection: 'column' }}
                >
                    {itemsItemList ?? (
                        <ToolbarHoverLayoutItemBasicItem />
                    )}
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `item_basic` of ToolbarHoverLayout - pass real rows through its `items…` slot. */
export interface ToolbarHoverLayoutItemBasicItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onItemBasic?: () => void;
}

export const ToolbarHoverLayoutItemBasicItem = ({ captionText, layout, onItemBasic }: ToolbarHoverLayoutItemBasicItemProps) => {
    return (
        <Region
            name="item_basic"
            tags={[ 'SIMPLE_ITEM' ]}
            params={17}
            onPointerTap={onItemBasic}
            cursor="pointer"
            layout={{ width: 238, height: 25, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="background"
                params={16}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 0, width: 238, top: 0, height: 20 }}
            />
            <Region
                name="text"
                params={18}
                layout={{ position: 'absolute', left: 7, width: 75, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionText ?? 'Sample item'}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};
