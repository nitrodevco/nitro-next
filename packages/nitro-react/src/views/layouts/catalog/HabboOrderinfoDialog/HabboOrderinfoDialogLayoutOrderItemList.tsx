import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { HabboOrderinfoDialogLayoutButtonContainerItem } from './HabboOrderinfoDialogLayoutButtonContainerItem';
import { HabboOrderinfoDialogLayoutInfoContainerItem } from './HabboOrderinfoDialogLayoutInfoContainerItem';

/** Named region `orderItemList` of HabboOrderinfoDialogLayout - configured through the parent's `orderItemList` prop. */
export interface HabboOrderinfoDialogLayoutOrderItemListProps {
    itemsOrderItemList?: ReactNode;
    layout?: BoxLayout;
}

export const HabboOrderinfoDialogLayoutOrderItemList = ({ itemsOrderItemList, layout }: HabboOrderinfoDialogLayoutOrderItemListProps) => {
    return (
        <Region
            name="orderItemList"
            layout={{ position: 'absolute', left: 0, minWidth: 284, top: 0, minHeight: 149, flexDirection: 'column', ...layout }}
        >
            {itemsOrderItemList ?? (
                <>
                    <HabboOrderinfoDialogLayoutInfoContainerItem />
                    <HabboOrderinfoDialogLayoutButtonContainerItem />
                </>
            )}
        </Region>
    );
};
