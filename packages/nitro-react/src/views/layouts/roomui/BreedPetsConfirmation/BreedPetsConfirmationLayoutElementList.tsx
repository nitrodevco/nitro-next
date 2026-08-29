import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsConfirmationLayoutButtonListItem } from './BreedPetsConfirmationLayoutButtonListItem';
import { BreedPetsConfirmationLayoutDescriptionItem } from './BreedPetsConfirmationLayoutDescriptionItem';
import { BreedPetsConfirmationLayoutInfoItem } from './BreedPetsConfirmationLayoutInfoItem';
import { BreedPetsConfirmationLayoutPreviewListItem } from './BreedPetsConfirmationLayoutPreviewListItem';
import { BreedPetsConfirmationLayoutRequestItem } from './BreedPetsConfirmationLayoutRequestItem';
import { BreedPetsConfirmationLayoutSeparatorItem } from './BreedPetsConfirmationLayoutSeparatorItem';
import { BreedPetsConfirmationLayoutSeparatorItem2 } from './BreedPetsConfirmationLayoutSeparatorItem2';

/** Named region `element_list` of BreedPetsConfirmationLayout - configured through the parent's `elementList` prop. */
export interface BreedPetsConfirmationLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutElementList = ({ itemsElementList, layout }: BreedPetsConfirmationLayoutElementListProps) => {
    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', left: 0, right: -10, top: 0, maxWidth: 272, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <BreedPetsConfirmationLayoutSeparatorItem />
                    <BreedPetsConfirmationLayoutDescriptionItem />
                    <BreedPetsConfirmationLayoutRequestItem />
                    <BreedPetsConfirmationLayoutInfoItem />
                    <BreedPetsConfirmationLayoutPreviewListItem />
                    <BreedPetsConfirmationLayoutSeparatorItem2 />
                    <BreedPetsConfirmationLayoutButtonListItem />
                </>
            )}
            <Region layout={{ alignSelf: 'stretch', height: 1, flexShrink: 0, minWidth: 272 }} />
        </Region>
    );
};
