import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ConfirmPetBreedingLayoutRarityCategory1ContainerItem } from './ConfirmPetBreedingLayoutRarityCategory1ContainerItem';
import { ConfirmPetBreedingLayoutRarityCategory2ContainerItem } from './ConfirmPetBreedingLayoutRarityCategory2ContainerItem';
import { ConfirmPetBreedingLayoutRarityCategory3ContainerItem } from './ConfirmPetBreedingLayoutRarityCategory3ContainerItem';
import { ConfirmPetBreedingLayoutRarityCategory4ContainerItem } from './ConfirmPetBreedingLayoutRarityCategory4ContainerItem';

/** Named region `category_list` of ConfirmPetBreedingLayout - configured through the parent's `categoryList` prop. */
export interface ConfirmPetBreedingLayoutCategoryListProps {
    itemsCategoryList?: ReactNode;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutCategoryList = ({ itemsCategoryList, layout }: ConfirmPetBreedingLayoutCategoryListProps) => {
    return (
        <Region
            name="category_list"
            layout={{ width: 282, height: 109, flexShrink: 0, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsCategoryList ?? (
                <>
                    <ConfirmPetBreedingLayoutRarityCategory1ContainerItem />
                    <ConfirmPetBreedingLayoutRarityCategory2ContainerItem />
                    <ConfirmPetBreedingLayoutRarityCategory3ContainerItem />
                    <ConfirmPetBreedingLayoutRarityCategory4ContainerItem />
                </>
            )}
        </Region>
    );
};
