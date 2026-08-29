import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RelationshipChooserLayoutItemBobbaItem } from './RelationshipChooserLayoutItemBobbaItem';
import { RelationshipChooserLayoutItemHeartItem } from './RelationshipChooserLayoutItemHeartItem';
import { RelationshipChooserLayoutItemNoneItem } from './RelationshipChooserLayoutItemNoneItem';
import { RelationshipChooserLayoutItemSmileItem } from './RelationshipChooserLayoutItemSmileItem';

/** Named region `items` of RelationshipChooserLayout - configured through the parent's `items` prop. */
export interface RelationshipChooserLayoutItemsProps {
    itemsItems?: ReactNode;
    layout?: BoxLayout;
}

export const RelationshipChooserLayoutItems = ({ itemsItems, layout }: RelationshipChooserLayoutItemsProps) => {
    return (
        <Region
            name="items"
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
