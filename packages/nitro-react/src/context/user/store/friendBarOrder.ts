/**
 * The friend bar's list - `HabboFriendBarData`'s friend array, kept as the ids of the friends it
 * holds, in its order. It holds only friends who are online, and it is never sorted
 * (`sortByName` hands its argument back unchanged), so the order is the order they arrived in:
 *
 * - `buildFriendList` (a `FriendListFragment`) appends each online friend.
 * - `onFriendListUpdate` takes the removed ids out, then goes through the updated friends - one
 *   still online stays where it is, one gone offline leaves, and one the list does not hold yet
 *   (they have just come online) goes to the front - and then appends each added friend who is
 *   online and not held yet.
 *
 * Kept free of runtime imports so it can be tested under Node as it stands.
 */
import type { IMessengerFriend, IMessengerUpdate } from '@nitrodevco/nitro-packets';

/** `FriendListUpdateActionType`'s values, as numbers so this module needs no runtime import. */
const REMOVED = -1;
const UPDATED = 0;
const ADDED = 1;

/** `buildFriendList`: the fragment's online friends after the ones already held. */
export const friendBarAfterFragment = (ids: readonly number[], fragment: readonly IMessengerFriend[]): number[] => {
    const next = [ ...ids ];

    for (const friend of fragment) {
        if (friend.isOnline && !next.includes(friend.playerId)) next.push(friend.playerId);
    }

    return next;
};

/** `onFriendListUpdate`: removals, then updates, then additions, as the parser groups them. */
export const friendBarAfterUpdates = (ids: readonly number[], updates: readonly IMessengerUpdate[]): number[] => {
    let next = [ ...ids ];

    for (const update of updates) {
        if (Number(update.actionType) === REMOVED) next = next.filter(id => id !== update.friendId);
    }

    for (const update of updates) {
        if ((Number(update.actionType) !== UPDATED) || !update.friend) continue;

        const held = next.includes(update.friend.playerId);

        if (update.friend.isOnline) {
            if (!held) next.unshift(update.friend.playerId);
        } else if (held) {
            next = next.filter(id => id !== update.friend?.playerId);
        }
    }

    for (const update of updates) {
        if ((Number(update.actionType) !== ADDED) || !update.friend) continue;

        if (update.friend.isOnline && !next.includes(update.friend.playerId)) next.push(update.friend.playerId);
    }

    return next;
};

/** `setFriendAt(friend, 0)`: a friend moved to the front of the bar, if the bar holds them. */
export const friendBarMovedToFront = (ids: readonly number[], friendId: number): number[] =>
    (ids.includes(friendId) ? [ friendId, ...ids.filter(id => id !== friendId) ] : [ ...ids ]);

/** `FriendNotification`: one of a friend's notifications on the bar. */
export interface FriendBarNotification {
    typeCode: number;
    message: string;
    /** Dropped once the friend's tab has been opened and closed again (`Token.viewOnce`). */
    viewOnce: boolean;
}

/** `FriendNotification.TYPE_PLAYING_GAME` / `TYPE_FINISHED_GAME`. */
export const FRIEND_NOTIFICATION_PLAYING_GAME = 3;
export const FRIEND_NOTIFICATION_FINISHED_GAME = 4;

/**
 * `makeNotification` for a `FriendNotificationMessage`, and what the friend's tab then does with it
 * (`NewFriendEntityTab.addNotificationToken`): a notification of a type the friend already has
 * replaces its message and `viewOnce`, a new one is added, and a finished game takes the playing
 * game notification away with it. Every type but playing a game is shown once, and every type but
 * a finished game moves the friend to the front - except a playing game notification the friend
 * already has, whose message is updated and nothing else (`_arg_6` false). `undefined` when the
 * bar does not hold the friend.
 */
export const friendBarAfterNotification = (ids: readonly number[], notifications: readonly FriendBarNotification[], friendId: number, typeCode: number, message: string): { ids: number[]; notifications: FriendBarNotification[] } | undefined => {
    if (!ids.includes(friendId)) return undefined;

    const viewOnce = typeCode !== FRIEND_NOTIFICATION_PLAYING_GAME;
    const existing = notifications.find(notification => notification.typeCode === typeCode);

    let next = existing
        ? notifications.map(notification => ((notification === existing) ? { typeCode, message, viewOnce } : notification))
        : [ ...notifications, { typeCode, message, viewOnce } ];

    if (typeCode === FRIEND_NOTIFICATION_FINISHED_GAME) {
        next = next.filter(notification => (notification.typeCode !== FRIEND_NOTIFICATION_PLAYING_GAME) && (notification.typeCode !== FRIEND_NOTIFICATION_FINISHED_GAME));
    }

    if (existing && (typeCode === FRIEND_NOTIFICATION_PLAYING_GAME)) return { ids: [ ...ids ], notifications: next };

    return {
        ids: (typeCode !== FRIEND_NOTIFICATION_FINISHED_GAME) ? friendBarMovedToFront(ids, friendId) : [ ...ids ],
        notifications: next,
    };
};
