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
    tags?: string[];
}

export const RelationshipChooserLayoutItemNoneItem = ({ layout, onItemNone, srcImage, tags }: RelationshipChooserLayoutItemNoneItemProps) => {
    return (
        <Region
            name="item_none"
            tags={tags}
            backgroundColor="#ececec"
            onPointerTap={onItemNone}
            cursor="pointer"
            layout={{ width: 25, height: 15, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="image"
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
    tags?: string[];
}

export const RelationshipChooserLayoutItemHeartItem = ({ layout, onItemHeart, srcImage, tags }: RelationshipChooserLayoutItemHeartItemProps) => {
    return (
        <Region
            name="item_heart"
            tags={tags}
            backgroundColor="#ffffff"
            onPointerTap={onItemHeart}
            cursor="pointer"
            layout={{ width: 25, height: 15, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="image"
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
    tags?: string[];
}

export const RelationshipChooserLayoutItemSmileItem = ({ layout, onItemSmile, srcImage, tags }: RelationshipChooserLayoutItemSmileItemProps) => {
    return (
        <Region
            name="item_smile"
            tags={tags}
            backgroundColor="#ececec"
            onPointerTap={onItemSmile}
            cursor="pointer"
            layout={{ width: 25, height: 15, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="image"
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
    tags?: string[];
}

export const RelationshipChooserLayoutItemBobbaItem = ({ layout, onItemBobba, srcImage, tags }: RelationshipChooserLayoutItemBobbaItemProps) => {
    return (
        <Region
            name="item_bobba"
            tags={tags}
            backgroundColor="#ffffff"
            onPointerTap={onItemBobba}
            cursor="pointer"
            layout={{ width: 25, height: 15, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="image"
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
    tags?: string[];
}

export const RelationshipChooserLayoutItems = ({ itemsItems, layout, tags }: RelationshipChooserLayoutItemsProps) => {
    return (
        <Region
            name="items"
            tags={tags}
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
