import { Border, BoxLayout } from '#base/theme';

import { RoomInfoPopupBubbleLayoutHeaderContent, RoomInfoPopupBubbleLayoutHeaderContentProps } from './RoomInfoPopupBubbleLayoutHeaderContent';

/** Row template `header` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutHeaderItemProps {
    headerContent?: RoomInfoPopupBubbleLayoutHeaderContentProps;
    layout?: BoxLayout;
    visibleHeaderContent?: boolean;
}

export const RoomInfoPopupBubbleLayoutHeaderItem = ({ headerContent, layout, visibleHeaderContent }: RoomInfoPopupBubbleLayoutHeaderItemProps) => {
    return (
        <Border
            variant="2"
            name="header"
            layout={{ alignSelf: 'stretch', height: 125, flexShrink: 0, minHeight: 125, maxHeight: 125, ...layout }}
        >
            {(visibleHeaderContent ?? true) && (
                <RoomInfoPopupBubbleLayoutHeaderContent {...headerContent} />
            )}
        </Border>
    );
};
