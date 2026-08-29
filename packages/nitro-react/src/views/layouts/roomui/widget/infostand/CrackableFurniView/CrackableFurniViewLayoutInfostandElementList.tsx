import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { CrackableFurniViewLayoutDescriptionSpacerItem } from './CrackableFurniViewLayoutDescriptionSpacerItem';
import { CrackableFurniViewLayoutExpirationTextItem } from './CrackableFurniViewLayoutExpirationTextItem';
import { CrackableFurniViewLayoutHitsRemainingItem } from './CrackableFurniViewLayoutHitsRemainingItem';
import { CrackableFurniViewLayoutImageItem } from './CrackableFurniViewLayoutImageItem';
import { CrackableFurniViewLayoutImagesSpacerItem } from './CrackableFurniViewLayoutImagesSpacerItem';
import { CrackableFurniViewLayoutNameTextItem } from './CrackableFurniViewLayoutNameTextItem';
import { CrackableFurniViewLayoutOwnerRegionItem } from './CrackableFurniViewLayoutOwnerRegionItem';
import { CrackableFurniViewLayoutOwnerSpacerItem } from './CrackableFurniViewLayoutOwnerSpacerItem';
import { CrackableFurniViewLayoutPurchaseButtonsItem } from './CrackableFurniViewLayoutPurchaseButtonsItem';

/** Named region `infostand_element_list` of CrackableFurniViewLayout - configured through the parent's `infostandElementList` prop. */
export interface CrackableFurniViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout }: CrackableFurniViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 251, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <CrackableFurniViewLayoutNameTextItem />
                    <CrackableFurniViewLayoutImagesSpacerItem />
                    <CrackableFurniViewLayoutImageItem />
                    <CrackableFurniViewLayoutOwnerSpacerItem />
                    <CrackableFurniViewLayoutOwnerRegionItem />
                    <CrackableFurniViewLayoutDescriptionSpacerItem />
                    <CrackableFurniViewLayoutHitsRemainingItem />
                    <CrackableFurniViewLayoutExpirationTextItem />
                    <CrackableFurniViewLayoutPurchaseButtonsItem />
                </>
            )}
        </Region>
    );
};
