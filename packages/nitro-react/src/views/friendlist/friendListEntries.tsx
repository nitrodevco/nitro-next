/**
 * The friend list's tabs as `FriendsView`, `FriendRequestsView` and `SearchView` fill them: the
 * rows each puts in its tab's `list_content` - clones of `friend_entry`, `friend_request_entry` and
 * `search_entry` with every part the row does not use hidden (`Util.hideChildren`, then the parts
 * shown again) - and the footer each fills (`fillFooter`).
 */
import { FriendRequestStateType, IFriendRequest, IMessengerFriend, IMessengerSearchResult, MessengerFriendRelationType } from '@nitrodevco/nitro-packets';
import { FederatedPointerEvent } from 'pixi.js';

import { LayoutImage, Template, TemplateBinding, TemplateBindings, TemplateItem } from '#base/theme';

import { FriendListFace } from './FriendListFace';

/** `FriendListView.showInfo`: a control's tip shown in the window's `info_text` while hovered. */
export type FriendListTip = (key: string) => Pick<TemplateBinding, 'onPointerOver' | 'onPointerOut'>;

/** `FriendListLaf.getSelectedEntryBgColor`. */
const SELECTED_ENTRY_BG_COLOR = 0xffbae3fc;

/** `FriendListLaf.getRowShadingColor(tab, odd)`: white and `0xeeeeee` on the friends and requests tabs, greys on search. */
export const rowShadingColor = (tab: number, odd: boolean) => {
    if (tab === 3) return odd ? 0xffb6b6b6 : 0xff9f9f9f;

    return odd ? 0xffffffff : 0xffeeeeee;
};

/** `FriendCategory.PAGE_SIZE`: friends a category shows at once. */
export const FRIEND_LIST_PAGE_SIZE = 100;

/** `friend_list.select_all.enabled`: the select-all link from this many friends in the category. */
const SELECT_ALL_MIN_FRIENDS = 5;

/** `HabboFriendList.getButtonImage`: the friend list's own `<name>_png` bitmap. */
export const friendListImage = (name: string) => LayoutImage(`habbo-friend-list-com/${name}.png`);

/** `HabboFriendList.prepareButton` / `initButton`: the bitmap given its `getButtonImage` and sized to it. */
export const buttonImage = (name: string): TemplateBinding => ({ asset: friendListImage(name), fitToBitmap: true });

/** `refreshRelationshipRegion`: the `relationship_status_*` asset for the status. */
const RELATIONSHIP_ASSETS: Partial<Record<MessengerFriendRelationType, string>> = {
    [MessengerFriendRelationType.One]: 'heart',
    [MessengerFriendRelationType.Two]: 'smile',
    [MessengerFriendRelationType.Three]: 'bobba',
};

/** `UserInfo.setUserInfoState`: the hover eye in place of the idle one. */
const userInfoState = (hover: boolean): TemplateBindings => ({
    icon_eye_off: { visible: !hover },
    icon_eye_over: { visible: hover },
});

/** A control's own click, which the row's procedure does not hear. */
const own = (action: (event: FederatedPointerEvent) => void) => (event: FederatedPointerEvent) => {
    event.stopPropagation();
    action(event);
};

/** `Util.hideChildren`: each part of the row hidden, to be shown again by what fills it. */
const hideAll = (names: readonly string[]): TemplateBindings => Object.fromEntries(names.map(name => [ name, { visible: false } ]));

const FRIEND_ENTRY_PARTS = [ 'name', 'caption', 'start_chat', 'follow_friend', 'relationship_status', 'face', 'arrow_down_black', 'arrow_right_black', 'user_info_region', 'pager', 'select_all_region' ] as const;

/** A category of the friends tab, as `FriendCategory` holds it. */
export interface FriendCategoryRow {
    id: number;
    /** `FriendCategory.name`, its text. */
    name: string;
    open: boolean;
    /** `filteredFriends`. */
    friends: readonly IMessengerFriend[];
    pageCount: number;
    pageIndex: number;
    /** The current page's friends (`getStartFriendIndex` to `getEndFriendIndex`). */
    shown: readonly IMessengerFriend[];
}

