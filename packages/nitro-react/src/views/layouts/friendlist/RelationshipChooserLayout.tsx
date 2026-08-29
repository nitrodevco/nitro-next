import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1508_relationship_chooser_xml` (layout "relationship_chooser", 30x68) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RelationshipChooserLayoutProps {
    items?: RelationshipChooserLayoutItemsProps;
    layout?: BoxLayout;
}

export const RelationshipChooserLayout = ({ items, layout }: RelationshipChooserLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 68, ...layout }}>
            <Border
                variant="100"
                params={131072}
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 68 }}
            >
                <RelationshipChooserLayoutItems {...items} />
            </Border>
        </Region>
    );
};

/** Row template `item_none` of RelationshipChooserLayout - pass real rows through its `items…` slot. */
export interface RelationshipChooserLayoutItemNoneItemProps {
    layout?: BoxLayout;
    onItemNone?: () => void;
    srcImage?: string;
}

export const RelationshipChooserLayoutItemNoneItem = ({ layout, onItemNone, srcImage }: RelationshipChooserLayoutItemNoneItemProps) => {
    return (
        <Region
            name="item_none"
            params={17}
            backgroundColor="#ececec"
            onPointerTap={onItemNone}
            cursor="pointer"
            layout={{ width: 25, height: 15, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="image"
                params={16}
                src={srcImage ?? layoutImage('relationship_status_none.png')}
                layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
            />
        </Region>
    );
};

/** Row template `item_heart` of RelationshipChooserLayout - pass real rows through its `items…` slot. */
export interface RelationshipChooserLayoutItemHeartItemProps {
    layout?: BoxLayout;
    onItemHeart?: () => void;
    srcImage?: string;
}

export const RelationshipChooserLayoutItemHeartItem = ({ layout, onItemHeart, srcImage }: RelationshipChooserLayoutItemHeartItemProps) => {
    return (
        <Region
            name="item_heart"
            params={17}
            backgroundColor="#ffffff"
            onPointerTap={onItemHeart}
            cursor="pointer"
            layout={{ width: 25, height: 15, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="image"
                params={16}
                src={srcImage ?? layoutImage('relationship_status_heart.png')}
                layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
            />
        </Region>
    );
};

/** Row template `item_smile` of RelationshipChooserLayout - pass real rows through its `items…` slot. */
export interface RelationshipChooserLayoutItemSmileItemProps {
    layout?: BoxLayout;
    onItemSmile?: () => void;
    srcImage?: string;
}

export const RelationshipChooserLayoutItemSmileItem = ({ layout, onItemSmile, srcImage }: RelationshipChooserLayoutItemSmileItemProps) => {
    return (
        <Region
            name="item_smile"
            params={17}
            backgroundColor="#ececec"
            onPointerTap={onItemSmile}
            cursor="pointer"
            layout={{ width: 25, height: 15, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="image"
                params={16}
                src={srcImage ?? layoutImage('relationship_status_smile.png')}
                layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
            />
        </Region>
    );
};

/** Row template `item_bobba` of RelationshipChooserLayout - pass real rows through its `items…` slot. */
export interface RelationshipChooserLayoutItemBobbaItemProps {
    layout?: BoxLayout;
    onItemBobba?: () => void;
    srcImage?: string;
}

export const RelationshipChooserLayoutItemBobbaItem = ({ layout, onItemBobba, srcImage }: RelationshipChooserLayoutItemBobbaItemProps) => {
    return (
        <Region
            name="item_bobba"
            params={17}
            backgroundColor="#ffffff"
            onPointerTap={onItemBobba}
            cursor="pointer"
            layout={{ width: 25, height: 15, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="image"
                params={16}
                src={srcImage ?? layoutImage('relationship_status_bobba.png')}
                layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
            />
        </Region>
    );
};

/** Named region `items` of RelationshipChooserLayout - configured through the parent's `items` prop. */
export interface RelationshipChooserLayoutItemsProps {
    itemsItems?: ReactNode;
    layout?: BoxLayout;
}

export const RelationshipChooserLayoutItems = ({ itemsItems, layout }: RelationshipChooserLayoutItemsProps) => {
    return (
        <Region
            name="items"
            params={16}
            layout={{ position: 'absolute', left: 2, width: 25, top: 2, height: 63, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsItems ?? (
                <>
                    <RelationshipChooserLayoutItemNoneItem />
                    <RelationshipChooserLayoutItemHeartItem />
                    <RelationshipChooserLayoutItemSmileItem />
                    <RelationshipChooserLayoutItemBobbaItem />
                </>
            )}
        </Region>
    );
};
