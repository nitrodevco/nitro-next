import { Border, BoxLayout, Button, Region } from '#base/theme';

/** Row template `info_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutInfoContItemProps {
    captionHasEventTxt?: string;
    captionOwnerInRoomTxt?: string;
    captionOwnerNameTxt?: string;
    captionUserCountTxt?: string;
    layout?: BoxLayout;
    onChatlogBut?: () => void;
    onEditInHkBut?: () => void;
    onEnterRoomBut?: () => void;
    visibleChatlogBut?: boolean;
    visibleEditInHkBut?: boolean;
    visibleEnterRoomBut?: boolean;
    visibleHasEventTxt?: boolean;
    visibleOwnerInRoomTxt?: boolean;
    visibleOwnerNameTxt?: boolean;
    visibleUserCountTxt?: boolean;
}

export const RoomtoolFrameLayoutInfoContItem = ({ captionHasEventTxt, captionOwnerInRoomTxt, captionOwnerNameTxt, captionUserCountTxt, layout, onChatlogBut, onEditInHkBut, onEnterRoomBut, visibleChatlogBut, visibleEditInHkBut, visibleEnterRoomBut, visibleHasEventTxt, visibleOwnerInRoomTxt, visibleOwnerNameTxt, visibleUserCountTxt }: RoomtoolFrameLayoutInfoContItemProps) => {
    return (
        <Border
            variant="0"
            name="info_cont"
            layout={{ width: 230, height: 74, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 5, width: 80, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Room owner:
            </Region>
            <Region layout={{ position: 'absolute', left: 5, width: 90, top: 15, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Users in room:
            </Region>
            <Region layout={{ position: 'absolute', left: 5, width: 90, top: 28, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Owner in room:
            </Region>
            <Region layout={{ position: 'absolute', left: 5, width: 90, top: 41, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Has event:
            </Region>
            {(visibleOwnerNameTxt ?? true) && (
                <Region
                    name="owner_name_txt"
                    layout={{ position: 'absolute', left: 85, width: 71, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionOwnerNameTxt ?? 'sulka'}
                </Region>
            )}
            {(visibleOwnerInRoomTxt ?? true) && (
                <Region
                    name="owner_in_room_txt"
                    layout={{ position: 'absolute', left: 100, width: 40, top: 28, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionOwnerInRoomTxt ?? 'yes'}
                </Region>
            )}
            {(visibleUserCountTxt ?? true) && (
                <Region
                    name="user_count_txt"
                    layout={{ position: 'absolute', left: 100, width: 40, top: 15, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionUserCountTxt ?? '18'}
                </Region>
            )}
            {(visibleHasEventTxt ?? true) && (
                <Region
                    name="has_event_txt"
                    layout={{ position: 'absolute', left: 100, width: 40, top: 41, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionHasEventTxt ?? 'no'}
                </Region>
            )}
            {(visibleEnterRoomBut ?? true) && (
                <Button
                    variant="0"
                    name="enter_room_but"
                    onPointerTap={onEnterRoomBut}
                    layout={{ position: 'absolute', left: 155, width: 70, top: 4, height: 21, minWidth: 70, maxWidth: 70 }}
                >
                    Enter room
                </Button>
            )}
            {(visibleChatlogBut ?? true) && (
                <Button
                    variant="0"
                    name="chatlog_but"
                    onPointerTap={onChatlogBut}
                    layout={{ position: 'absolute', left: 155, width: 70, top: 26, height: 21, minWidth: 70, maxWidth: 70 }}
                >
                    Chatlog
                </Button>
            )}
            {(visibleEditInHkBut ?? true) && (
                <Button
                    variant="0"
                    name="edit_in_hk_but"
                    onPointerTap={onEditInHkBut}
                    layout={{ position: 'absolute', left: 155, width: 70, top: 48, height: 21, minWidth: 70, maxWidth: 70 }}
                >
                    Edit in HK
                </Button>
            )}
        </Border>
    );
};
