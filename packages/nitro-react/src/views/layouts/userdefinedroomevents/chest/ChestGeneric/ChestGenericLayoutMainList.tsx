import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ChestGenericLayoutChestContentsItem } from './ChestGenericLayoutChestContentsItem';
import { ChestGenericLayoutFooterItem } from './ChestGenericLayoutFooterItem';
import { ChestGenericLayoutHeaderItem } from './ChestGenericLayoutHeaderItem';

/** Named region `main_list` of ChestGenericLayout - configured through the parent's `mainList` prop. */
export interface ChestGenericLayoutMainListProps {
    itemsMainList?: ReactNode;
    layout?: BoxLayout;
}

export const ChestGenericLayoutMainList = ({ itemsMainList, layout }: ChestGenericLayoutMainListProps) => {
    return (
        <Region
            name="main_list"
            layout={{ position: 'absolute', left: 0, right: -12, top: 0, height: 428, flexDirection: 'column', ...layout }}
        >
            {itemsMainList ?? (
                <>
                    <ChestGenericLayoutHeaderItem />
                    <ChestGenericLayoutChestContentsItem />
                    <ChestGenericLayoutFooterItem />
                </>
            )}
        </Region>
    );
};
