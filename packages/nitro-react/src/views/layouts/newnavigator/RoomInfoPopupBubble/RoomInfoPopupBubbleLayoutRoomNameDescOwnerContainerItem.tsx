import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `room_name_desc_owner_container` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutRoomNameDescOwnerContainerItemProps {
    captionRoomDesc?: string;
    captionRoomName?: string;
    layout?: BoxLayout;
    visibleRoomDesc?: boolean;
    visibleRoomName?: boolean;
}

export const RoomInfoPopupBubbleLayoutRoomNameDescOwnerContainerItem = ({ captionRoomDesc, captionRoomName, layout, visibleRoomDesc, visibleRoomName }: RoomInfoPopupBubbleLayoutRoomNameDescOwnerContainerItemProps) => {
    return (
        <Region
            name="room_name_desc_owner_container"
            layout={{ width: 219, alignSelf: 'stretch', flexShrink: 0, ...layout }}
        >
            {(visibleRoomName ?? true) && (
                <Region
                    name="room_name"
                    layout={{ position: 'absolute', left: 6, right: -1, top: 0, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRoomName ?? 'ROOM NAME PLACEHOLDER LOREM IPSUM DOLOR SIT AMET'}
                        textStyle="text-style-u-bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 214 }}
                    />
                </Region>
            )}
            {(visibleRoomDesc ?? true) && (
                <Region
                    name="room_desc"
                    layout={{ position: 'absolute', left: 5, right: 0, bottom: -1, height: 80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRoomDesc ?? 'ROOM DESC PLACEHOLDER LOREM IPSUM DOLOR SIT AMET'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 214 }}
                    />
                </Region>
            )}
        </Region>
    );
};
