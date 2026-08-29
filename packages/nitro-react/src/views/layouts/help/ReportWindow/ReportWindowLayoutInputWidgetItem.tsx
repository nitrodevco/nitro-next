import { ReactNode } from 'react';

import { BoxLayout, WidgetSlot } from '#base/theme';

/** Row template `input_widget` of ReportWindowLayout - pass real rows through its `items…` slot. */
export interface ReportWindowLayoutInputWidgetItemProps {
    inputWidget?: ReactNode;
    layout?: BoxLayout;
}

export const ReportWindowLayoutInputWidgetItem = ({ inputWidget, layout }: ReportWindowLayoutInputWidgetItemProps) => {
    return (
        <WidgetSlot
            widgetType="illumina_input"
            name="input_widget"
            options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${guide.help.request.emergency.input.empty}', 'illumina_input:multiline': 'true' }}
            layout={{ width: 270, height: 100, flexShrink: 0, ...layout }}
        >
            {inputWidget}
        </WidgetSlot>
    );
};
