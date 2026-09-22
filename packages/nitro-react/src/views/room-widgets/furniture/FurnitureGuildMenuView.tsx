import { useTranslation } from '#base/context/system';

import { FurnitureMenuBubble, FurnitureMenuButton } from './FurnitureMenuBubble';

export interface FurnitureGuildMenuViewProps {
    guildName: string;
    /** A member is not offered the join; a guild without a readable forum is not offered it. */
    isMember: boolean;
    hasForum: boolean;
    onJoin: () => void;
    onHomeRoom: () => void;
    onForum: () => void;
}

/**
 * The menu over a piece of guild furniture, on the `guild_furni_menu` layout (115x140) -
 * `GuildFurnitureContextMenuView`: the guild's name in `profile_link` and up to three rows below
 * it, `join` only for a non-member and `open_forum` only for a guild with a readable forum
 * (`updateButtons`); the bubble shrinks with the rows it drops.
 *
 * `profile_link` carries Flash's tooltip, but pressing it does nothing here: it opens the group
 * info window (`openGroupInfo`), which the port has yet to build.
 */
export const FurnitureGuildMenuView = ({
    guildName, isMember, hasForum, onJoin, onHomeRoom, onForum,
}: FurnitureGuildMenuViewProps) => {
    const t = useTranslation();

    const buttons: FurnitureMenuButton[] = [];

    if (!isMember) buttons.push({ key: 'join', label: t('widget.furniture.button.join.group'), onPointerTap: onJoin });

    buttons.push({ key: 'home_room', label: t('widget.furniture.button.go.to.group.home.room'), onPointerTap: onHomeRoom });

    if (hasForum) buttons.push({ key: 'open_forum', label: t('widget.furniture.button.open_group_forum'), onPointerTap: onForum });

    return (
        <FurnitureMenuBubble
            title={guildName}
            titleTooltip={t('infostand.profile.link.tooltip', 'Click to view profile')}
            buttons={buttons}
            minimizeGap={0}
        />
    );
};
