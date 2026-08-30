import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `room_group_owner_container` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutRoomGroupOwnerContainerItemProps {
    captionGroupName?: string;
    captionOwnerName?: string;
    layout?: BoxLayout;
    onRoomGroupRegion?: () => void;
    onRoomOwnerRegion?: () => void;
    visibleGroupName?: boolean;
    visibleOwnerName?: boolean;
    visibleRoomGroupRegion?: boolean;
    visibleRoomOwnerRegion?: boolean;
}

export const RoomInfoPopupBubbleLayoutRoomGroupOwnerContainerItem = ({ captionGroupName, captionOwnerName, layout, onRoomGroupRegion, onRoomOwnerRegion, visibleGroupName, visibleOwnerName, visibleRoomGroupRegion, visibleRoomOwnerRegion }: RoomInfoPopupBubbleLayoutRoomGroupOwnerContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_group_owner_container"
            layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, ...layout }}
        >
            {(visibleRoomGroupRegion ?? true) && (
                <Region
                    name="room_group_region"
                    tooltip={t('navigator.tooltip.groupinfo.owner')}
                    onPointerTap={onRoomGroupRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: -1, width: 170, top: 3, bottom: -3 }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_icon_group.png')}
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                    />
                    {(visibleGroupName ?? true) && (
                        <ThemeText
                            text={captionGroupName ?? 'The Bubblers'}
                            textStyle="text-style-u-bold"
                            textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
                            name="group_name"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 20, width: 170, top: 0, bottom: -3 }}
                        />
                    )}
                </Region>
            )}
            {(visibleRoomOwnerRegion ?? true) && (
                <Region
                    name="room_owner_region"
                    tooltip={t('navigator.tooltip.roominfo.owner')}
                    onPointerTap={onRoomOwnerRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 5, width: 150, top: 3, bottom: -3 }}
                >
                    <ThemeImage
                        src={layoutImage('friend_bar_friendlist_eye.png')}
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                    />
                    {(visibleOwnerName ?? true) && (
                        <ThemeText
                            text={captionOwnerName ?? 'Macklebee'}
                            textStyle="text-style-u-bold"
                            textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                            name="owner_name"
                            verticalAlign="top"
                            layout={{ position: 'absolute', right: 0, width: 130, top: -2, bottom: -1 }}
                        />
                    )}
                </Region>
            )}
        </Region>
    );
};
