/**
 * The Builders Club half of Flash's `HabboCatalog`: the membership's seconds left counted from the
 * status packet (`builderSecondsLeft`, `builderSecondsLeftWithGrace`), `refreshBuilderStatus`
 * (the member / grace flags and the window header's status), and
 * `getBuilderFurniPlaceableStatusForOffer` / `getBuilderFurniPlaceableStatus` - whether a builders
 * club offer can be placed in the room the user is in, and if not, why.
 *
 * `refreshBuilderStatus` also raises `CATALOG_BUILDER_MEMBERSHIP_IN_GRACE` / `_EXPIRED` in Flash,
 * which only `HabboNotifications.showNotification` hears - a pop-up (`notification.builders_club.*`
 * says `POP_UP`) that the port has no window for (see `NotificationDialogMessage` in
 * `drift/known.py`), so the flags are kept and nothing is raised.
 */
import { IPurchasableOffer, RoomControllerLevelEnum, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { StoreApi } from 'zustand';

import { CatalogStore, CatalogWidgetEventEnum } from '#base/context/catalog';
import { getRoom, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';

type CatalogStoreApi = StoreApi<CatalogStore>;

/**
 * `BuilderFurniPlaceableStatus` (`catalog/enum`): why an offer cannot be placed, 0 when it can.
 * Flash's names for 0 and 2 are obfuscated (`§_-D2B§`, `§_-BG§`); these say what they mean.
 */
export const BUILDER_FURNI_PLACEABLE_STATUS_OKAY = 0;
export const BUILDER_FURNI_PLACEABLE_STATUS_MISSING_OFFER = 1;
export const BUILDER_FURNI_PLACEABLE_STATUS_FURNI_LIMIT_REACHED = 2;
export const BUILDER_FURNI_PLACEABLE_STATUS_NOT_IN_ROOM = 3;
export const BUILDER_FURNI_PLACEABLE_STATUS_NOT_ROOM_OWNER_OR_GROUP_ADMIN = 4;
export const BUILDER_FURNI_PLACEABLE_STATUS_GUILD_ROOM = 5;
export const BUILDER_FURNI_PLACEABLE_STATUS_VISITORS_IN_ROOM = 6;

/** `HabboCatalog.update` refreshes the header at most every 500 ms, and only within 200 s either side of an expiry. */
const BUILDER_STATUS_REFRESH_INTERVAL = 500;
const BUILDER_STATUS_REFRESH_WINDOW = 200;
const BUILDER_STATUS_REFRESH_PAST = -3;

/** `builderSecondsLeft`: the membership's seconds left, counted down from the status packet. */
export const getBuilderSecondsLeft = (store: CatalogStoreApi, now: number): number => {
    const { builderSecondsLeftAtUpdate, builderMembershipUpdateTime } = store.getState();

    return builderSecondsLeftAtUpdate - ((now - builderMembershipUpdateTime) / 1000);
};

/** `builderSecondsLeftWithGrace`: the same, with the grace period. */
export const getBuilderSecondsLeftWithGrace = (store: CatalogStoreApi, now: number): number => {
    const { builderSecondsLeftWithGraceAtUpdate, builderMembershipUpdateTime } = store.getState();

    return builderSecondsLeftWithGraceAtUpdate - ((now - builderMembershipUpdateTime) / 1000);
};

/** `builderSecondsLeft > 0` now - what the builders club pages check when they are built or told the membership changed. */
export const hasBuilderSecondsLeft = (store: CatalogStoreApi): boolean => (getBuilderSecondsLeft(store, performance.now()) > 0);

/**
 * `refreshBuilderStatus`: whether the user is a member or in the grace period now, and the seconds
 * the header's `builder.header.status.membership` shows - the membership's while a member, the
 * grace period's while in grace (a trial user sees the status name instead, which the header
 * works out from the two flags).
 */
export const refreshBuilderStatus = (store: CatalogStoreApi) => {
    const now = performance.now();
    const secondsLeft = getBuilderSecondsLeft(store, now);
    const secondsLeftWithGrace = getBuilderSecondsLeftWithGrace(store, now);
    const isMember = (secondsLeft > 0);
    const isInGrace = (secondsLeftWithGrace > 0);

    store.getState().setBuilderStatus(isMember, isInGrace, isMember ? secondsLeft : (isInGrace ? secondsLeftWithGrace : 0), now);
};

/**
 * `HabboCatalog.update`'s builder part: once the header is 500 ms old, refresh it while either
 * countdown is within 200 s of running out (or ran out under 3 s ago), so the last minutes tick.
 */
export const updateBuilderStatus = (store: CatalogStoreApi) => {
    const now = performance.now();

    if ((now - store.getState().builderMembershipDisplayUpdateTime) <= BUILDER_STATUS_REFRESH_INTERVAL) return;

    const secondsLeft = getBuilderSecondsLeft(store, now);
    const secondsLeftWithGrace = getBuilderSecondsLeftWithGrace(store, now);
    const nearExpiry = (seconds: number) => ((seconds > BUILDER_STATUS_REFRESH_PAST) && (seconds < BUILDER_STATUS_REFRESH_WINDOW));

    if (nearExpiry(secondsLeft) || nearExpiry(secondsLeftWithGrace)) refreshBuilderStatus(store);
};

/** `dispatchBuilderSubscriptionUpdatedToCatalogPages`: the page on show hears the membership changed. */
export const dispatchBuilderSubscriptionUpdated = (store: CatalogStoreApi) => {
    store.getState().activePage?.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.BUILDER_SUBSCRIPTION_UPDATED });
};

