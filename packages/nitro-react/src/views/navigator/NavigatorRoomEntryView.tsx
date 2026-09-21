import { IRoomInfo } from '@nitrodevco/nitro-packets';

import { useInterpolate } from '#base/context/system';
import { Border, Box, LayoutImage, ThemeImage, ThemeText, useTextureFromUrl } from '#base/theme';

import { RESULTS_MODE_TILES } from './NavigatorCategoryView';
import { getUserCountColor } from './NavigatorRoomEntryUtils';

/** `RoomEntryUtils.getDoorModeIconAsset` - `switch(doorMode - 1)`, an empty asset for an open door. */
const DOOR_MODE_IMAGES: Record<number, string> = {
    1: LayoutImage('navigator/newnavigator_doormode_doorbell_small.png'),
    2: LayoutImage('navigator/newnavigator_doormode_password_small.png'),
    3: LayoutImage('navigator/newnavigator_doormode_invisible_small.png'),
};

export interface NavigatorRoomEntryViewProps {
    room: IRoomInfo;
    mode: number;
    backgroundColor: string;
    onEnter: (room: IRoomInfo) => void;
    onShowInfo?: (room: IRoomInfo) => void;
}

/**
 * Pixi port of views/navigator/NavigatorRoomEntryView.tsx. Border has no onClick of its own
 * (a plain presentational leaf everywhere else in this package), so the whole entry is wrapped
 * in an interactive Box the same way FriendListFriendItem's relationship dropdown already
 * does, rather than widening Border's own contract for this one call site.
 *
 * Every picture in `navigator_entry_row_container` / `navigator_entry_tile_container` is a
 * `newnavigator` library bitmap, not an icon-set style: `room_usercount_icon`,
 * `info_popup_click_region`'s `newnavigator_button_show_room_info`, the runtime-assigned
 * `doormode_icon`, `grouphome_icon` and the `room_pic_placeholder` fallback.
 */
export const NavigatorRoomEntryView = ({ room, mode, backgroundColor, onEnter, onShowInfo }: NavigatorRoomEntryViewProps) => {
    const interpolate = useInterpolate();
    const doorModeImage = DOOR_MODE_IMAGES[room.doorMode];
    const roomPicUrl = room.officialRoomPicRef?.length ? room.officialRoomPicRef : undefined;
    // Image resolves its own texture internally, but this needs to know WHEN it's resolved to
    // pick between it and the default-room icon fallback - read it here too just for that
    // presence check (usePixiTexture/useTextureFromUrl share a module-level cache, so this
    // doesn't trigger a second network fetch, only a second cheap lookup).
    const roomPicTexture = useTextureFromUrl(roomPicUrl);

    const userCount = (
        <Border
            tintColor={getUserCountColor(room.population, room.playersMax)}
            variant="3"
            layout={{ flexDirection: 'row', alignItems: 'center', gap: 1, paddingLeft: 3, paddingRight: 3, width: 40, height: 18 }}
        >
            <ThemeImage
                name="room_usercount_icon"
                src={LayoutImage('shared/newnavigator_icon_usercount.png')}
                layout={{}}
            />
            <ThemeText
                text={String(room.population)}
                textStyle="u_bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Border>
    );

    if (mode === RESULTS_MODE_TILES) {
        return (
            <Box
                cursor="pointer"
                onPointerTap={() => onEnter(room)}
                layout={{ position: 'relative', flexShrink: 0, width: 122, height: 146 }}
            >
                <Border
                    tintColor={backgroundColor}
                    variant="10"
                    layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                />
                <Box layout={{ position: 'absolute', top: 6, left: 7, width: 108, height: 109, justifyContent: 'center', alignItems: 'center' }}>
                    {roomPicTexture
                        ? (
                                <ThemeImage
                                    src={roomPicUrl}
                                    width={106}
                                    height={106}
                                    layout={{}}
                                />
                            )
                        : (
                                <ThemeImage
                                    name="room_pic_placeholder"
                                    src={LayoutImage('shared/newnavigator_default_room.png')}
                                    layout={{}}
                                />
                            )}
                </Box>
                <Box layout={{ position: 'absolute', top: 93, left: 40 }}>{userCount}</Box>
                {doorModeImage && (
                    <ThemeImage
                        name="doormode_icon"
                        src={doorModeImage}
                        layout={{ position: 'absolute', top: 96, left: 92 }}
                    />
                )}
                <Box
                    cursor="pointer"
                    onPointerTap={(event) => {
                        event.stopPropagation();

                        onShowInfo?.(room);
                    }}
                    layout={{ position: 'absolute', top: 120, left: 98 }}
                >
                    <ThemeImage
                        src={LayoutImage('navigator/newnavigator_button_show_room_info.png')}
                        layout={{}}
                    />
                </Box>
                <ThemeText
                    layout={{ position: 'absolute', top: 116, left: 0, width: 100, height: 30 }}
                    text={interpolate(room.name)}
                    textStyle="u_bold"
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 94, breakWords: true }}
                />
            </Box>
        );
    }

    return (
        <Box
            cursor="pointer"
            onPointerTap={() => onEnter(room)}
            layout={{ position: 'relative', flexShrink: 0, width: '100%', height: 20 }}
        >
            <Border
                tintColor={backgroundColor}
                variant="3"
                layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center' }}
            >
                {userCount}
                <ThemeText
                    layout={{ flex: 1, paddingLeft: 4 }}
                    text={interpolate(room.name)}
                    textStyle="u_regular"
                    textOptions={{ fill: '#000000' }}
                />
                <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 1, flexShrink: 0, paddingRight: 2 }}>
                    {doorModeImage && (
                        <ThemeImage
                            name="doormode_icon"
                            src={doorModeImage}
                            layout={{}}
                        />
                    )}
                    {room.groupId > 0 && (
                        <ThemeImage
                            name="grouphome_icon"
                            src={LayoutImage('navigator/newnavigator_icon_group.png')}
                            layout={{}}
                        />
                    )}
                    <Box
                        cursor="pointer"
                        onPointerTap={(event) => {
                            event.stopPropagation();

                            onShowInfo?.(room);
                        }}
                        layout={{}}
                    >
                        <ThemeImage
                            src={LayoutImage('navigator/newnavigator_button_show_room_info.png')}
                            layout={{}}
                        />
                    </Box>
                </Box>
            </Border>
        </Box>
    );
};
