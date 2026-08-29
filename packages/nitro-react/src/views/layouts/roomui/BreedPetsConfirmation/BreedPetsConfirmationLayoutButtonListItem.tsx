import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsConfirmationLayoutAcceptButtonItem } from './BreedPetsConfirmationLayoutAcceptButtonItem';
import { BreedPetsConfirmationLayoutCancelButtonItem } from './BreedPetsConfirmationLayoutCancelButtonItem';
import { BreedPetsConfirmationLayoutSaveButtonItem } from './BreedPetsConfirmationLayoutSaveButtonItem';

/** Row template `button_list` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutButtonListItemProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutButtonListItem = ({ itemsButtonList, layout }: BreedPetsConfirmationLayoutButtonListItemProps) => {
    return (
        <Region
            name="button_list"
            layout={{ flexShrink: 0, minWidth: 254, maxWidth: 254, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtonList ?? (
                <>
                    <BreedPetsConfirmationLayoutCancelButtonItem />
                    <BreedPetsConfirmationLayoutSaveButtonItem />
                    <BreedPetsConfirmationLayoutAcceptButtonItem />
                </>
            )}
        </Region>
    );
};
