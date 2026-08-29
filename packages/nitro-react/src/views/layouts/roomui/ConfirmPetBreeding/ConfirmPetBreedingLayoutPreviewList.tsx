import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ConfirmPetBreedingLayoutPet1ItemlistItem } from './ConfirmPetBreedingLayoutPet1ItemlistItem';
import { ConfirmPetBreedingLayoutPet2ItemlistItem } from './ConfirmPetBreedingLayoutPet2ItemlistItem';

/** Named region `preview_list` of ConfirmPetBreedingLayout - configured through the parent's `previewList` prop. */
export interface ConfirmPetBreedingLayoutPreviewListProps {
    itemsPreviewList?: ReactNode;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutPreviewList = ({ itemsPreviewList, layout }: ConfirmPetBreedingLayoutPreviewListProps) => {
    return (
        <Region
            name="preview_list"
            layout={{ position: 'absolute', left: 10, top: 7, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewList ?? (
                <>
                    <ConfirmPetBreedingLayoutPet1ItemlistItem />
                    <ConfirmPetBreedingLayoutPet2ItemlistItem />
                </>
            )}
        </Region>
    );
};
