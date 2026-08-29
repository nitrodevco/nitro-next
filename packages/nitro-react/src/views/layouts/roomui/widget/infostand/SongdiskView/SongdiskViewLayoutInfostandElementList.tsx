import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { SongdiskViewLayoutCreatornameContainerItem } from './SongdiskViewLayoutCreatornameContainerItem';
import { SongdiskViewLayoutDescriptionSpacerItem } from './SongdiskViewLayoutDescriptionSpacerItem';
import { SongdiskViewLayoutExpirationTextItem } from './SongdiskViewLayoutExpirationTextItem';
import { SongdiskViewLayoutImageItem } from './SongdiskViewLayoutImageItem';
import { SongdiskViewLayoutImagesSpacerItem } from './SongdiskViewLayoutImagesSpacerItem';
import { SongdiskViewLayoutNameTextItem } from './SongdiskViewLayoutNameTextItem';
import { SongdiskViewLayoutOwnerRegionItem } from './SongdiskViewLayoutOwnerRegionItem';
import { SongdiskViewLayoutOwnerSpacerItem } from './SongdiskViewLayoutOwnerSpacerItem';
import { SongdiskViewLayoutPurchaseButtonsItem } from './SongdiskViewLayoutPurchaseButtonsItem';
import { SongdiskViewLayoutTracknameContainerItem } from './SongdiskViewLayoutTracknameContainerItem';

/** Named region `infostand_element_list` of SongdiskViewLayout - configured through the parent's `infostandElementList` prop. */
export interface SongdiskViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
}

export const SongdiskViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout }: SongdiskViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 271, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <SongdiskViewLayoutNameTextItem />
                    <SongdiskViewLayoutImagesSpacerItem />
                    <SongdiskViewLayoutImageItem />
                    <SongdiskViewLayoutOwnerSpacerItem />
                    <SongdiskViewLayoutOwnerRegionItem />
                    <SongdiskViewLayoutDescriptionSpacerItem />
                    <SongdiskViewLayoutTracknameContainerItem />
                    <SongdiskViewLayoutCreatornameContainerItem />
                    <SongdiskViewLayoutExpirationTextItem />
                    <SongdiskViewLayoutPurchaseButtonsItem />
                </>
            )}
        </Region>
    );
};