export interface FriendsTabArgs {
    entry: Template;
    pagelink: Template;
    categories: readonly FriendCategoryRow[];
    selectedIds: readonly number[];
    /** The friend whose `user_info_region` the pointer is over. */
    hoveredInfo: number | undefined;
    /** `isMessagesPersisted`. */
    messagesPersisted: boolean;
    /** `relationship.status.enabled`. */
    relationshipsEnabled: boolean;
    /** `friend_list.select_all.enabled`. */
    selectAllEnabled: boolean;
    tip: FriendListTip;
    onHoverInfo: (friendId: number | undefined) => void;
    onToggleCategory: (categoryId: number) => void;
    onSelectPage: (categoryId: number, pageIndex: number) => void;
    onSelectAll: (category: FriendCategoryRow, select: boolean) => void;
    onToggleFriend: (friend: IMessengerFriend) => void;
    onStartChat: (friendId: number) => void;
    onFollow: (friendId: number) => void;
    onRelationship: (friend: IMessengerFriend, event: FederatedPointerEvent) => void;
    onProfile: (friendId: number) => void;
}

/**
 * `FriendsView.refreshList`: each category's row, then - while it is open - its page of friends, all
 * numbered down the list and shaded by that number (`refreshEntry`).
 */
export const friendsTabRows = (args: FriendsTabArgs): TemplateItem[] => {
    const rows: TemplateItem[] = [];

    for (const category of args.categories) {
        rows.push(categoryRow(category, rows.length, args));

        if (!category.open) continue;

        for (const friend of category.shown) rows.push(friendRow(friend, rows.length, args));
    }

    return rows;
};

/**
 * `refreshCategoryEntry`: the bold `caption` with the friends it holds, the open or closed arrow at
 * `caption.textWidth + 6` / `+ 9`, the select-all link and, from two pages on, the `pager` of
 * `pagelink`s (`refreshPager`, laid out by the window's own code). A click opens or closes it.
 */
const categoryRow = (category: FriendCategoryRow, index: number, args: FriendsTabArgs): TemplateItem => {
    const color = rowShadingColor(1, (index % 2) === 1);
    const showPager = category.open && (category.pageCount >= 2);
    const allSelected = category.friends.every(friend => args.selectedIds.includes(friend.playerId));
    const toggle = () => args.onToggleCategory(category.id);

    return {
        key: `category:${category.id}`,
        from: args.entry,
        bindings: {
            ...hideAll(FRIEND_ENTRY_PARTS),
            '': { color, onPointerTap: toggle },
            caption: { visible: true, caption: `${category.name} (${category.friends.length})` },
            arrow_down_black: { visible: category.open, ...buttonImage('arrow_down_black') },
            arrow_right_black: { visible: !category.open, ...buttonImage('arrow_right_black') },
            select_all_region: {
                visible: args.selectAllEnabled && category.open && (category.friends.length >= SELECT_ALL_MIN_FRIENDS) && (category.id === 0),
                onPointerTap: own(() => args.onSelectAll(category, !allSelected)),
            },
            select_all_text: { caption: allSelected ? '${friendlist.unselect_all}' : '${friendlist.select_all}' },
            pager: {
                visible: showPager,
                added: showPager
                    ? Array.from({ length: category.pageCount }, (_, page) => ({
                            key: `page.${page}`,
                            from: args.pagelink,
                            bindings: {
                                '': {
                                    caption: `${(page * FRIEND_LIST_PAGE_SIZE) + 1}-${(page + 1) * FRIEND_LIST_PAGE_SIZE}`,
                                    underline: page !== category.pageIndex,
                                    // `_loc6_.color`: a text window's colour is its field's background.
                                    backgroundColor: color & 0xffffff,
                                    onPointerTap: own(() => args.onSelectPage(category.id, page)),
                                },
                            },
                            arrange: ({ root }) => {
                                const link = root();

                                link?.setWidth(link.textWidth + 5);
                            },
                        }))
                    : [],
            },
        },
        arrange: ({ find }) => {
            const caption = find('caption');
            const arrow = find(category.open ? 'arrow_down_black' : 'arrow_right_black');

            if (caption && arrow) arrow.setX(caption.textWidth + (category.open ? 6 : 9));
        },
    };
};

/**
 * `refreshFriendEntry`: the name (with the real name after it), the chat button while the friend is
 * online or keeps messages, the follow button where following is allowed, the relationship status
 * for a real friend, the face and the eye that opens the profile. A click selects a real friend
 * (`onFriendClick`, on both clicks of a double click as on the double click itself); a double
 * click on an online one starts a conversation.
 */
