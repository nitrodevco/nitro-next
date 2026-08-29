import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `3070_toolbar_hover_xml` (layout "toolbar_hover", 252x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ToolbarHoverLayoutProps {
    itemList?: ToolbarHoverLayoutItemListProps;
    layout?: BoxLayout;
}

export const ToolbarHoverLayout = ({ itemList, layout }: ToolbarHoverLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 252, height: 36, ...layout }}>
            <Region
                dropShadow={{ distance: 3, alpha: 0.6 }}
                layout={{ position: 'absolute', left: 0, width: 252, top: 0, height: 36 }}
            >
                <Border
                    variant="6"
                    name="toolbar_hover"
                    tintColor="#79756e"
                    layout={{ width: '100%', height: '100%' }}
                >
                    <ToolbarHoverLayoutItemList
                        tags={[ 'SIMPLE_ITEM' ]}
                        {...itemList}
                    />
                </Border>
            </Region>
        </Region>
    );
};

/** Row template `item_basic` of ToolbarHoverLayout - pass real rows through its `items…` slot. */
export interface ToolbarHoverLayoutItemBasicItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onItemBasic?: () => void;
    tags?: string[];
}

export const ToolbarHoverLayoutItemBasicItem = ({ captionText, layout, onItemBasic, tags }: ToolbarHoverLayoutItemBasicItemProps) => {
    return (
        <Region
            name="item_basic"
            tags={tags}
            onPointerTap={onItemBasic}
            cursor="pointer"
            layout={{ width: 238, height: 25, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="background"
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 0, width: 238, top: 0, height: 20 }}
            />
            <Region
                name="text"
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

/** Named region `item_list` of ToolbarHoverLayout - configured through the parent's `itemList` prop. */
export interface ToolbarHoverLayoutItemListProps {
    itemsItemList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ToolbarHoverLayoutItemList = ({ itemsItemList, layout, tags }: ToolbarHoverLayoutItemListProps) => {
    return (
        <Region
            name="item_list"
            tags={tags}
            layout={{ position: 'absolute', left: 7, minWidth: 245, top: 7, minHeight: 25, flexDirection: 'column', ...layout }}
        >
            {itemsItemList ?? (
                <ToolbarHoverLayoutItemBasicItem tags={[ 'SIMPLE_ITEM' ]} />
            )}
        </Region>
    );
};
