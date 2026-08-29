import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { NavigatorFrame2LayoutRoomUsercountIconItem2 } from './NavigatorFrame2LayoutRoomUsercountIconItem2';
import { NavigatorFrame2LayoutRoomUsercountItem2 } from './NavigatorFrame2LayoutRoomUsercountItem2';

/** Named region `room_info_container` of NavigatorFrame2Layout - configured through the parent's `roomInfoContainer` prop. */
export interface NavigatorFrame2LayoutRoomInfoContainerProps {
    captionRoomName?: string;
    itemsUsercount?: ReactNode;
    layout?: BoxLayout;
    onInfoPopupClickRegion?: () => void;
    srcDoormodeIcon?: string;
    srcGrouphomeIcon?: string;
}

export const NavigatorFrame2LayoutRoomInfoContainer = ({ captionRoomName, itemsUsercount, layout, onInfoPopupClickRegion, srcDoormodeIcon, srcGrouphomeIcon }: NavigatorFrame2LayoutRoomInfoContainerProps) => {
    return (
        <Region
            name="room_info_container"
            layout={{ position: 'absolute', left: 0, right: 2, top: 1, height: 18, ...layout }}
        >
            <Border
                variant="3"
                name="room_info_usercount_border"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 18, justifyContent: 'center' }}
            >
                <Region
                    name="usercount"
                    layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 31, top: 1, height: 15, flexDirection: 'row', gap: 1 }}
                >
                    {itemsUsercount ?? (
                        <>
                            <NavigatorFrame2LayoutRoomUsercountIconItem2 />
                            <NavigatorFrame2LayoutRoomUsercountItem2 />
                        </>
                    )}
                </Region>
            </Border>
            <Region
                name="room_name"
                layout={{ position: 'absolute', left: 44, right: 55, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionRoomName ?? 'Room Name PH'}
            </Region>
            <Region
                name="info_popup_click_region"
                onPointerTap={onInfoPopupClickRegion}
                cursor="pointer"
                layout={{ position: 'absolute', right: 4, width: 18, top: 0, height: 18 }}
            >
                <ThemeImage
                    src={layoutImage('newnavigator_button_show_room_info.png')}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                />
            </Region>
            <ThemeImage
                name="doormode_icon"
                src={srcDoormodeIcon}
                layout={{ position: 'absolute', left: 324, width: 16, top: 2, height: 16 }}
            />
            <ThemeImage
                name="grouphome_icon"
                src={srcGrouphomeIcon ?? layoutImage('newnavigator_icon_group.png')}
                layout={{ position: 'absolute', left: 341, width: 16, top: 2, height: 16 }}
            />
        </Region>
    );
};
