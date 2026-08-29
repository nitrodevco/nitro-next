import { Border, BoxLayout, Region } from '#base/theme';

import { HabboOrderinfoDialogLayoutOrderItemList, HabboOrderinfoDialogLayoutOrderItemListProps } from './HabboOrderinfoDialogLayoutOrderItemList';

/** Named region `habbo_orderinfo_dialog` of HabboOrderinfoDialogLayout - configured through the parent's `habboOrderinfoDialog` prop. */
export interface HabboOrderinfoDialogLayoutHabboOrderinfoDialogProps {
    layout?: BoxLayout;
    orderItemList?: HabboOrderinfoDialogLayoutOrderItemListProps;
}

export const HabboOrderinfoDialogLayoutHabboOrderinfoDialog = ({ layout, orderItemList }: HabboOrderinfoDialogLayoutHabboOrderinfoDialogProps) => {
    return (
        <Region
            name="habbo_orderinfo_dialog"
            layout={{ position: 'absolute', left: 0, width: 284, top: 0, height: 149, ...layout }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, width: 284, top: 0, height: 149 }}
            >
                <HabboOrderinfoDialogLayoutOrderItemList {...orderItemList} />
            </Border>
        </Region>
    );
};
