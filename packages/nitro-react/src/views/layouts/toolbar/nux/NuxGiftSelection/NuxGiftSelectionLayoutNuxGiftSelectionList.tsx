import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { NuxGiftSelectionLayoutNuxGiftOptionItem } from './NuxGiftSelectionLayoutNuxGiftOptionItem';
import { NuxGiftSelectionLayoutNuxGiftOptionItem2 } from './NuxGiftSelectionLayoutNuxGiftOptionItem2';
import { NuxGiftSelectionLayoutNuxGiftOptionItem3 } from './NuxGiftSelectionLayoutNuxGiftOptionItem3';

/** Named region `nux_gift_selection_list` of NuxGiftSelectionLayout - configured through the parent's `nuxGiftSelectionList` prop. */
export interface NuxGiftSelectionLayoutNuxGiftSelectionListProps {
    itemsNuxGiftSelectionList?: ReactNode;
    layout?: BoxLayout;
}

export const NuxGiftSelectionLayoutNuxGiftSelectionList = ({ itemsNuxGiftSelectionList, layout }: NuxGiftSelectionLayoutNuxGiftSelectionListProps) => {
    return (
        <Region
            name="nux_gift_selection_list"
            layout={{ position: 'absolute', marginLeft: -6.5, marginRight: 6.5, minWidth: 374, top: 78, minHeight: 443, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsNuxGiftSelectionList ?? (
                <>
                    <NuxGiftSelectionLayoutNuxGiftOptionItem />
                    <NuxGiftSelectionLayoutNuxGiftOptionItem2 />
                    <NuxGiftSelectionLayoutNuxGiftOptionItem3 />
                </>
            )}
        </Region>
    );
};
