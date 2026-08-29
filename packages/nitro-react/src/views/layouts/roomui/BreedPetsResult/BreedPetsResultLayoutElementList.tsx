import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsResultLayoutButtonListItem } from './BreedPetsResultLayoutButtonListItem';
import { BreedPetsResultLayoutDescriptionItem } from './BreedPetsResultLayoutDescriptionItem';
import { BreedPetsResultLayoutDescriptionSorryItem } from './BreedPetsResultLayoutDescriptionSorryItem';
import { BreedPetsResultLayoutInfoItem } from './BreedPetsResultLayoutInfoItem';
import { BreedPetsResultLayoutInfoSorryItem } from './BreedPetsResultLayoutInfoSorryItem';
import { BreedPetsResultLayoutPreviewButtonlistItem } from './BreedPetsResultLayoutPreviewButtonlistItem';
import { BreedPetsResultLayoutPreviewListItem } from './BreedPetsResultLayoutPreviewListItem';
import { BreedPetsResultLayoutSeparatorItem } from './BreedPetsResultLayoutSeparatorItem';
import { BreedPetsResultLayoutSeparatorItem2 } from './BreedPetsResultLayoutSeparatorItem2';

/** Named region `element_list` of BreedPetsResultLayout - configured through the parent's `elementList` prop. */
export interface BreedPetsResultLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutElementList = ({ itemsElementList, layout }: BreedPetsResultLayoutElementListProps) => {
    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', left: 0, top: 0, minWidth: 274, maxWidth: 274, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <BreedPetsResultLayoutSeparatorItem />
                    <BreedPetsResultLayoutDescriptionItem />
                    <BreedPetsResultLayoutDescriptionSorryItem />
                    <BreedPetsResultLayoutInfoItem />
                    <BreedPetsResultLayoutInfoSorryItem />
                    <BreedPetsResultLayoutPreviewListItem />
                    <BreedPetsResultLayoutPreviewButtonlistItem />
                    <BreedPetsResultLayoutButtonListItem />
                    <BreedPetsResultLayoutSeparatorItem2 />
                </>
            )}
            <Region layout={{ width: 244, height: 1, flexShrink: 0, minHeight: 1, maxHeight: 1 }} />
        </Region>
    );
};
