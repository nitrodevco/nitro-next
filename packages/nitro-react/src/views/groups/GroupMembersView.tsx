/**
 * The members window - `GuildMembersWindowCtrl`: `guild_members_window`, centred, titled with the
 * group's name (`group.members.title`). The server owns the paging: every filter, type and page
 * change asks for a page and the answer replaces the grid.
 *
 * - `refresh`: the group's badge; each member of the page a `member_entry` in `members_cont`, two to
 *   a row with 5 between (`refreshEntry`); the page's `group.members.pageinfo`, split at `%page%`
 *   round `pagina_number_input`; the page buttons while there is a page that way.
 * - `filter_members_input` is an `InfoText`: it holds `group.members.searchinfo` until it is focused
 *   or the answer names a filter (`populateUserNameFilter`). Typing shows the searching icon.
 * - `populateSearchTypes`: all and admins, and for a manager pending and - where blocking is on -
 *   blocked; a type the viewer cannot pick shows as the second.
 * - `pagina_number_input` takes digits; Enter or a click away goes to its page, clamped
 *   (`navigateToInputPage`).
 *
 * `refreshUserEntry`: the name; the owner's crown; the admin badge (shown where the member is an
 * admin or the viewer may manage - read before the row knows whether it is the viewer's own, so the
 * viewer's row shows it too); for a manager, the action link the member's type names (unblock, owner,
 * remove or give rights, accept), whose hover lights it and previews the admin badge the click would
 * leave (`onActionLinkMouseOver`), and the remove and block crosses, which light while hovered;
 * otherwise the member's join date. A click on the row opens the member's profile.
 *
 * There is no accept-all button: `GuildMembersWindowCtrl.onAcceptAll` is written but never bound,
 * and `guild_members_window` has no control to bind it to.
 */
import { IGuildMemberData, IMemberData, isGuildMemberAdmin, isGuildMemberBlocked, isGuildMemberMember, isGuildMemberOwner } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { groupMemberPageCount, limitGroupMemberPage } from '#base/context/groups';
import { useConfigValue, useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateItem, TemplateWindow, useTemplate, useTemplateFrame } from '#base/theme';
import { AvatarImageWidgetHead } from '#base/views/shared/AvatarImageWidgetHead';

export interface GroupMembersViewProps {
    members: IGuildMemberData;
    /** The filter box's live text, which the window owns until the search timer fires. */
    filterText: string;
    searching: boolean;
    /** The viewer's own id - their row carries no actions. */
    ownUserId: number;
    /** `populateSearchTypes`: the blocked option is only offered where blocking is on. */
    blockingEnabled: boolean;
    onClose: () => void;
    onFilterTextChange: (filterText: string) => void;
    onSearchType: (searchType: number) => void;
    onPage: (pageIndex: number) => void;
    onProfile: (member: IMemberData) => void;
    onAction: (member: IMemberData) => void;
    onRemove: (member: IMemberData) => void;
    onBlock: (member: IMemberData) => void;
}

/** `GuildMembersWindowCtrl.MEMBER_SPACING`. */
const MEMBER_SPACING = 5;

/** `setActionLinkState`: the link's resting colour and the one it takes while hovered. */
const ACTION_LINK_COLOR = 0x6f6e65;
const ACTION_LINK_HOVER_COLOR = 0x2aa1fc;

/** Which part of which row the pointer is over: what `WME_OVER` / `WME_OUT` change. */
interface Hover {
    userId: number;
    part: 'action' | 'remove' | 'block';
}

/** `setRemoveState`: a cross lit while hovered. */
const crossBindings = (region: string, lit: boolean): TemplateBindings => ({
    [`${region}/icon_close_off`]: { visible: !lit },
    [`${region}/icon_close_over`]: { visible: lit },
    [`${region}/icon_close_down`]: { visible: false },
});

