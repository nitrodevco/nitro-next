import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RoomInfoPopupBubbleLayoutMidBottom, RoomInfoPopupBubbleLayoutMidBottomProps } from './RoomInfoPopupBubbleLayoutMidBottom';

/** Row template `newMid` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutNewMidItemProps {
    itemsProperties?: ReactNode;
    layout?: BoxLayout;
    midBottom?: RoomInfoPopupBubbleLayoutMidBottomProps;
    visibleMid?: boolean;
    visibleMidBottom?: boolean;
    visibleProperties?: boolean;
}

export const RoomInfoPopupBubbleLayoutNewMidItem = ({ itemsProperties, layout, midBottom, visibleMid, visibleMidBottom, visibleProperties }: RoomInfoPopupBubbleLayoutNewMidItemProps) => {
    return (
        <Region
            name="newMid"
            layout={{ alignSelf: 'stretch', height: 80, flexShrink: 0, ...layout }}
        >
            {(visibleMid ?? true) && (
                <Region
                    name="mid"
                    layout={{ position: 'absolute', left: 0, width: 174, top: 0, height: 65 }}
                >
                    {(visibleProperties ?? true) && (
                        <Region
                            name="properties"
                            layout={{ position: 'absolute', left: 0, width: 263, top: 0, bottom: 0, flexDirection: 'column' }}
                        >
                            {itemsProperties}
                        </Region>
                    )}
                </Region>
            )}
            {(visibleMidBottom ?? true) && (
                <RoomInfoPopupBubbleLayoutMidBottom {...midBottom} />
            )}
        </Region>
    );
};
