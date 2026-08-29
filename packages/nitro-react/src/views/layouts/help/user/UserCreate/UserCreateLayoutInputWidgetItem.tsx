import { ReactNode } from 'react';

import { BoxLayout, WidgetSlot } from '#base/theme';

/** Row template `input_widget` of UserCreateLayout - pass real rows through its `items…` slot. */
export interface UserCreateLayoutInputWidgetItemProps {
    inputWidget?: ReactNode;
    layout?: BoxLayout;
}

export const UserCreateLayoutInputWidgetItem = ({ inputWidget, layout }: UserCreateLayoutInputWidgetItemProps) => {
    return (
        <WidgetSlot
            widgetType="illumina_input"
            name="input_widget"
            options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${guide.help.request.user.create.input.help}', 'illumina_input:multiline': 'true' }}
            layout={{ alignSelf: 'stretch', height: 100, flexShrink: 0, ...layout }}
        >
            {inputWidget}
        </WidgetSlot>
    );
};
