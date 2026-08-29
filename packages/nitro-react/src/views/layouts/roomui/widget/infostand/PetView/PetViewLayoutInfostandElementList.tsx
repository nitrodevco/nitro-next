import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PetViewLayoutAgeTextItem } from './PetViewLayoutAgeTextItem';
import { PetViewLayoutBreedTextItem } from './PetViewLayoutBreedTextItem';
import { PetViewLayoutImageContainerItem } from './PetViewLayoutImageContainerItem';
import { PetViewLayoutNameTextItem } from './PetViewLayoutNameTextItem';
import { PetViewLayoutOwnerTextItem } from './PetViewLayoutOwnerTextItem';
import { PetViewLayoutPetrespectContainerItem } from './PetViewLayoutPetrespectContainerItem';
import { PetViewLayoutStatusContainerItem } from './PetViewLayoutStatusContainerItem';

/** Named region `infostand_element_list` of PetViewLayout - configured through the parent's `infostandElementList` prop. */
export interface PetViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
}

export const PetViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout }: PetViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            layout={{ position: 'absolute', left: 10, width: 173, top: 10, height: 270, flexDirection: 'column', ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <PetViewLayoutNameTextItem />
                    <PetViewLayoutBreedTextItem />
                    <PetViewLayoutImageContainerItem />
                    <PetViewLayoutStatusContainerItem />
                    <PetViewLayoutPetrespectContainerItem />
                    <PetViewLayoutAgeTextItem />
                    <PetViewLayoutOwnerTextItem />
                </>
            )}
        </Region>
    );
};
