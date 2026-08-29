import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

import { NavigatorFrame2LayoutRoomInfoContainer, NavigatorFrame2LayoutRoomInfoContainerProps } from './NavigatorFrame2LayoutRoomInfoContainer';

/** Row template `navigator_entry_row_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNavigatorEntryRowContainerItemProps {
    goToRoomRegion?: ReactNode;
    layout?: BoxLayout;
    onGoToRoomRegion?: () => void;
    roomInfoContainer?: NavigatorFrame2LayoutRoomInfoContainerProps;
    visibleGoToRoomRegion?: boolean;
    visibleRoomInfoContainer?: boolean;
}

export const NavigatorFrame2LayoutNavigatorEntryRowContainerItem = ({ goToRoomRegion, layout, onGoToRoomRegion, roomInfoContainer, visibleGoToRoomRegion, visibleRoomInfoContainer }: NavigatorFrame2LayoutNavigatorEntryRowContainerItemProps) => {
    return (
        <Border
            variant="3"
            name="navigator_entry_row_container"
            layout={{ width: 383, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleRoomInfoContainer ?? true) && (
                <NavigatorFrame2LayoutRoomInfoContainer {...roomInfoContainer} />
            )}
            {(visibleGoToRoomRegion ?? true) && (
                <Region
                    name="go_to_room_region"
                    onPointerTap={onGoToRoomRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 357, top: 0, height: 20 }}
                >
                    {goToRoomRegion}
                </Region>
            )}
        </Border>
    );
};
