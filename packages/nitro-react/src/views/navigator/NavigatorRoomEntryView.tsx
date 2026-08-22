import type { IRoomInfo } from '@nitrodevco/nitro-packets';

import { useConfigValue, useInterpolate, useNavigatorContext, useTranslation } from '#base/context';
import { Border, NitroIcon, useTooltip } from '#base/theme';

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
    /** ViewMode.isEventViewMode — event listings show roomAdName instead of roomName */
    eventViewMode?: boolean;
    onEnter: (room: IRoomInfo) => void;
    onShowInfo?: (room: IRoomInfo, target: HTMLElement) => void;
}

export const NavigatorRoomEntryView = ({ room, mode, backgroundColor, eventViewMode = false, onEnter, onShowInfo }: NavigatorRoomEntryViewProps) => {
    const interpolate = useInterpolate();
    const t = useTranslation();
    const tooltip = useTooltip();
    /* onRoomRoomInfoMouseOver — hovering another info icon while the popup is open re-targets it */
    const popupVisible = useNavigatorContext(x => !!x.roomInfoPopup);
    /* RoomEntryElementFactory — event view modes label the entry with the ad name */
    const displayName = eventViewMode && room.adName !== '' ? room.adName : room.name;
    const showRoomInfoPopup = useNavigatorContext(x => x.showRoomInfoPopup);

    /*
     * RoomEntryElementFactory retargets the open popup on hover with per-region
     * offsets: the info icon at (right, vcentre), the tile's go_to_room_region at
     * (right - 6, vcentre + 56), the row's at (right + 20, vcentre)
     */
    const retargetOnHover = (offsetX: number = 0, offsetY: number = 0) => (event: { currentTarget: EventTarget }) => {
        if (!popupVisible) return;

        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

        showRoomInfoPopup(room, rect.right + offsetX, rect.top + rect.height / 2 + offsetY);
    };
    const thumbnailUrlBase = useConfigValue<string>('navigator.thumbnail.url_base') ?? '';
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const officialThumbnailsInAmazon = useConfigValue<boolean>('new.navigator.official.room.thumbnails.in.amazon') ?? false;
    const doorModeIcon = DOOR_MODE_ICONS[room.doorMode];

    /*
     * RoomEntryElementFactory.getNewTileElement:
     *   officialRoomPicRef != null
     *     ? (amazon config ? navigator.thumbnail.url_base : image.library.url) + officialRoomPicRef
     *     : navigator.thumbnail.url_base + flatId + ".png"
     */
    const thumbnailUrl = room.officialRoomPicRef?.length
        ? (officialThumbnailsInAmazon ? thumbnailUrlBase : imageLibraryUrl) + room.officialRoomPicRef
        : `${thumbnailUrlBase}${room.roomId}.png`;

    /**
     * room_info_usercount_border — border style="3" color="0x00" 40x18,
     * holding icon_usercount (13x14) and a u_bold label in 0xffffff
     */
    const userCount = (
        <Border className="flex items-center justify-center gap-0.25 px-0.75 w-10 h-4.5" tintColor={getUserCountColor(room.population, room.playersMax)} variant="3">
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
                {...tooltip(t('navigator.tooltip.go.to.room'))}
                variant="10"
                onClick={() => onEnter(room)}
                onPointerEnter={retargetOnHover(-6, 56)}>
                {/* black thumbnail backdrop — container 108x109 at 7,6 */}
                <div className="absolute top-1.5 left-1.75 w-27 h-27.25 bg-black" />
                {/* room_pic_placeholder — 106x106 at 8,7, pivot centre, UNCLIPPED: the
                    110x110 bitmap overflows the box 2px each side and fully covers the
                    black backdrop; black only shows while no image is drawn */}
                <div className="absolute top-1.75 left-2 flex items-center justify-center w-26.5 h-26.5">
                    <NitroIcon className="absolute shrink-0" icon="icon-nav-default-room" />
                    <img
                        alt=""
                        className="relative max-w-none pixel-art"
                        src={thumbnailUrl}
                        onError={event => { event.currentTarget.style.display = 'none'; }} />
                </div>
                {/* room_info_usercount_border at 40,93 */}
                <div className="absolute top-23.25 left-10">{userCount}</div>
                {/* doormode_icon — 16x14 at 92,96 */}
                {doorModeIcon && <NitroIcon className="absolute top-24 left-23" icon={doorModeIcon} />}
                {/* info_popup_click_region — 18x18 at 98,120 */}
                {onShowInfo && (
                    <NitroIcon
                        className="absolute top-30 left-24.5 cursor-pointer"
                        icon="icon-nav-room-info"
                        onClick={event => { event.stopPropagation(); onShowInfo(room, event.currentTarget); }}
                        onPointerEnter={retargetOnHover()} />
                )}
                {/* room_name — 100x30 at 0,116, u_bold font_size 10; styles.css gives
                    u_bold thickness -15, which at 10px renders like a regular weight —
                    the regular face matches the client, a true webfont bold is too heavy */}
                <div className="absolute top-29 left-0 w-25 h-7.5 px-1.5 pt-0.5 font-ubuntu text-[10px] leading-tight break-words line-clamp-2">
                    {interpolate(displayName)}
                </div>
            </Border>
        );
    }

    /* navigator_entry_row_container — border style="3", 383x20; unlike the tile's
       go_to_room_region the row template declares NO tooltip */
    return (
        <Border
            className="flex items-center shrink-0 w-full h-5 cursor-pointer"
            tintColor={backgroundColor}
            variant="3"
            onClick={() => onEnter(room)}
            onPointerEnter={retargetOnHover(20, 0)}>
            {userCount}
            {/* room_name at 44,1 — 282 wide */}
            <span className="flex-1 min-w-0 pl-1 truncate text-style-u-regular">{interpolate(displayName)}</span>
            {/* doormode_icon 324,2 · grouphome_icon 341,2 · info_popup_click_region 359,0 */}
            <div className="flex items-center gap-0.25 shrink-0 pr-0.5">
                {doorModeIcon && <NitroIcon icon={doorModeIcon} />}
                {/* grouphome_icon.visible = groupBadgeCode != "" (RoomEntryElementFactory) — no tooltip */}
                {room.groupBadge !== '' && <NitroIcon icon="icon-nav-room-group" />}
                {onShowInfo && (
                    <NitroIcon
                        className="cursor-pointer"
                        icon="icon-nav-room-info"
                        onClick={event => { event.stopPropagation(); onShowInfo(room, event.currentTarget); }}
                        onPointerEnter={retargetOnHover()} />
                )}
            </div>
        </Border>
    );
}
