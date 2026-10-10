/**
 * The friend bar - `HabboFriendBarView`, drawn from its `new_bar` template at the right end of the
 * bottom bar, 1 above the desktop's bottom (`NEW_BAR_BOTTOM_OFFSET`). `arrangeWindows` lays the bar's
 * shown windows side by side, each at its own y, and makes the bar as wide as they are:
 *
 * - `friendtools`: the divider `line` (at x 1, hidden while collapsed), `icon_all_friends` (the friend
 *   list, with the unseen counter of friend requests), `icon_find_friends` (the friend list's search
 *   tab), `icon_messenger` (`useFriendBarMessengerIcon`) and, while the bar is collapsed,
 *   `collapse_left`.
 * - `button_left_page`, `list` - the tabs (`friendBarTabs`) - and `button_right_page`, the arrows only
 *   while there are more tabs than room, each faded to 0.2 and disabled when it cannot page
 *   (`toggleArrowButtons`), paging on a press (`WME_DOWN`).
 * - `collapse_right`, while the bar is open.
 *
 * The tabs are the bar's online friends from `_startIndex`, as many as fit right of the toolbar
 * (`maxNumOfTabsVisible`), then find friends tabs - enough to make three tabs when there are few
 * friends, or one after the last page of friends. One tab is selected at a time (`selectTab` /
 * `deSelect`), and it grows upwards over the bar; paging, a press on the bar's `border` and the bar
 * losing the focus (`WE_DEACTIVATED`: a press anywhere else) deselect it.
 *
 * Collapsing folds the bar to `friendtools`: over 140 ms, eased `1 - (1 - t)^3`, the bar slides right
 * until only its first 150 show (`startCollapseAnimation`), and the state is saved as bit 1 of the
 * account's `uiFlags` (`setFriendBarState`). The width reported to the chat bar is that visible part
 * (`getReservedFriendBarWidth`).
 *
 * `icon_all_friends` opens the friend list on its requests tab while there are requests, and
 * otherwise on the friends tab, or closes it (`HabboFriendBarData.toggleFriendList`); the bar only
 * knows of requests while `friendbar.requests.enabled` is on (`showFriendRequests`), and so only
 * counts them then. Not carried: the dimmer over the bar while the room entry effect runs, and the
 * `friendbar/` link tracker.
 */
import { FriendRequestStateType, SetUIFlagsComposer } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, useCallback, useRef, useState } from 'react';

import { findNewFriends, followFriendFromBar, openProfile, startFriendBarConversation } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useIsWindowVisible, useSystemActions, useToolbarAreaWidth, useTranslation } from '#base/context/system';
import { FriendBarNotification, UiFlagEnum, useFriendBarCollapsed, useFriendBarFriends, useFriendRequests, useUserActions, useUserMessengerActions, useUserStore } from '#base/context/user';
import { easeOutCubic, useTween, useViewportSize } from '#base/hooks';
import { Region, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useOutsideClick, useTemplate } from '#base/theme';
import { getBadgeName } from '#base/utils';
import { UnseenItemCounterView } from '#base/views/shared/UnseenItemCounterView';

import { FRIEND_BAR_BOTTOM_OFFSET, FRIEND_BAR_COLLAPSE_MS, FRIEND_BAR_HEIGHT, FRIEND_BAR_TOOLS_WIDTH, friendBarWidth, layoutFriendBar, maxFriendBarTabs, pageFriendBar } from './friendBarLayout';
import {
    CONTROLS_PIECE_TEMPLATE, FIND_FRIENDS_TAB_TEMPLATE, findFriendsTabItem, FRIEND_TAB_TEMPLATE, friendTabItem, friendTokens, growSelectedFindFriendsTab, growSelectedFriendTab, listItemAt, MESSAGE_PIECE_TEMPLATE, TokenTexts,
} from './friendBarTabs';
import { GAME_TOKEN_TYPE } from './FriendBarTokenIcon';
import { useFriendBarMessengerIcon } from './useFriendBarMessengerIcon';

const BAR_TEMPLATE = 'habbo-friend-bar-com/new_bar_xml';

/** No notifications: one array for every friend without any. */
const NO_NOTIFICATIONS: FriendBarNotification[] = [];

/** The selected tab: a friend by id, or a find friends tab by its place among them. */
type SelectedTab = { friendId: number } | { findIndex: number } | null;

/** A tab by its place in `list`: a friend by id, or a find friends tab by its place among them. */
type TabKey = { friendId: number } | { findIndex: number };

const sameTab = (a: SelectedTab, b: TabKey) => !!a && (('friendId' in a) ? (('friendId' in b) && (a.friendId === b.friendId)) : (('findIndex' in b) && (a.findIndex === b.findIndex)));

