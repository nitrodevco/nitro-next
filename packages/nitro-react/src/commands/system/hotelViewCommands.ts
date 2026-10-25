/**
 * What the reception's widgets do when clicked, where that is more than opening a window -
 * `PromoArticleWidget.followLink`, and the `HabboLandingView` calls the generic widget's elements
 * make (`goToRoom`, `requestBadge`, the competition room messages) - and the catalogue's
 * `CATALOG_INVISIBLE_PAGE_VISITED`, which the reception answers.
 */
import { CommunityGoalVoteComposer, ForwardToARandomPromotedRoomComposer, ForwardToASubmittableRoomComposer, ForwardToRandomCompetitionRoomComposer, IsUserPartOfCompetitionMessageType, PromoArticleData, RequestABadgeComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { hotelViewProperty, PROMO_ARTICLE_LINK_CLIENT, PROMO_ARTICLE_LINK_WEB, systemStore } from '#base/context/system';
import { openHabboMainPage } from '#base/utils';

import { goToPrivateRoom } from '../navigator/navigatorCommands';
import { openClientLink } from './clientLinkCommands';

/**
 * `PromoArticleWidget.followLink`: a web link opens its page (`HabboWebTools.openWebPage`, in the
 * hotel's `habboMain` window), a client link goes through `createLinkEvent`.
 */
export const followPromoArticleLink = (send: Send, article: PromoArticleData) => {
    switch (article.linkType) {
        case PROMO_ARTICLE_LINK_WEB:
            openHabboMainPage(article.linkContent);

            return;
        case PROMO_ARTICLE_LINK_CLIENT:
            openClientLink(send, article.linkContent);
    }
};

/** `landing.view.roomcategory`: the promoted rooms' category when a `promotedroombutton` names none. */
const ROOM_CATEGORY_KEY = 'landing.view.roomcategory';

/**
 * `HabboLandingView.goToRoom(category)`: a random promoted room of the category - or, with none,
 * of `landing.view.roomcategory`. With neither (the variable unset: `getProperty` is null) nothing
 * is sent.
 */
export const goToPromotedRoom = (send: Send, category: string | undefined) => {
    const { config } = systemStore.getState();
    const resolved = category ?? ((ROOM_CATEGORY_KEY in config) ? hotelViewProperty(config, ROOM_CATEGORY_KEY) : undefined);

    if (resolved !== undefined) send(new ForwardToARandomPromotedRoomComposer({ category: resolved }));
};

/** `HabboLandingView.requestBadge`: asks for the badge a request code gives. */
export const requestHotelViewBadge = (send: Send, requestCode: string) => send(new RequestABadgeComposer({ requestCode }));

/**
 * The `gotocompetitionroombutton` element's click: a random room entered in the goal's competition.
 * Flash first calls `HabboQuestEngine.reenableRoomCompetitionWindow`, which clears the
 * `RoomCompetitionController`'s "don't show again" - the port has no room competition window, so
 * there is nothing to clear.
 */
export const goToCompetitionRoom = (send: Send, goalCode: string) => send(new ForwardToRandomCompetitionRoomComposer({ goalCode }));

/**
 * The `submitcompetitionroom` element's click: the user's own entered room when the last
 * `IsUserPartOfCompetitionMessage` says there is one (`HabboNavigator.goToPrivateRoom`), else a
 * room the server lets them submit (`ForwardToASubmittableRoomMessageComposer`). Flash's
 * `reenableRoomCompetitionWindow` has nothing to clear here, as for `goToCompetitionRoom`.
 */
export const submitCompetitionRoom = (send: Send, entry: IsUserPartOfCompetitionMessageType | undefined) => {
    if (entry?.isPartOf) goToPrivateRoom(send, entry.targetId);
    else send(new ForwardToASubmittableRoomComposer({}));
};

/**
 * `CatalogNavigator.openPage` dispatching `CATALOG_INVISIBLE_PAGE_VISITED` for a page that exists
 * but is hidden: `HabboLandingView.onExpiredLinkClick` activates a visible reception again, so the
 * expiring page widget can ask which page expires first now (`registerHotelViewHandlers`).
 */
export const catalogInvisiblePageVisited = () => systemStore.getState().reactivateHotelView();

/** `HabboLandingView.communityGoalVote`: the option voted for, 1 or 2. */
export const voteCommunityGoal = (send: Send, vote: number) => send(new CommunityGoalVoteComposer({ vote }));
