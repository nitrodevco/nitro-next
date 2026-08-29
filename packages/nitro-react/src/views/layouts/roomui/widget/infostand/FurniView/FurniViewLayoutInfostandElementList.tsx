import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { FurniViewLayoutChestItemCountItem } from './FurniViewLayoutChestItemCountItem';
import { FurniViewLayoutExpirationTextItem } from './FurniViewLayoutExpirationTextItem';
import { FurniViewLayoutFurniDetailsSpacerItem } from './FurniViewLayoutFurniDetailsSpacerItem';
import { FurniViewLayoutFurniDetailsTextItem } from './FurniViewLayoutFurniDetailsTextItem';
import { FurniViewLayoutGroupDetailsContainerItem } from './FurniViewLayoutGroupDetailsContainerItem';
import { FurniViewLayoutGroupDetailsSpacerItem } from './FurniViewLayoutGroupDetailsSpacerItem';
import { FurniViewLayoutImageContainerItem } from './FurniViewLayoutImageContainerItem';
import { FurniViewLayoutImagesSpacerItem } from './FurniViewLayoutImagesSpacerItem';
import { FurniViewLayoutNameExtraTextItem } from './FurniViewLayoutNameExtraTextItem';
import { FurniViewLayoutNameTextItem } from './FurniViewLayoutNameTextItem';
import { FurniViewLayoutNftIndicatorItem } from './FurniViewLayoutNftIndicatorItem';
import { FurniViewLayoutOwnerRegionItem } from './FurniViewLayoutOwnerRegionItem';
import { FurniViewLayoutOwnerSpacerItem } from './FurniViewLayoutOwnerSpacerItem';
import { FurniViewLayoutPurchaseButtonsItem } from './FurniViewLayoutPurchaseButtonsItem';
import { FurniViewLayoutWiredChestElementsItem } from './FurniViewLayoutWiredChestElementsItem';

/** Named region `infostand_element_list` of FurniViewLayout - configured through the parent's `infostandElementList` prop. */
export interface FurniViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
}

export const FurniViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout }: FurniViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 355, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <FurniViewLayoutNameTextItem />
                    <FurniViewLayoutNameExtraTextItem />
                    <FurniViewLayoutImagesSpacerItem />
                    <FurniViewLayoutWiredChestElementsItem />
                    <FurniViewLayoutImageContainerItem />
                    <FurniViewLayoutNftIndicatorItem />
                    <FurniViewLayoutOwnerSpacerItem />
                    <FurniViewLayoutOwnerRegionItem />
                    <FurniViewLayoutGroupDetailsSpacerItem />
                    <FurniViewLayoutGroupDetailsContainerItem />
                    <FurniViewLayoutExpirationTextItem />
                    <FurniViewLayoutPurchaseButtonsItem />
                    <FurniViewLayoutFurniDetailsSpacerItem />
                    <FurniViewLayoutChestItemCountItem />
                    <FurniViewLayoutFurniDetailsTextItem />
                </>
            )}
        </Region>
    );
};
