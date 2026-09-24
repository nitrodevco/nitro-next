import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { IMemberData, isGuildMemberAdmin, isGuildMemberBlocked, isGuildMemberMember, isGuildMemberOwner } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useConfigValue, useTranslation } from '#base/context/system';
import { Border, Region, ThemeImage, ThemeText, useAvatarImageTexture } from '#base/theme';

export interface GroupMemberEntryProps {
    member: IMemberData;
    /** Whether the viewer may kick, block and change rights - `GuildMemberData.allowedToManage`. */
    allowedToManage: boolean;
    /** The viewer's own row carries no actions at all. */
    isSelf: boolean;
    onProfile: () => void;
    onAction: () => void;
    onRemove: () => void;
    onBlock: () => void;
}

/** `setActionLinkState`: the link's resting colour and the one it takes while hovered. */
const ACTION_LINK_COLOR = '#6f6e65';
const ACTION_LINK_HOVER_COLOR = '#2aa1fc';

/**
 * One row of the members window - `member_entry`, filled by `GuildMembersWindowCtrl.refreshUserEntry`.
 *
 * The row carries a single action link whose meaning is the member's own type, and hovering it
 * previews what the click will do: the admin badge flips to the state the click would leave the
 * member in (`onActionLinkMouseOver` -> `setAdminState(member, !admin)`).
 */
export const GroupMemberEntry = ({ member, allowedToManage, isSelf, onProfile, onAction, onRemove, onBlock }: GroupMemberEntryProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const blockingEnabled = useConfigValue<boolean>('group.blocking.enabled') === true;
    const [ actionHovered, setActionHovered ] = useState(false);
    const [ removeHovered, setRemoveHovered ] = useState(false);
    const [ blockHovered, setBlockHovered ] = useState(false);
    const { texture: avatarTexture, width: avatarWidth, height: avatarHeight } = useAvatarImageTexture(member.figure, AvatarGenderType.Male, { headOnly: true });

    const isOwner = isGuildMemberOwner(member);
    const isAdmin = isGuildMemberAdmin(member);
    const isMember = isGuildMemberMember(member);
    const isBlocked = isGuildMemberBlocked(member);

    // `setAdminState(member, admin)`, with the hover preview over it.
    const adminState = actionHovered && !isOwner ? !isAdmin : isAdmin;
    const showAdminOff = isMember && adminState;
    const showAdminOver = isMember && !adminState;

    const showAdminContainer = !isSelf && (isAdmin || allowedToManage);
    const showActionLink = !isSelf && allowedToManage;
    const showRemove = !isOwner && !isSelf && allowedToManage && !isBlocked;
    const showBlock = isMember && !isOwner && !isSelf && allowedToManage && blockingEnabled && !isBlocked;
    const showMemberSince = !showActionLink && (member.memberSince !== '');

    const [ actionKey, actionUnderlined ] = isBlocked
        ? [ 'group.members.unblock', false ]
        : isOwner
            ? [ 'group.members.owner', false ]
            : isAdmin
                ? [ 'group.members.removerights', true ]
                : isMember
                    ? [ 'group.members.giverights', true ]
                    : [ 'group.members.accept', true ];

    const closeIcon = (hovered: boolean) => `${imageLibraryUrl}guilds/${hovered ? 'icon_close_over' : 'icon_close_off'}.png`;

    return (
        <Border
            variant="0"
            name="group_entry_container"
            layout={{ width: 164, height: 35, overflow: 'hidden' }}
        >
            <Region
                name="bg_region"
                tooltip={t('group.members.showinfo')}
                onPointerTap={onProfile}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 164, top: 0, height: 35 }}
            />
            {avatarTexture && (
                <Region
                    name="avatar_image"
                    layout={{ position: 'absolute', left: -3, width: 33, top: 0, height: 34, overflow: 'hidden', alignItems: 'center' }}
                >
                    <pixiSprite
                        texture={avatarTexture}
                        layout={{ width: avatarWidth, height: avatarHeight }}
                    />
                </Region>
            )}
            <ThemeText
                text={member.userName}
                textStyle="u_bold"
                textOptions={{ fontSize: 11 }}
                name="user_name_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 33, top: 1 }}
            />
            {/*
              * `refreshUserEntry` sets `icon_owner` and `admin_container` independently, so an
              * owner's row seen by someone who may manage the group draws both - the crown over
              * the admin badge, which sits a pixel to its left.
              */}
            {showAdminContainer && (
                <Region
                    name="admin_container"
                    layout={{ position: 'absolute', left: 33, width: 15, top: 15, height: 13 }}
                >
                    {showAdminOff && (
                        <ThemeImage
                            name="icon_admin_off"
                            src={`${imageLibraryUrl}guilds/icon_admin_off.png`}
                            layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                        />
                    )}
                    {showAdminOver && (
                        <ThemeImage
                            name="icon_admin_over"
                            src={`${imageLibraryUrl}guilds/icon_admin_over.png`}
                            layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                        />
                    )}
                </Region>
            )}
            {isOwner && (
                <ThemeImage
                    name="icon_owner"
                    src={`${imageLibraryUrl}guilds/icon_owner.png`}
                    layout={{ position: 'absolute', left: 34, width: 15, top: 15, height: 13 }}
                />
            )}
            {showActionLink && (
                <Region
                    name="action_link_region"
                    onPointerTap={isOwner ? undefined : onAction}
                    onPointerOver={() => setActionHovered(true)}
                    onPointerOut={() => setActionHovered(false)}
                    cursor={isOwner ? undefined : 'pointer'}
                    layout={{ position: 'absolute', left: 51, width: 110, top: 14, height: 18 }}
                >
                    <ThemeText
                        text={t(actionKey)}
                        textOptions={{ fontFamily: 'Ubuntu', fontSize: 11, fill: actionHovered ? ACTION_LINK_HOVER_COLOR : ACTION_LINK_COLOR }}
                        flashFormat={{ underline: actionUnderlined, antiAliasType: 'advanced' }}
                        name="action_link"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, top: 0 }}
                    />
                </Region>
            )}
            {showMemberSince && (
                <ThemeText
                    text={t('group.members.since', '', { date: member.memberSince })}
                    textStyle="u_small"
                    textOptions={{ fill: '#666666' }}
                    flashFormat={{ italic: true }}
                    name="member_since_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 50, top: 15 }}
                />
            )}
            {showBlock && (
                <Region
                    name="block_region"
                    tooltip={t('group.members.block')}
                    onPointerTap={onBlock}
                    onPointerOver={() => setBlockHovered(true)}
                    onPointerOut={() => setBlockHovered(false)}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 17, width: 17, top: 1, height: 18 }}
                >
                    <ThemeImage
                        src={closeIcon(blockHovered)}
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                </Region>
            )}
            {showRemove && (
                <Region
                    name="remove_region"
                    tooltip={t(isMember ? 'group.members.kick' : 'group.members.reject')}
                    onPointerTap={onRemove}
                    onPointerOver={() => setRemoveHovered(true)}
                    onPointerOut={() => setRemoveHovered(false)}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 1, width: 17, top: 1, height: 18 }}
                >
                    <ThemeImage
                        src={closeIcon(removeHovered)}
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                </Region>
            )}
        </Border>
    );
};