export const FriendBarView = forwardRef<PixiContainer>((_, ref) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const { showWindow, hideWindow, toggleWindow } = useSystemActions();
    const { setUiFlag } = useUserActions();
    const friends = useFriendBarFriends();
    const requests = useFriendRequests();
    const notificationsByFriend = useUserStore(x => x.friendBarNotifications);
    const requestsEnabled = useConfigValue<boolean>('friendbar.requests.enabled') === true;
    const friendListOpen = useIsWindowVisible('friendlist');
    const collapsed = useFriendBarCollapsed();
    const toolbarAreaWidth = useToolbarAreaWidth();
    const { width: viewportWidth } = useViewportSize();
    const friendTemplate = useTemplate(FRIEND_TAB_TEMPLATE);
    const messageTemplate = useTemplate(MESSAGE_PIECE_TEMPLATE);
    const controlsTemplate = useTemplate(CONTROLS_PIECE_TEMPLATE);
    const findFriendsTemplate = useTemplate(FIND_FRIENDS_TAB_TEMPLATE);
    const messengerIcon = useFriendBarMessengerIcon();
    const [ startIndex, setStartIndex ] = useState(0);
    const [ selected, setSelectedTab ] = useState<SelectedTab>(null);
    const [ exposed, setExposed ] = useState<TabKey | null>(null);
    const { clearViewedFriendBarNotifications } = useUserMessengerActions();
    const barRef = useRef<PixiContainer | null>(null);

    // The toolbar measures the bar (its reserved width) through the forwarded ref; the bar's own
    // press-outside check needs it too.
    const attachBar = useCallback((node: PixiContainer | null) => {
        barRef.current = node;

        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
    }, [ ref ]);

    /** `selectTab` / `deSelect`: a friend's tab that closes drops its shown-once tokens (`NewFriendEntityTab.deselect`). */
    const setSelected = (next: SelectedTab) => {
        const closing = (selected && ('friendId' in selected)) ? selected.friendId : undefined;

        if ((closing !== undefined) && !(next && ('friendId' in next) && (next.friendId === closing))) clearViewedFriendBarNotifications(closing);

        // `Tab.select` conceals the tab it opens.
        if (next) setExposed(null);

        setSelectedTab(next);
    };

    // `WE_DEACTIVATED`: a press anywhere off the bar (and its open tab) deselects.
    useOutsideClick(barRef, () => setSelected(null), selected !== null);

    // 0 open, 1 collapsed, and in between while `onCollapseAnimationTimer` runs.
    const collapseProgress = useTween(collapsed ? 1 : 0, FRIEND_BAR_COLLAPSE_MS, easeOutCubic);

    // `HabboFriendBarData.onFriendRequestEvent`: an accepted or declined request leaves the bar's own list at once.
    const numRequests = requestsEnabled ? Object.values(requests).filter(request => request.state === FriendRequestStateType.Open).length : 0;
    // `resizeAndPopulate` gives the bar the desktop right of the toolbar before it counts the tabs.
    const maxTabs = maxFriendBarTabs(viewportWidth - toolbarAreaWidth);
    const bar = layoutFriendBar(friends.length, maxTabs, startIndex);
    const shownFriends = friends.slice(bar.startIndex, bar.startIndex + bar.friendTabs);
    const tabs = bar.friendTabs + bar.findFriendsTabs;
    const fullWidth = friendBarWidth(tabs, bar.arrows, collapsed);
    // The part of the bar on screen: all of it open, `friendtools` collapsed, and between the two while it slides.
    const visibleWidth = Math.round(fullWidth + ((FRIEND_BAR_TOOLS_WIDTH - fullWidth) * collapseProgress));

    const page = (direction: -1 | 1) => {
        const next = pageFriendBar(bar.startIndex, direction, friends.length, numRequests, maxTabs);

        if (next === bar.startIndex) return;

        setSelected(null);
        setStartIndex(next);
    };

    /** `toggleCollapsedState`: the other state, saved to the account, with the selection dropped. */
    const toggleCollapsed = () => {
        setSelected(null);
        send(new SetUIFlagsComposer({ flags: setUiFlag(UiFlagEnum.FriendBarExpanded, collapsed) }));
    };

    /** `HabboFriendBarData.toggleFriendList`. */
    const toggleFriendList = () => {
        if (friendListOpen) hideWindow('friendlist');
        else showWindow('friendlist', { tab: (numRequests > 0) ? 'requests' : 'friends' });
    };

    /** A token's `message_piece` texts (`RoomEventToken`, `AchievementToken`, `QuestToken`, `GameToken`). */
    const tokenTexts = (token: FriendBarNotification): TokenTexts => {
        switch (token.typeCode) {
            case 0: return { title: t('friendbar.notify.event'), message: token.message };
            case 1: return { title: t('friendbar.notify.achievement'), message: getBadgeName(t, token.message) };
            case 2: return { title: t('friendbar.notify.quest'), message: t(`quests.${token.message}.name`) };
            case GAME_TOKEN_TYPE: return { title: t('friendbar.notify.game'), message: t(`gamecenter.${token.message}.name`) };
            default: return { title: '', message: '' };
        }
    };

    /** The handlers a tab at `key` gets. */
    const handlersFor = (key: TabKey) => ({
        onToggle: () => setSelected(sameTab(selected, key) ? null : key),
        // `_onMouseOver` / `_onMouseOut`: a selected tab is not exposed.
        onExpose: (on: boolean) => {
            if (sameTab(selected, key)) return;

            setExposed(current => (on ? key : ((current && sameTab(current, key)) ? null : current)));
        },
        onDeselect: () => setSelected(null),
    });

    const items: TemplateItem[] = [];

    if (friendTemplate) {
        for (const friend of shownFriends) {
            const key = { friendId: friend.playerId };

            items.push(friendTabItem(friendTemplate, {
                ...handlersFor(key),
                friend,
                tokens: friendTokens(notificationsByFriend[friend.playerId] ?? NO_NOTIFICATIONS),
                selected: sameTab(selected, key),
                exposed: sameTab(exposed, key),
                profileTooltip: t('infostand.profile.link.tooltip', ''),
                tokenTexts,
                messageTemplate,
                controlsTemplate,
                onChat: () => startFriendBarConversation(send, friend.playerId),
                onVisit: () => followFriendFromBar(send, friend.playerId),
                onProfile: () => openProfile(send, friend.playerId),
            }));
        }
    }

    if (findFriendsTemplate) {
        for (let findIndex = 0; findIndex < bar.findFriendsTabs; findIndex++) {
            const key = { findIndex };

            items.push(findFriendsTabItem(findFriendsTemplate, {
                ...handlersFor(key),
                index: findIndex,
                selected: sameTab(selected, key),
                exposed: sameTab(exposed, key),
                onFind: () => findNewFriends(send),
            }));
        }
    }

    // The selected tab's place in `list`, and whether it is a friend's.
    let selectedIndex = -1;

    if (selected) selectedIndex = ('friendId' in selected) ? shownFriends.findIndex(friend => friend.playerId === selected.friendId) : (shownFriends.length + selected.findIndex);

    const bindings: TemplateBindings = {
        // `barWindowEventProc`'s `BORDER`: a press on the bar itself deselects.
        '': {
            onPointerDown: (event: FederatedPointerEvent) => {
                if (event.target === event.currentTarget) setSelected(null);
            },
        },
        line: { visible: !collapsed },
        icon_all_friends: {
            onPointerTap: toggleFriendList,
            // `updateFriendRequestCounter`: its right edge 5 in from the region's, at its top.
            children: (
                <UnseenItemCounterView
                    count={numRequests}
                    layout={{ position: 'absolute', right: 5, top: 0 }}
                />
            ),
        },
        // `openUserTextSearch`: the friend list on its search tab, or closed if that is where it is.
        icon_find_friends: { onPointerTap: () => toggleWindow('friendlist', { tab: 'search' }) },
        ...messengerIcon,
        collapse_left: { visible: collapsed, onPointerTap: toggleCollapsed },
        collapse_right: { visible: !collapsed, onPointerTap: toggleCollapsed },
        button_left_page: { visible: bar.arrows, disabled: !bar.canPageLeft, alpha: bar.canPageLeft ? 1 : 0.2, onPointerDown: bar.canPageLeft ? () => page(-1) : undefined },
        button_right_page: { visible: bar.arrows, disabled: !bar.canPageRight, alpha: bar.canPageRight ? 1 : 0.2, onPointerDown: bar.canPageRight ? () => page(1) : undefined },
        list: { items },
    };

    const arrange = ({ root, find }: TemplateWindows) => {
        const window = root();

        if (!window) return;

        // `resizeAndPopulate`: the divider at the bar's left edge while it is open.
        if (!collapsed) find('line')?.setX(1);

        // `selectTab`: the selected tab grows upwards over the bar.
        const tab = (selectedIndex >= 0) ? listItemAt(find('list'), selectedIndex) : undefined;

        if (tab && selected) {
            if ('friendId' in selected) growSelectedFriendTab(tab);
            else if (findFriendsTemplate) growSelectedFindFriendsTab(tab, findFriendsTemplate);
        }

        // `arrangeWindows`: the shown windows side by side, the bar as wide as they are.
        let x = 0;

        for (const child of window.children) {
            if (!child.visible) continue;

            child.setX(x);
            x += child.width;
        }

        window.setWidth(x);
    };

    return (
        <Region
            ref={attachBar}
            layout={{ position: 'absolute', right: 0, bottom: FRIEND_BAR_BOTTOM_OFFSET, width: visibleWidth, height: FRIEND_BAR_HEIGHT }}
        >
            <TemplateWindow
                id={BAR_TEMPLATE}
                width={fullWidth}
                bindings={bindings}
                arrange={arrange}
            />
        </Region>
    );
});

FriendBarView.displayName = 'FriendBarView';