/**
 * `getBuilderFurniPlaceableStatus`: whether the user may place builders club furni in the room.
 * A guild room the user does not own needs `builders.club.furniture.placement.group.room.enabled`;
 * rights below group admin (`roomControllerLevel < 3`) refuse; and once the membership has run
 * out (a trial), the room must have no other users in it but moderators.
 */
export const getBuilderFurniPlaceableStatus = (store: CatalogStoreApi): number => {
    const { isRoomOwner, isGuildRoom, controllerLevel, ownRoomIndex, usersByRoomObjectId } = roomStore.getState();

    if (!isRoomOwner && isGuildRoom && (systemStore.getState().config['builders.club.furniture.placement.group.room.enabled'] !== true)) return BUILDER_FURNI_PLACEABLE_STATUS_GUILD_ROOM;

    if (Number(controllerLevel) < Number(RoomControllerLevelEnum.GuildAdmin)) return BUILDER_FURNI_PLACEABLE_STATUS_NOT_ROOM_OWNER_OR_GROUP_ADMIN;

    if (getBuilderSecondsLeft(store, performance.now()) <= 0) {
        for (const user of Object.values(usersByRoomObjectId)) {
            if ((Number(user.userType) === Number(RoomObjectUserType.User)) && (user.objectId !== ownRoomIndex) && !user.isModerator) return BUILDER_FURNI_PLACEABLE_STATUS_VISITORS_IN_ROOM;
        }
    }

    return BUILDER_FURNI_PLACEABLE_STATUS_OKAY;
};

/** `getBuilderFurniPlaceableStatusForOffer`: no offer, the furni limit, no room, then the room's own checks. */
export const getBuilderFurniPlaceableStatusForOffer = (store: CatalogStoreApi, offer: IPurchasableOffer | undefined): number => {
    if (!offer) return BUILDER_FURNI_PLACEABLE_STATUS_MISSING_OFFER;

    const { builderFurniCount, builderFurniLimit } = store.getState();

    if ((builderFurniCount < 0) || (builderFurniCount >= builderFurniLimit)) return BUILDER_FURNI_PLACEABLE_STATUS_FURNI_LIMIT_REACHED;

    if (!getRoom()) return BUILDER_FURNI_PLACEABLE_STATUS_NOT_IN_ROOM;

    return getBuilderFurniPlaceableStatus(store);
};
