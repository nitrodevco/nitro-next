import { useConfigValue } from '#base/context';
import { Border, NitroIcon } from '#base/theme';

import type { RoomLayout } from './NavigatorCreateRoomLayouts';
import { TILE_BG_SELECTED, TILE_BG_UNSELECTED, TILE_TEXT_COLOR_SELECTED, TILE_TEXT_COLOR_UNSELECTED } from './NavigatorCreateRoomLayouts';

type NavigatorCreateRoomThumbnailViewProps = {
    layout: RoomLayout;
    selected: boolean;
    tileSizeLabel: string;
    onSelect: (layout: RoomLayout) => void;
}

/**
 * roc_room_thumbnail — region 137x99 holding bg_sel/bg_unsel (135x96 style 0,
 * colors 0x6f8285 / 0xcccccc), bg_pic (135x96, pivot centre), tile_size_txt at
 * (25,78) 18x13 with a background, tile_icon_black/white at (5,80) 18x10,
 * select_arrow at (60,0) 18x20 and club_icon at (109,5) style 12 (VIP icon small).
 *
 * refreshSelection() swaps bg_sel/bg_unsel, sets tile_size_txt textColor/color and
 * shows tile_icon_white + select_arrow only on the selected tile.
 */
export const NavigatorCreateRoomThumbnailView = ({ layout, selected, tileSizeLabel, onSelect }: NavigatorCreateRoomThumbnailViewProps) => {
    // bg_pic assetUri = "${image.library.url}newroom/model_<name>.png"
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '/assets/flash/navigator/models/';

    return (
        <div className="relative shrink-0 w-34.25 h-24.75 cursor-pointer" onClick={() => onSelect(layout)}>
            <Border className="absolute top-0 left-0 w-33.75 h-24" tintColor={selected ? '#6f8285' : '#cccccc'} variant="0" />
            {/* bg_pic: pivot_point center, stretched_x/y false — the bitmap draws at its
                NATURAL size centred in the 135x96 box, never scaled */}
            <div className="absolute top-0 left-0 flex items-center justify-center w-33.75 h-24 overflow-hidden">
                <img
                    alt=""
                    className="pixel-art"
                    src={`${imageLibraryUrl}model_${layout.name}.png`} />
            </div>
            {/* tile_icon_black when unselected, tile_icon_white when selected */}
            <NitroIcon className="absolute top-20 left-1.25" icon={selected ? 'icon-nav-tile-white' : 'icon-nav-tile-black'} />
            <span
                className="absolute top-19.5 left-6.25 px-0.25 text-style-regular"
                style={{ color: selected ? TILE_TEXT_COLOR_SELECTED : TILE_TEXT_COLOR_UNSELECTED, backgroundColor: selected ? TILE_BG_SELECTED : TILE_BG_UNSELECTED }}>
                {tileSizeLabel}
            </span>
            {/* club_icon: shown for requiredClubLevel 1 and 2 (addThumbnail) */}
            {(layout.requiredClubLevel === 1 || layout.requiredClubLevel === 2) && (
                <NitroIcon className="absolute top-1.25 left-27.25" icon="icon-vip-small" />
            )}
            {selected && <NitroIcon className="nav-select-arrow-bounce absolute top-0 left-15" icon="icon-nav-select-arrow" />}
        </div>
    );
}
