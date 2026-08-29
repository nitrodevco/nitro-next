import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RentableBotViewLayoutDescriptionContainerItem } from './RentableBotViewLayoutDescriptionContainerItem';
import { RentableBotViewLayoutDescriptionTextItem } from './RentableBotViewLayoutDescriptionTextItem';
import { RentableBotViewLayoutHanditemSpacerItem } from './RentableBotViewLayoutHanditemSpacerItem';
import { RentableBotViewLayoutHanditemTextItem } from './RentableBotViewLayoutHanditemTextItem';
import { RentableBotViewLayoutImagesSpacerItem } from './RentableBotViewLayoutImagesSpacerItem';
import { RentableBotViewLayoutNameTextItem } from './RentableBotViewLayoutNameTextItem';
import { RentableBotViewLayoutOwnerTextItem } from './RentableBotViewLayoutOwnerTextItem';

/** Named region `infostand_element_list` of RentableBotViewLayout - configured through the parent's `infostandElementList` prop. */
export interface RentableBotViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
}

export const RentableBotViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout }: RentableBotViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 330, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <RentableBotViewLayoutNameTextItem />
                    <RentableBotViewLayoutImagesSpacerItem />
                    <RentableBotViewLayoutDescriptionContainerItem />
                    <RentableBotViewLayoutHanditemSpacerItem />
                    <RentableBotViewLayoutHanditemTextItem />
                    <RentableBotViewLayoutDescriptionTextItem />
                    <RentableBotViewLayoutOwnerTextItem />
                </>
            )}
        </Region>
    );
};
