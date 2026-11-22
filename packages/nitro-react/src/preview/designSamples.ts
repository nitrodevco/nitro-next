/**
 * The sample content the preview host's design window draws the game's own views with (`DESIGN_STATES`):
 * what a user would have - badges, furni, friends, conversations, rooms, currencies - fed to the stores as
 * the packets would fill them. Each `fill` returns what puts its stores back as they were, and a view
 * hands it to `usePreviewSample`, which puts them back before the next view fills its own; a view that
 * changes its samples with its state keeps the store when it opens (`keepUser`, `keepNavigator`) and
 * fills it on each state. Nothing is sent. Not a Flash feature.
 */
import { AvatarGenderType, LegacyDataType } from '@nitrodevco/nitro-api';
import { FriendRequestStateType, IFriendRequest, IFurniListAddOrUpdateFurni, IMessengerFriend, MessengerFriendRelationType } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { inventoryStore } from '#base/context/inventory';
import { messengerStore } from '#base/context/messenger';
import { navigatorStore } from '#base/context/navigator';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

type UserState = ReturnType<typeof userStore.getState>;
type MessengerState = ReturnType<typeof messengerStore.getState>;
type RoomState = ReturnType<typeof roomStore.getState>;

/** The badges the user has: a few of Habbo's own. */
export const SAMPLE_BADGES = [ 'ADM', 'ACH_Login1', 'ACH_RoomEntry1', 'ACH_Motto1', 'ACH_AvatarLooks1', 'ACH_GuideEnrollmentLifetime1', 'UK183', 'HC1' ];

/** How many furni the inventory's grid shows. */
const SAMPLE_FURNI_COUNT = 12;

const FRIEND_FIGURE = 'hr-115-42.hd-195-19.ch-3030-82.lg-275-1408.fa-1201.ca-1804-64';

const friend = (playerId: number, name: string, isOnline: boolean, motto: string): IMessengerFriend => ({
    playerId,
    name,
    gender: AvatarGenderType.Male,
    isOnline,
    canFollow: isOnline,
    figure: FRIEND_FIGURE,
    categoryId: 0,
    motto,
    realName: '',
    facebookId: '',
    persistedUser: true,
    vipMember: false,
    pocketHabboUser: false,
    relationshipType: MessengerFriendRelationType.Zero,
});

/** The user's friends, online and offline: the friends list's rows and the friend bar's tabs. */
const SAMPLE_FRIENDS = [ friend(1, 'Bonnie', true, 'Building all day'), friend(2, 'Frank', true, 'Welcome!'), friend(3, 'Marcy', false, 'Back soon'), friend(4, 'Pixel', false, 'Pixels everywhere') ];

const SAMPLE_FRIEND_REQUESTS: IFriendRequest[] = [ { playerId: 5, name: 'Newbie', figure: FRIEND_FIGURE, state: FriendRequestStateType.Open }, { playerId: 6, name: 'Quizmaster', figure: FRIEND_FIGURE, state: FriendRequestStateType.Open } ];

/** What puts `store` back as it is now. */
const keep = <T>(store: StoreApi<T>) => {
    const own = store.getState();

    return () => store.setState(own, true);
};

/** The user store, put back as it is now by what this returns (`DesignPurseView`). */
export const keepUser = () => keep(userStore);

/** The navigator store, put back as it is now by what this returns (`DesignNavigatorView`). */
export const keepNavigator = () => keep(navigatorStore);

/** Sample values over the user's, as `CreditBalance`, `ActivityPointNotification` and `ScrSendUserInfo` would set them. */
export const setSampleUser = (values: Partial<UserState>) => userStore.setState(values);

const sampleBadges = () => SAMPLE_BADGES.map((badgeCode, index) => ({ badgeId: index + 1, badgeCode, ownerCount: 1, badgeRarityId: 0 }));

/** The user owns `SAMPLE_BADGES` (`BadgesEvent`). */
export const fillSampleBadges = () => {
    const putBack = keep(inventoryStore);

    inventoryStore.getState().initBadges(sampleBadges());

    return putBack;
};

/** The furni of the hotel's furni data the user owns: its first floor items, one each (`FurniList`). */
const sampleFurni = (): Map<number, IFurniListAddOrUpdateFurni> => {
    const types = Object.values(systemStore.getState().floorItems).slice(0, SAMPLE_FURNI_COUNT);

    return new Map(types.map((type, index) => [ index + 1, {
        itemId: index + 1,
        itemType: 'S',
        roomItemId: index + 1,
        itemTypeId: type.id,
        category: 1,
        stuffData: new LegacyDataType(),
        isGroupable: true,
        isRecyclable: false,
        isTradeable: true,
        isSellable: true,
        secondsToExpiration: -1,
        extra: 0,
        flatId: -1,
        isWallItem: false,
        hasRentPeriodStarted: false,
        expirationTimeStamp: 0,
    } ]));
};

/** The user owns badges and furni: what the inventory's tabs show (`onBadges`, `onFurniList` fill it in the game). */
export const fillSampleInventory = () => {
    const putBack = keep(inventoryStore);
    const { initBadges, insertFurniture } = inventoryStore.getState();

    initBadges(sampleBadges());
    insertFurniture(sampleFurni());

    return putBack;
};

/** The user's friends and friend requests, as `MessengerInit` and `FriendRequests` would fill them. */
export const fillSampleFriends = () => {
    const putBack = keep(userStore);
    const { processFriends, replaceFriendRequests } = userStore.getState();

    processFriends(SAMPLE_FRIENDS);
    replaceFriendRequests(SAMPLE_FRIEND_REQUESTS);

    return putBack;
};

/** The messenger's conversations as `NewConsoleMessage` would fill them; the own lines are signed with `name`. */
export const fillSampleMessenger = (name: string, messenger: Partial<MessengerState>) => {
    const putBack = keep(messengerStore);
    const ownName = userStore.getState().name;

    userStore.setState({ name });
    messengerStore.setState(messenger);

    return () => {
        putBack();
        userStore.setState({ name: ownName });
    };
};

/**
 * The stores as the packets would fill them in a room: the user's friends and `user` over their own
 * (with `uiFlags` added to theirs), the room `room` gives, and the hotel view gone. The system store is
 * put back only where this changed it: a draft applied meanwhile changes its config.
 */
export const fillSampleRoom = ({ user, uiFlags, room }: { user: Partial<UserState>; uiFlags: number; room: Partial<RoomState> }) => {
    const putBackUser = keep(userStore);
    const putBackRoom = keep(roomStore);
    const own = userStore.getState();
    const { landingViewVisible } = systemStore.getState();

    own.processFriends(SAMPLE_FRIENDS);
    userStore.setState({ ...user, uiFlags: own.uiFlags | uiFlags });
    systemStore.setState({ landingViewVisible: false });
    roomStore.setState(room);

    return () => {
        putBackRoom();
        systemStore.setState({ landingViewVisible, toolbarMenu: undefined });
        putBackUser();
    };
};
