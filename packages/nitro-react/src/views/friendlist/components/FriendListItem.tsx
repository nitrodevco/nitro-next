import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { ReactNode } from 'react';

import { useFriendsActions } from '#base/context/friend';
import { BoxLayout, Icon, Region, ThemeText, useAvatarImageTexture } from '#base/theme';

interface FriendListItemUser {
    readonly name: string;
    readonly figure: string;
    readonly gender?: AvatarGenderType;
}

/** The friend list's three row layouts - `friend_entry`, `friend_request_entry` and `search_entry`. */
export type FriendListEntryLayout = 'friend_entry' | 'friend_request_entry' | 'search_entry';

interface FriendListEntryGeometry {
    /** `user_info_region`'s x - the 15x11 eye at y 5. */
    eyeLeft: number;
    /** The `name` text's rect (a label where no width is given - it is never clipped). */
    name: BoxLayout;
    /** `search_entry`'s `name` is a `text` with `antialias_type="advanced"`; the others are labels. */
    advanced: boolean;
}

const ENTRY_GEOMETRY: Record<FriendListEntryLayout, FriendListEntryGeometry> = {
    friend_entry: { eyeLeft: 20, name: { left: 38, top: 3 }, advanced: false },
    friend_request_entry: { eyeLeft: 0, name: { left: 17, top: 3 }, advanced: false },
    search_entry: { eyeLeft: 21, name: { left: 37, top: 3, width: 200, height: 20 }, advanced: true },
};

/** `FriendListLaf.getSelectedEntryBgColor` (`0xFFBAE3FC`). */
const SELECTED_ENTRY_BG_COLOR = '#bae3fc';

export interface FriendListItemProps {
    user: FriendListItemUser;
    /** Which of the three entry layouts this row is - it fixes where the eye and the name sit. */
    entry: FriendListEntryLayout;
    selected?: boolean;
    hideAvatarElement?: boolean;
    showAvatarHead?: boolean;
    /** The row's `color` - `FriendListLaf.getRowShadingColor` for its index in the list. */
    zebraColor?: string;
    onPress?: () => void;
    /** The row's right-anchored controls, each placed absolutely at its layout rect. */
    children?: ReactNode;
}

/**
 * One 20px row of the friend list - the part `friend_entry`, `friend_request_entry` and
 * `search_entry` share: the row fill (`FriendsView.refreshEntry` / `refreshShading` set the root
 * window's `color`, `getSelectedEntryBgColor` for a selected friend), the 20x20 `face` at x -2, the
 * `user_info_region` eye (icon style 21, whose hover twin 22 `setUserInfoState` swaps in - this
 * port keeps the idle eye) and the `name` text. Where they differ is `ENTRY_GEOMETRY`.
 *
 * The face is `useAvatarImageTexture`'s head crop drawn into the 20x20 slot; Flash copies
 * `getAvatarFaceBitmap` (the `h`/`sh` head image) into a 20x20 bitmap instead, so the head's own
 * crop is the renderer's rather than Flash's.
 */
export const FriendListItem = ({ user, entry, selected = false, hideAvatarElement = false, showAvatarHead = true, zebraColor, onPress, children }: FriendListItemProps) => {
    const { tooltipHandlers } = useFriendsActions();
    const profileHover = tooltipHandlers('infostand.profile.link.tooltip');
    const { texture: avatarTexture } = useAvatarImageTexture(showAvatarHead ? user.figure : undefined, user.gender ?? AvatarGenderType.Unisex, { headOnly: true, direction: 2 });
    const geometry = ENTRY_GEOMETRY[entry];

    return (
        <Region
            backgroundColor={selected ? SELECTED_ENTRY_BG_COLOR : zebraColor}
            cursor={onPress ? 'pointer' : undefined}
            onPointerTap={onPress}
            layout={{ position: 'relative', width: '100%', height: 20, flexShrink: 0 }}
        >
            <ThemeText
                text={user.name}
                textStyle="regular"
                textOptions={{ fill: '#000000' }}
                flashFormat={geometry.advanced ? { antiAliasType: 'advanced' } : undefined}
                clip={geometry.advanced}
                verticalAlign="top"
                layout={{ position: 'absolute', ...geometry.name }}
            />
            {!hideAvatarElement && avatarTexture && (
                <pixiSprite
                    texture={avatarTexture}
                    width={20}
                    height={20}
                    layout={{ position: 'absolute', left: -2, top: 0, width: 20, height: 20 }}
                />
            )}
            <Region
                cursor="pointer"
                onPointerOver={profileHover.onMouseEnter}
                onPointerOut={profileHover.onMouseLeave}
                layout={{ position: 'absolute', left: geometry.eyeLeft, top: 5, width: 15, height: 11 }}
            >
                <Icon
                    name="icon_eye_off"
                    variant={21}
                    layout={{ position: 'absolute', left: 0, top: 0, width: 15, height: 11 }}
                />
            </Region>
            {children}
        </Region>
    );
};