const friendRow = (friend: IMessengerFriend, index: number, args: FriendsTabArgs): TemplateItem => {
    const selected = args.selectedIds.includes(friend.playerId);
    // `Friend.isGroupFriend`: a group chat, listed with the group's negative id.
    const isGroupFriend = friend.playerId < 0;
    const hover = args.hoveredInfo === friend.playerId;
    const name = friend.realName ? `${friend.name} (${friend.realName})` : friend.name;
    const profileTip = args.tip('infostand.profile.link.tooltip');
    const select = () => {
        if (!isGroupFriend) args.onToggleFriend(friend);
    };

    return {
        key: `friend:${friend.playerId}`,
        from: args.entry,
        bindings: {
            ...hideAll(FRIEND_ENTRY_PARTS),
            '': {
                color: selected ? SELECTED_ENTRY_BG_COLOR : rowShadingColor(1, (index % 2) === 1),
                onPointerTap: select,
                onDoubleClick: () => {
                    select();

                    if (friend.isOnline) args.onStartChat(friend.playerId);
                },
            },
            name: { visible: true, caption: name, color: 0x000000 },
            start_chat: {
                visible: friend.isOnline || (args.messagesPersisted && (friend.persistedUser || friend.pocketHabboUser)),
                ...args.tip('friendlist.tip.im'),
                onPointerTap: own(() => args.onStartChat(friend.playerId)),
            },
            'start_chat/#bitmap': buttonImage('start_chat'),
            follow_friend: {
                visible: friend.canFollow,
                ...args.tip('friendlist.tip.follow'),
                onPointerTap: own(() => args.onFollow(friend.playerId)),
            },
            'follow_friend/#bitmap': buttonImage('follow_friend'),
            relationship_status: {
                visible: (friend.playerId > 0) && args.relationshipsEnabled,
                ...args.tip('friendlist.tip.relationship'),
                onPointerTap: own(event => args.onRelationship(friend, event)),
            },
            'relationship_status/#bitmap': { asset: LayoutImage(`habbo-window-manager-com/relationship_status_${RELATIONSHIP_ASSETS[friend.relationshipType] ?? 'none'}.png`) },
            face: {
                visible: !!friend.figure && (isGroupFriend || friend.isOnline),
                children: (
                    <FriendListFace
                        figure={friend.figure}
                        gender={friend.gender}
                        groupBadge={isGroupFriend}
                    />
                ),
            },
            user_info_region: {
                visible: true,
                onPointerOver: (event) => {
                    args.onHoverInfo(friend.playerId);
                    profileTip.onPointerOver?.(event);
                },
                onPointerOut: (event) => {
                    args.onHoverInfo(undefined);
                    profileTip.onPointerOut?.(event);
                },
                onPointerTap: own(() => {
                    if (!isGroupFriend) args.onProfile(friend.playerId);
                }),
            },
            ...userInfoState(hover),
        },
    };
};

const REQUEST_ENTRY_PARTS = [ 'bg_region', 'user_info_region', 'requester_name_text', 'info_text', 'accept', 'reject' ] as const;

/** `FriendRequestsView.refreshRequestEntry`: what an answered request shows, by its state. */
const REQUEST_STATE_TEXT: Partial<Record<FriendRequestStateType, string>> = {
    [FriendRequestStateType.Accepted]: '${friendlist.request.accepted}',
    [FriendRequestStateType.Declined]: '${friendlist.request.declined}',
    [FriendRequestStateType.Failed]: '${friendlist.request.failed}',
};

export interface RequestsTabArgs {
    entry: Template;
    requests: readonly IFriendRequest[];
    /** The requester whose row the pointer is over. */
    hoveredInfo: number | undefined;
    tip: FriendListTip;
    onHoverInfo: (playerId: number | undefined) => void;
    onAccept: (playerId: number) => void;
    onDecline: (playerId: number) => void;
    onProfile: (playerId: number) => void;
}

/**
 * `FriendRequestsView.fillList`: a `friend_request_entry` per request, shaded from an even row
 * (`FriendRequests.refreshShading`) with its `accept` / `reject` backgrounds in the row's colour
 * (`setButtonBg`). The row opens the requester's profile; an open request has its accept and
 * decline icons, an answered one its outcome in `info_text`.
 */
export const requestsTabRows = (args: RequestsTabArgs): TemplateItem[] => args.requests.map((request, index) => {
    const color = rowShadingColor(2, (index % 2) === 1);
    const isOpen = request.state === FriendRequestStateType.Open;
    const stateText = REQUEST_STATE_TEXT[request.state];
    const profileTip = args.tip('infostand.profile.link.tooltip');

    return {
        key: `request:${request.playerId}`,
        from: args.entry,
        bindings: {
            ...hideAll(REQUEST_ENTRY_PARTS),
            '': { color },
            bg_region: {
                visible: true,
                onPointerOver: (event) => {
                    args.onHoverInfo(request.playerId);
                    profileTip.onPointerOver?.(event);
                },
                onPointerOut: (event) => {
                    args.onHoverInfo(undefined);
                    profileTip.onPointerOut?.(event);
                },
                onPointerTap: () => args.onProfile(request.playerId),
            },
            user_info_region: { visible: true },
            ...userInfoState(args.hoveredInfo === request.playerId),
            requester_name_text: { visible: true, caption: request.name },
            info_text: { visible: !isOpen && !!stateText, caption: stateText },
            accept: {
                visible: isOpen,
                color,
                ...args.tip('friendlist.tip.accept'),
                onPointerTap: own(() => args.onAccept(request.playerId)),
            },
            reject: {
                visible: isOpen,
                color,
                ...args.tip('friendlist.tip.decline'),
                onPointerTap: own(() => args.onDecline(request.playerId)),
            },
        },
    };
});

