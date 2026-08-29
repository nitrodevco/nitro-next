import { ReactNode } from 'react';

import { BoxLayout, WidgetSlot } from '#base/theme';

/** Row template `post_time` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutPostTimeItemProps {
    layout?: BoxLayout;
    postTime?: ReactNode;
}

export const IlluminaChatBubbleLayoutPostTimeItem = ({ layout, postTime }: IlluminaChatBubbleLayoutPostTimeItemProps) => {
    return (
        <WidgetSlot
            widgetType="updating_timestamp"
            name="post_time"
            layout={{ width: 131, height: 16, flexShrink: 0, ...layout }}
        >
            {postTime}
        </WidgetSlot>
    );
};
