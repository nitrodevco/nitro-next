/**
 * The friend bar's list and tabs against the AS3 they port: `HabboFriendBarData.buildFriendList` /
 * `onFriendListUpdate` (`nitro-react/src/context/user/store/friendBarOrder.ts`) and
 * `HabboFriendBarView.populate` / `getNumberOfFindFriendsTabs` / `barWindowEventProc` /
 * `maxNumOfTabsVisible` (`nitro-react/src/views/friend-bar/friendBarLayout.ts`).
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const { friendBarAfterFragment, friendBarAfterNotification, friendBarAfterUpdates, friendBarMovedToFront } = await import('../packages/nitro-react/src/context/user/store/friendBarOrder.ts');
const { friendBarWidth, layoutFriendBar, maxFriendBarTabs, pageFriendBar } = await import('../packages/nitro-react/src/views/friend-bar/friendBarLayout.ts');

const friend = (playerId, isOnline = true) => ({ playerId, isOnline });
const REMOVED = -1;
const UPDATED = 0;
const ADDED = 1;
const update = (actionType, playerId, isOnline = true) => ({ actionType, friendId: playerId, friend: (actionType === REMOVED) ? undefined : friend(playerId, isOnline) });

await test('a fragment appends its online friends in order, unsorted', () => {
    assert.deepEqual([ ...friendBarAfterFragment([], [ friend(3), friend(1, false), friend(2) ]) ], [ 3, 2 ]);
    assert.deepEqual([ ...friendBarAfterFragment([ 3 ], [ friend(3), friend(5) ]) ], [ 3, 5 ]);
});

await test('a friend coming online goes to the front; going offline leaves', () => {
    assert.deepEqual([ ...friendBarAfterUpdates([ 1, 2 ], [ update(UPDATED, 9) ]) ], [ 9, 1, 2 ]);
    assert.deepEqual([ ...friendBarAfterUpdates([ 1, 2 ], [ update(UPDATED, 1, false) ]) ], [ 2 ]);
    // An update to a friend already held keeps their place.
    assert.deepEqual([ ...friendBarAfterUpdates([ 1, 2 ], [ update(UPDATED, 2) ]) ], [ 1, 2 ]);
});

await test('removals, then updates, then additions - an added friend goes to the end', () => {
    const next = friendBarAfterUpdates([ 1, 2 ], [ update(ADDED, 7), update(REMOVED, 1), update(UPDATED, 8), update(ADDED, 6, false) ]);

    assert.deepEqual([ ...next ], [ 8, 2, 7 ]);
});

await test('maxNumOfTabsVisible: (width - 150 - 16) / 130, truncated', () => {
    assert.equal(maxFriendBarTabs(166 + 130 * 3), 3);
    assert.equal(maxFriendBarTabs(166 + 130 * 3 - 1), 2);
});

await test('few friends: find friends tabs make up three tabs, and no arrows', () => {
    assert.deepEqual(layoutFriendBar(0, 10, 0), { startIndex: 0, friendTabs: 0, findFriendsTabs: 3, arrows: false, canPageLeft: false, canPageRight: false });
    assert.deepEqual(layoutFriendBar(1, 10, 0), { startIndex: 0, friendTabs: 1, findFriendsTabs: 2, arrows: false, canPageLeft: false, canPageRight: false });
    assert.equal(layoutFriendBar(5, 10, 0).findFriendsTabs, 1);
    // No more find friends tabs than there is room for.
    assert.equal(layoutFriendBar(1, 2, 0).findFriendsTabs, 1);
});

await test('more friends than room: a page of friends, arrows, the find tab after the last page', () => {
    const first = layoutFriendBar(10, 4, 0);

    assert.deepEqual(first, { startIndex: 0, friendTabs: 4, findFriendsTabs: 0, arrows: true, canPageLeft: false, canPageRight: true });

    const next = pageFriendBar(0, 1, 10, 0, 4);

    assert.equal(next, 4);

    const last = pageFriendBar(next, 1, 10, 0, 4);

    // total 11 (10 friends and the find tab) less the 4 that fit.
    assert.equal(last, 7);
    assert.deepEqual(layoutFriendBar(10, 4, last), { startIndex: 7, friendTabs: 3, findFriendsTabs: 1, arrows: true, canPageLeft: true, canPageRight: false });
    assert.equal(pageFriendBar(last, -1, 10, 0, 4), 3);
});

await test('populate pulls a start index back when the list has shrunk under it', () => {
    assert.equal(layoutFriendBar(5, 4, 7).startIndex, 2);
});

await test('arrangeWindows: the bar is as wide as what it shows', () => {
    // friendtools, three tabs with two gaps, collapse_right.
    assert.equal(friendBarWidth(3, false, false), 150 + (3 * 127) + (2 * 3) + 15);
    // Collapsed, collapse_right is hidden; the arrows add 28 and 29.
    assert.equal(friendBarWidth(2, true, true), 150 + 28 + 29 + (2 * 127) + 3);
    assert.equal(friendBarWidth(0, false, false), 150 + 15);
});

await test('makeNotification: added, shown once, and the friend moved to the front', () => {
    const next = friendBarAfterNotification([ 1, 2, 3 ], [], 3, 1, 'ACH_Login1');

    assert.deepEqual([ ...next.ids ], [ 3, 1, 2 ]);
    assert.deepEqual(next.notifications.map(n => ({ ...n })), [ { typeCode: 1, message: 'ACH_Login1', viewOnce: true } ]);
    // Not a friend the bar holds (offline): nothing.
    assert.equal(friendBarAfterNotification([ 1 ], [], 9, 0, 'x'), undefined);
});

await test('a notification of a type the friend has replaces it', () => {
    const next = friendBarAfterNotification([ 1 ], [ { typeCode: 0, message: 'old', viewOnce: true } ], 1, 0, 'new');

    assert.deepEqual(next.notifications.map(n => ({ ...n })), [ { typeCode: 0, message: 'new', viewOnce: true } ]);
});

await test('playing a game stays until the game ends, and a repeat does not move the friend', () => {
    const playing = friendBarAfterNotification([ 1, 2 ], [], 2, 3, 'snowwar');

    assert.deepEqual([ ...playing.ids ], [ 2, 1 ]);
    assert.equal(playing.notifications[0].viewOnce, false);

    const repeat = friendBarAfterNotification([ 1, 2 ], playing.notifications, 2, 3, 'basejump');

    assert.deepEqual([ ...repeat.ids ], [ 1, 2 ]);
    assert.equal(repeat.notifications[0].message, 'basejump');

    const finished = friendBarAfterNotification([ 1, 2 ], playing.notifications, 2, 4, '');

    assert.deepEqual([ ...finished.ids ], [ 1, 2 ]);
    assert.deepEqual([ ...finished.notifications ], []);
});

await test('setFriendAt(friend, 0)', () => {
    assert.deepEqual([ ...friendBarMovedToFront([ 1, 2, 3 ], 3) ], [ 3, 1, 2 ]);
    assert.deepEqual([ ...friendBarMovedToFront([ 1, 2 ], 9) ], [ 1, 2 ]);
});