const SEARCH_ENTRY_PARTS = [ 'caption', 'name', 'face', 'start_chat', 'ask_for_friend', 'user_info_region' ] as const;

export interface SearchTabArgs {
    entry: Template;
    /** Whether an answer has come: `refreshList` runs on one, and until then the list has no rows. */
    received: boolean;
    friends: readonly IMessengerSearchResult[];
    others: readonly IMessengerSearchResult[];
    ownUserId: number;
    sentRequestIds: readonly number[];
    messagesPersisted: boolean;
    hoveredInfo: number | undefined;
    tip: FriendListTip;
    onHoverInfo: (playerId: number | undefined) => void;
    onStartChat: (playerId: number) => void;
    onAskForFriend: (result: IMessengerSearchResult) => void;
    onProfile: (playerId: number) => void;
}

/**
 * `SearchView.refreshList`: the friends caption, the friends found, the others caption and the others
 * found, shaded by their index (`refreshShading`). A friend found has the chat button while online or
 * where the hotel keeps messages; anyone else found has the ask-for-friend button unless it is the
 * user or someone already asked. A result's row opens the profile (`onSearchEntry`).
 */
export const searchTabRows = (args: SearchTabArgs): TemplateItem[] => {
    if (!args.received) return [];

    const rows: TemplateItem[] = [];
    const color = () => rowShadingColor(3, (rows.length % 2) === 1);
    const caption = (key: string, emptyKey: string, count: number): TemplateItem => ({
        key: `caption:${key}`,
        from: args.entry,
        bindings: {
            ...hideAll(SEARCH_ENTRY_PARTS),
            '': { color: color() },
            // `getFriendsCaption` / `getOthersCaption`: the count is registered with the text (`cnt`).
            caption: { visible: true, caption: (count < 1) ? `\${${emptyKey}}` : `\${${key}}` },
        },
    });
    const result = (data: IMessengerSearchResult, showChat: boolean, showAsk: boolean): TemplateItem => {
        const profileTip = args.tip('infostand.profile.link.tooltip');

        return {
            key: `result:${data.playerId}`,
            from: args.entry,
            bindings: {
                ...hideAll(SEARCH_ENTRY_PARTS),
                '': { color: color() },
                bg_region: {
                    onPointerOver: (event) => {
                        args.onHoverInfo(data.playerId);
                        profileTip.onPointerOver?.(event);
                    },
                    onPointerOut: (event) => {
                        args.onHoverInfo(undefined);
                        profileTip.onPointerOut?.(event);
                    },
                    onPointerTap: () => args.onProfile(data.playerId),
                },
                name: { visible: true, caption: data.name },
                face: {
                    visible: !!data.figure,
                    children: (
                        <FriendListFace
                            figure={data.figure}
                            gender={data.gender}
                        />
                    ),
                },
                start_chat: {
                    visible: showChat,
                    ...buttonImage('start_chat'),
                    ...args.tip('friendlist.tip.im'),
                    onPointerTap: own(() => args.onStartChat(data.playerId)),
                },
                ask_for_friend: {
                    visible: showAsk,
                    ...buttonImage('ask_for_friend'),
                    ...args.tip('friendlist.tip.addfriend'),
                    onPointerTap: own(() => args.onAskForFriend(data)),
                },
                user_info_region: { visible: data.playerId > 0 },
                ...userInfoState(args.hoveredInfo === data.playerId),
            },
        };
    };

    rows.push(caption('friendlist.search.friendscaption', 'friendlist.search.nofriendsfound', args.friends.length));

    for (const data of args.friends) rows.push(result(data, data.isOnline || args.messagesPersisted, false));

    rows.push(caption('friendlist.search.otherscaption', 'friendlist.search.noothersfound', args.others.length));

    for (const data of args.others) rows.push(result(data, false, (data.playerId !== args.ownUserId) && !args.sentRequestIds.includes(data.playerId)));

    return rows;
};
