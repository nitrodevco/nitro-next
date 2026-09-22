/**
 * The geometry every friend list tab shares - `tab_content`'s `list` as
 * `FriendListTabsView.refreshTabContentDims` / `refreshScrollBarVisibility` size it: the list at
 * x 5, `tabContentWidth - 10` wide; while it scrolls, the `list_content` is 22 narrower and the
 * 20px `scroller` sits at `tabContentWidth - 27` inside the list (5 after the rows, 2 from the
 * tab's right edge). The item list has no `spacing`, so its rows touch.
 */
import { BoxLayout } from '#base/theme';

export const FRIEND_LIST_SCROLL_LAYOUT: BoxLayout = { flex: 1, width: 'auto', marginLeft: 5, marginRight: 5, gap: 5 };

export const FRIEND_LIST_SCROLLBAR_LAYOUT: BoxLayout = { width: 20, marginRight: -3 };

export const FRIEND_LIST_CONTENT_LAYOUT: BoxLayout = { position: 'relative', width: '100%', flexDirection: 'column' };
