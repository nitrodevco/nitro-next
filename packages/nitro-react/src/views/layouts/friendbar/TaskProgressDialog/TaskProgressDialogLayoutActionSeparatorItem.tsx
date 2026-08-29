import { ReactNode } from 'react';

import { BoxLayout, WidgetSlot } from '#base/theme';

/** Row template `action_separator` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutActionSeparatorItemProps {
    actionSeparator?: ReactNode;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutActionSeparatorItem = ({ actionSeparator, layout }: TaskProgressDialogLayoutActionSeparatorItemProps) => {
    return (
        <WidgetSlot
            widgetType="separator"
            name="action_separator"
            layout={{ width: 325, height: 30, flexShrink: 0, ...layout }}
        >
            {actionSeparator}
        </WidgetSlot>
    );
};
