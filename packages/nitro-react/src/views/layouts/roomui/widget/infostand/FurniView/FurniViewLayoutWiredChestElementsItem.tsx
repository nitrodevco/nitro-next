import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { FurniViewLayoutLockedIconItem } from './FurniViewLayoutLockedIconItem';
import { FurniViewLayoutWiredIconItem } from './FurniViewLayoutWiredIconItem';

/** Row template `wired_chest_elements` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutWiredChestElementsItemProps {
    itemsWiredChestElements?: ReactNode;
    layout?: BoxLayout;
}

export const FurniViewLayoutWiredChestElementsItem = ({ itemsWiredChestElements, layout }: FurniViewLayoutWiredChestElementsItemProps) => {
    return (
        <Region
            name="wired_chest_elements"
            layout={{ width: 31, height: 15, flexShrink: 0, flexDirection: 'row', gap: 3, ...layout }}
        >
            {itemsWiredChestElements ?? (
                <>
                    <FurniViewLayoutLockedIconItem />
                    <FurniViewLayoutWiredIconItem />
                </>
            )}
        </Region>
    );
};
