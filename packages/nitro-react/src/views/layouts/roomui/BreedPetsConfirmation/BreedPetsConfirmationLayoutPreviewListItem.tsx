import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsConfirmationLayoutPlant1ItemlistItem } from './BreedPetsConfirmationLayoutPlant1ItemlistItem';
import { BreedPetsConfirmationLayoutPlant2ItemlistItem } from './BreedPetsConfirmationLayoutPlant2ItemlistItem';

/** Row template `preview_list` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPreviewListItemProps {
    itemsPreviewList?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutPreviewListItem = ({ itemsPreviewList, layout }: BreedPetsConfirmationLayoutPreviewListItemProps) => {
    return (
        <Region
            name="preview_list"
            layout={{ flexShrink: 0, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewList ?? (
                <>
                    <BreedPetsConfirmationLayoutPlant1ItemlistItem />
                    <BreedPetsConfirmationLayoutPlant2ItemlistItem />
                </>
            )}
        </Region>
    );
};
