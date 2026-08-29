import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { InventoryLayoutBuyrenteditemBtnItem } from './InventoryLayoutBuyrenteditemBtnItem';
import { InventoryLayoutExtendrentBtnItem } from './InventoryLayoutExtendrentBtnItem';
import { InventoryLayoutFurniDescriptionItem } from './InventoryLayoutFurniDescriptionItem';
import { InventoryLayoutFurniExtraItem } from './InventoryLayoutFurniExtraItem';
import { InventoryLayoutFurniNameItem } from './InventoryLayoutFurniNameItem';
import { InventoryLayoutGotoRoomBtnItem } from './InventoryLayoutGotoRoomBtnItem';
import { InventoryLayoutOffertotradeBtnItem } from './InventoryLayoutOffertotradeBtnItem';
import { InventoryLayoutOffertotradeCntItem } from './InventoryLayoutOffertotradeCntItem';
import { InventoryLayoutPlaceinroomBtnItem } from './InventoryLayoutPlaceinroomBtnItem';
import { InventoryLayoutSellBtnItem } from './InventoryLayoutSellBtnItem';
import { InventoryLayoutSpacerItem } from './InventoryLayoutSpacerItem';
import { InventoryLayoutUseBtnItem } from './InventoryLayoutUseBtnItem';

/** Named region `preview_element_list` of InventoryLayout - configured through the parent's `previewElementList` prop. */
export interface InventoryLayoutPreviewElementListProps {
    itemsPreviewElementList?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryLayoutPreviewElementList = ({ itemsPreviewElementList, layout }: InventoryLayoutPreviewElementListProps) => {
    return (
        <Region
            name="preview_element_list"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 2, height: 266, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPreviewElementList ?? (
                <>
                    <InventoryLayoutFurniNameItem />
                    <InventoryLayoutFurniDescriptionItem />
                    <InventoryLayoutFurniExtraItem />
                    <InventoryLayoutSpacerItem />
                    <InventoryLayoutPlaceinroomBtnItem />
                    <InventoryLayoutGotoRoomBtnItem />
                    <InventoryLayoutOffertotradeCntItem />
                    <InventoryLayoutOffertotradeBtnItem />
                    <InventoryLayoutSellBtnItem />
                    <InventoryLayoutUseBtnItem />
                    <InventoryLayoutExtendrentBtnItem />
                    <InventoryLayoutBuyrenteditemBtnItem />
                </>
            )}
        </Region>
    );
};
