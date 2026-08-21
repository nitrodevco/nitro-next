import type { IRoomInfo } from '@nitrodevco/nitro-packets';

import { useInterpolate } from '#base/context';
import { Border, NitroIcon } from '#base/theme';

import { RESULTS_MODE_TILES } from './NavigatorCategoryView';
import { getUserCountColor } from './NavigatorRoomEntryUtils';

/** RoomEntryUtils.getDoorModeIconAsset — switch(doorMode - 1) */
const DOOR_MODE_ICONS: Record<number, string> = {
    1: 'icon-nav-doormode-doorbell',
    2: 'icon-nav-doormode-password',
    3: 'icon-nav-doormode-invisible'
};

type NavigatorRoomEntryViewProps = {
    room: IRoomInfo;
    mode: number;
    /** modulated background from CategoryElementFactory's alternating accumulator */
    backgroundColor: string;
    onEnter: (room: IRoomInfo) => void;
    onShowInfo?: (room: IRoomInfo) => void;
}

export const NavigatorRoomEntryView = ({ room, mode, backgroundColor, onEnter, onShowInfo }: NavigatorRoomEntryViewProps) => {
    const interpolate = useInterpolate();
    const doorModeIcon = DOOR_MODE_ICONS[room.doorMode];

    /**
     * room_info_usercount_border — border style="3" color="0x00" 40x18,
     * holding icon_usercount (13x14) and a u_bold label in 0xffffff
     */
    const userCount = (
        <Border className="flex items-center gap-0.25 px-0.75 w-10 h-4.5" tintColor={getUserCountColor(room.population, room.playersMax)} variant="3">
            <NitroIcon icon="icon-nav-usercount" />
            <span className="text-style-u-bold text-white">{room.population}</span>
        </Border>
    );

    if (mode === RESULTS_MODE_TILES) {
        /* navigator_entry_tile — border style="10" color="0x0ebe9df", 122x146 */
        return (
            <Border
                className="relative shrink-0 w-30.5 h-36.5 cursor-pointer"
                tintColor={backgroundColor}
                variant="10"
                onClick={() => onEnter(room)}>
                {/* black thumbnail backdrop — container 108x109 at 7,6 */}
                <div className="absolute top-1.5 left-1.75 w-27 h-27.25 bg-black" />
                {/* room_pic_placeholder — 106x106 at 8,7, asset newnavigator_default_room */}
                <div className="absolute top-1.75 left-2 flex items-center justify-center w-26.5 h-26.5 overflow-hidden">
                    {room.officialRoomPicRef?.length
                        ? <img alt="" className="max-w-full max-h-full pixel-art" src={room.officialRoomPicRef} />
                        : <NitroIcon icon="icon-nav-default-room" />}
                </div>
                {/* room_info_usercount_border at 40,93 */}
                <div className="absolute top-23.25 left-10">{userCount}</div>
                {/* doormode_icon — 16x14 at 92,96 */}
                {doorModeIcon && <NitroIcon className="absolute top-24 left-23" icon={doorModeIcon} />}
                {/* info_popup_click_region — 18x18 at 98,120 */}
                <NitroIcon
                    className="absolute top-30 left-24.5 cursor-pointer"
                    icon="icon-nav-room-info"
                    onClick={event => { event.stopPropagation(); onShowInfo?.(room); }} />
                {/* room_name — 100x30 at 0,116, font_size 10, u_bold, word wrap, 6px side margins */}
                <div className="absolute top-29 left-0 w-25 h-7.5 px-1.5 pt-0.5 text-[10px] leading-tight text-style-u-bold break-words line-clamp-2">
                    {interpolate(room.name)}
                </div>
            </Border>
        );
    }

    /* navigator_entry_row_container — border style="3", 383x20 */
    return (
        <Border
            className="flex items-center shrink-0 w-full h-5 cursor-pointer"
            tintColor={backgroundColor}
            variant="3"
            onClick={() => onEnter(room)}>
            {userCount}
            {/* room_name at 44,1 — 282 wide */}
            <span className="flex-1 min-w-0 pl-1 truncate text-style-u-regular">{interpolate(room.name)}</span>
            {/* doormode_icon 324,2 · grouphome_icon 341,2 · info_popup_click_region 359,0 */}
            <div className="flex items-center gap-0.25 shrink-0 pr-0.5">
                {doorModeIcon && <NitroIcon icon={doorModeIcon} />}
                {room.groupId > 0 && <NitroIcon icon="icon-nav-room-group" title={room.groupName} />}
                <NitroIcon
                    className="cursor-pointer"
                    icon="icon-nav-room-info"
                    onClick={event => { event.stopPropagation(); onShowInfo?.(room); }} />
            </div>
        </Border>
    );
}
