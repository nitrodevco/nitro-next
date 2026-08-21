import { AvatarGenderType } from '@nitrodevco/nitro-api';
import type { ReactNode } from 'react';

import { useFriendsActions } from '#base/context';
import { Box, ColorLayer, getPixiTextStyle, NitroIcon, useAvatarImageTexture } from '#base/theme-pixi';

interface FriendListItemPixiUser {
    readonly name: string;
    readonly figure: string;
    readonly gender?: AvatarGenderType;
}

export interface FriendListItemPixiProps {
    user: FriendListItemPixiUser;
    selected?: boolean;
    hideAvatarElement?: boolean;
    showAvatarHead?: boolean;
    /** DOM stripes rows via `[&>*:nth-child(odd/even)]:bg-...` on the list's own container -
     *  Pixi has no nth-child selector equivalent, so each call site computes its own row's
     *  color from its map index and passes it straight through. */
    zebraColor?: string;
    onPress?: () => void;
    children?: ReactNode;
}

/**
 * Pixi port of views/friendlist/components/FriendListItem.tsx. DOM crops/zooms its full-body
 * `AvatarImage` down to a small 20x20 headshot via `overflow-hidden` CSS clipping - Pixi's plain
 * Box has no clipping without an explicit mask (see ScrollViewport.tsx's own docblock), so this
 * asks `useAvatarImageTexture` for a `headOnly` crop directly (same pragmatic divergence already
 * used for the toolbar's circular avatar) and stretches it to fill the 20x20 slot instead.
 */
export const FriendListItemPixi = ({ user, selected = false, hideAvatarElement = false, showAvatarHead = true, zebraColor, onPress, children }: FriendListItemPixiProps) => {
    const { tooltipHandlers } = useFriendsActions();
    const profileHover = tooltipHandlers('infostand.profile.link.tooltip');
    const { texture: avatarTexture } = useAvatarImageTexture(showAvatarHead ? user.figure : undefined, user.gender ?? AvatarGenderType.Unisex, { headOnly: true, direction: 2 });

    return (
        <Box
            eventMode={onPress ? 'static' : 'none'}
            cursor={onPress ? 'pointer' : undefined}
            onPointerTap={onPress}
            layout={{ position: 'relative', flexDirection: 'row', gap: 6, alignItems: 'center', height: 20, paddingLeft: 2, paddingRight: 2 }}
        >
            {zebraColor && !selected && <ColorLayer color={zebraColor} />}
            {selected && <ColorLayer color="#b8e2fc" />}
            <Box layout={{ flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {!hideAvatarElement && (
                    <Box layout={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                        {avatarTexture && <pixiSprite texture={avatarTexture} width={20} height={20} layout={{}} />}
                    </Box>
                )}
                <Box eventMode="static" cursor="pointer" onPointerOver={profileHover.onMouseEnter} onPointerOut={profileHover.onMouseLeave} layout={{}}>
                    <NitroIcon icon="icon-profile-small" layout={{}} />
                </Box>
            </Box>
            <pixiText layout={{ flex: 1 }} text={user.name} style={getPixiTextStyle('text-style-regular', { fontSize: 10.88, fill: '#000000' })} />
            <Box layout={{ flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'space-around', flexShrink: 0, minWidth: 45, maxWidth: 52 }}>
                {children}
            </Box>
        </Box>
    );
};