export const GroupMembersView = ({
    members, filterText, searching, ownUserId, blockingEnabled, onClose, onFilterTextChange, onSearchType, onPage, onProfile, onAction, onRemove, onBlock,
}: GroupMembersViewProps) => {
    const t = useTranslation();
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const entryTemplate = useTemplate('habbo-groups-com/member_entry');
    const frame = useTemplateFrame({ id: 'guild_members_window', centered: true, rememberPosition: false, onClose });
    // `InfoText`: the hint stays until the field is focused, or the answer names a filter.
    const [ filterInfo, setFilterInfo ] = useState(true);
    const [ pageInput, setPageInput ] = useState<string | null>(null);
    const [ hover, setHover ] = useState<Hover | null>(null);

    if (filterInfo && members.userNameFilter) setFilterInfo(false);

    const totalPages = groupMemberPageCount(members);
    const limitPage = (pageIndex: number) => limitGroupMemberPage(members, pageIndex);

    // `populateSearchTypes`.
    const searchOptions = [ '${group.members.search.all}', '${group.members.search.admins}' ];

    if (members.allowedToManage) {
        searchOptions.push('${group.members.search.pending}');

        if (blockingEnabled) searchOptions.push('${group.members.search.blocked}');
    }

    // `refresh`: `group.members.pageinfo` round the page input.
    const [ pageTextStart = '', pageTextEnd = '' ] = t('group.members.pageinfo').split('%page%');

    /** `navigateToInputPage`: the typed page, clamped. */
    const goToTypedPage = () => {
        if (pageInput === null) return;

        setPageInput(null);
        onPage(limitPage((parseInt(pageInput, 10) || 0) - 1));
    };

    const hovered = (member: IMemberData, part: Hover['part']) => (hover?.userId === member.userId) && (hover.part === part);
    const hoverHandlers = (member: IMemberData, part: Hover['part']) => ({
        onPointerOver: () => setHover({ userId: member.userId, part }),
        onPointerOut: () => setHover(null),
    });

    /** `refreshUserEntry`. */
    const entryBindings = (member: IMemberData): TemplateBindings => {
        const isSelf = member.userId === ownUserId;
        const isOwner = isGuildMemberOwner(member);
        const isAdmin = isGuildMemberAdmin(member);
        const isMember = isGuildMemberMember(member);
        const isBlocked = isGuildMemberBlocked(member);
        const manages = !isSelf && members.allowedToManage;
        // `onActionLinkMouseOver` previews the click's result; an owner's link does nothing.
        const actionHovered = hovered(member, 'action') && !isOwner;
        const admin = actionHovered ? !isAdmin : isAdmin;
        const [ actionKey, underline ] = isBlocked
            ? [ 'group.members.unblock', false ]
            : isOwner
                ? [ 'group.members.owner', false ]
                : isAdmin
                    ? [ 'group.members.removerights', true ]
                    : isMember ? [ 'group.members.giverights', true ] : [ 'group.members.accept', true ];

        return {
            user_name_txt: { caption: member.userName },
            icon_owner: { visible: isOwner },
            admin_container: { visible: isAdmin || members.allowedToManage },
            icon_admin_off: { visible: isMember && admin },
            icon_admin_over: { visible: isMember && !admin },
            bg_region: { onPointerTap: () => onProfile(member) },
            remove_region: {
                visible: !isOwner && manages && !isBlocked,
                tooltip: t(isMember ? 'group.members.kick' : 'group.members.reject'),
                onPointerTap: () => onRemove(member),
                ...hoverHandlers(member, 'remove'),
            },
            ...crossBindings('remove_region', hovered(member, 'remove')),
            block_region: {
                visible: isMember && !isOwner && manages && blockingEnabled && !isBlocked,
                tooltip: t('group.members.block'),
                onPointerTap: () => onBlock(member),
                ...hoverHandlers(member, 'block'),
            },
            ...crossBindings('block_region', hovered(member, 'block')),
            action_link_region: {
                visible: manages,
                onPointerTap: () => !isOwner && onAction(member),
                ...hoverHandlers(member, 'action'),
            },
            action_link: { caption: t(actionKey, actionKey), underline, color: actionHovered ? ACTION_LINK_HOVER_COLOR : ACTION_LINK_COLOR },
            member_since_txt: { visible: !manages && (member.memberSince !== ''), caption: t('group.members.since', '', { date: member.memberSince }) },
            avatar_image: {
                children: (
                    <AvatarImageWidgetHead
                        figure={member.figure}
                        cropped
                    />
                ),
            },
        };
    };

    // `refreshEntry`: two to a row, each at its place in the page.
    const entries: TemplateItem[] = entryTemplate
        ? members.entries.slice(0, members.pageSize).map((member, index) => ({
                key: String(member.userId),
                from: entryTemplate,
                bindings: entryBindings(member),
                arrange: ({ root }) => {
                    const entry = root();

                    if (!entry) return;

                    entry.setX(((index % 2) === 0) ? 0 : (entry.width + MEMBER_SPACING));
                    entry.setY(Math.floor(index / 2) * (entry.height + MEMBER_SPACING));
                },
            }))
        : [];

    return (
        <TemplateWindow
            id="habbo-groups-com/guild_members_window"
            frame={frame}
            parameters={{ 'group.members.title': { groupName: members.groupName } }}
            bindings={{
                group_logo: { asset: members.badgeCode ? groupBadgeUrl.replace('%badgedata%', members.badgeCode) : undefined },
                filter_members_input: {
                    caption: filterInfo ? t('group.members.searchinfo') : filterText,
                    onFocus: () => {
                        if (filterInfo) setFilterInfo(false);
                    },
                    onChange: onFilterTextChange,
                },
                searching_icon: { visible: searching },
                type_drop_menu: {
                    options: searchOptions,
                    selection: members.allowedToManage ? Number(members.searchType) : Math.min(Number(members.searchType), 1),
                    onSelect: onSearchType,
                },
                members_cont: { items: entries },
                pagina_text_start: { caption: pageTextStart.replace('%amount%', String(members.totalEntries)) },
                pagina_text_end: { caption: pageTextEnd.replace('%totalPages%', String(totalPages)) },
                pagina_number_input: {
                    caption: pageInput ?? String(members.pageIndex + 1),
                    restrict: '0-9',
                    onChange: setPageInput,
                    onEnter: goToTypedPage,
                    onBlur: goToTypedPage,
                },
                previous_page_button: { visible: members.pageIndex !== limitPage(members.pageIndex - 1), onPointerTap: () => onPage(limitPage(members.pageIndex - 1)) },
                next_page_button: { visible: members.pageIndex !== limitPage(members.pageIndex + 1), onPointerTap: () => onPage(limitPage(members.pageIndex + 1)) },
            }}
        />
    );
};
