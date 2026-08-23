import { IRoomInfo } from '@nitrodevco/nitro-packets';

import { useInterpolate } from '#base/context';
import { Border, Box, Image, NitroIcon, Text, useTextureFromUrl } from '#base/theme-pixi';

import { RESULTS_MODE_TILES } from './NavigatorCategoryViewPixi';
import { getUserCountColor } from './NavigatorRoomEntryUtils';

/** RoomEntryUtils.getDoorModeIconAsset - switch(doorMode - 1) */
const DOOR_MODE_ICONS: Record<number, 'icon-nav-doormode-doorbell' | 'icon-nav-doormode-password' | 'icon-nav-doormode-invisible'> = {
    1: 'icon-nav-doormode-doorbell',
    2: 'icon-nav-doormode-password',
    3: 'icon-nav-doormode-invisible',
};

export interface NavigatorRoomEntryViewPixiProps {
    room: IRoomInfo;
    mode: number;
    backgroundColor: string;
    onEnter: (room: IRoomInfo) => void;
    onShowInfo?: (room: IRoomInfo) => void;
}

/**
 * Pixi port of views/navigator/NavigatorRoomEntryView.tsx. Border has no onClick of its own
 * (a plain presentational leaf everywhere else in this package), so the whole entry is wrapped
 * in an interactive Box the same way FriendListFriendItemPixi's relationship dropdown already
 * does, rather than widening Border's own contract for this one call site.
 */
export const NavigatorRoomEntryViewPixi = ({ room, mode, backgroundColor, onEnter, onShowInfo }: NavigatorRoomEntryViewPixiProps) => {
    const interpolate = useInterpolate();
    const doorModeIcon = DOOR_MODE_ICONS[room.doorMode];
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
            <NitroIcon
                icon="icon-nav-usercount"
                layout={{}}
            />
            <Text
                text={String(room.population)}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Border>
    );

    if (mode === RESULTS_MODE_TILES) {
        return (
            <Box
                eventMode="static"
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
                                <Image
                                    src={roomPicUrl}
                                    width={106}
                                    height={106}
                                    layout={{}}
                                />
                            )
                        : (
                                <NitroIcon
                                    icon="icon-nav-default-room"
                                    layout={{}}
                                />
                            )}
                </Box>
                <Box layout={{ position: 'absolute', top: 93, left: 40 }}>{userCount}</Box>
                {doorModeIcon && (
                    <NitroIcon
                        icon={doorModeIcon}
                        layout={{ position: 'absolute', top: 96, left: 92 }}
                    />
                )}
                <Box
                    eventMode="static"
                    cursor="pointer"
                    onPointerTap={(event) => { event.stopPropagation(); onShowInfo?.(room); }}
                    layout={{ position: 'absolute', top: 120, left: 98 }}
                >
                    <NitroIcon
                        icon="icon-nav-room-info"
                        layout={{}}
                    />
                </Box>
                <Text
                    layout={{ position: 'absolute', top: 116, left: 0, width: 100, height: 30 }}
                    text={interpolate(room.name)}
                    textStyle="text-style-u-bold"
                    textOptions={{ fontSize: 10, fill: '#000000', wordWrap: true, wordWrapWidth: 94, breakWords: true }}
                />
            </Box>
        );
    }

    return (
        <Box
            eventMode="static"
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
                <Text
                    layout={{ flex: 1, paddingLeft: 4 }}
                    text={interpolate(room.name)}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#000000' }}
                />
                <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 1, flexShrink: 0, paddingRight: 2 }}>
                    {doorModeIcon && (
                        <NitroIcon
                            icon={doorModeIcon}
                            layout={{}}
                        />
                    )}
                    {room.groupId > 0 && (
                        <NitroIcon
                            icon="icon-nav-room-group"
                            layout={{}}
                        />
                    )}
                    <Box
                        eventMode="static"
                        cursor="pointer"
                        onPointerTap={(event) => { event.stopPropagation(); onShowInfo?.(room); }}
                        layout={{}}
                    >
                        <NitroIcon
                            icon="icon-nav-room-info"
                            layout={{}}
                        />
                    </Box>
                </Box>
            </Border>
        </Box>
    );
};
