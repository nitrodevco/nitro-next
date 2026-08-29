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
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <HabboOrderinfoDialogLayoutOrderItemList {...orderItemList} />
            </Border>
        </Region>
    );
};
