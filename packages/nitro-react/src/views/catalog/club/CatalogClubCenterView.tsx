/**
 * The HC centre - Flash's `ClubCenterView` (with `HabboClubCenter` around it), the centred
 * `club_center_xml` window.
 *
 * Built: without `hccenter.activity.enabled` the payday block, its post-it and the breakdown link
 * are removed; with it the post-it's amount, its icon, the breakdown link and the payday time wait
 * hidden for the data. `btn_earn` shows while the offer centre has a video offer
 * (`indicateVideoAvailable` -> `setVideoOfferButtonVisibility`), disabled while that video is
 * playing (`showingVideo`); a click plays it (`onInput`'s `btn_earn` -> `offerCenter.showVideo`).
 * Without the provider scripts on the page no offer arrives and it stays hidden, as in Flash. The
 * button's colour alpha (0 enabled, 51 disabled) is not mirrored. The avatar is the full
 * figure facing 4, cropped to its own bounds (`getCroppedImage`), in the `avatar` room previewer
 * at twice its size from its corner (`RoomPreviewerWidget.showPreview` scales the bitmap by 2 and
 * nothing offsets it) - reaching past the widget's 90x130, as Flash's display object does.
 *
 * `dataReceived` decides what they say. The status title is `hccenter.status.<resolveClubStatus>`;
 * until the data is in nothing else is filled, and the gift block keeps its place, as the constructor
 * centres the window at that size (only a `dataReceived` without data hides it, and `populate`
 * runs on data). Then the status
 * info fills `%timeleft%` (the purse's minutes until expiration), `%joindate%` and
 * `%streakduration%` (`FriendlyTime.getShortFriendlyTime`), the badge is the club badge
 * `BadgeResolver` found, the payday time is `hccenter.special.time.soon` under an hour, and the
 * post-it's amount and breakdown link show only when the month's and the streak's rewards add up
 * to more than 0. An active member with gifts waiting gets "redeem" and `hccenter.unclaimedgifts`,
 * everyone else "view" and `hccenter.gift.info`; "buy" says "extend" while active.
 *
 * The breakdown link opens `ClubSpecialInfoBubbleView` beside the post-it (`CatalogClubCenterBreakdownView`).
 * The buy and gift buttons open the catalogue at `hc_membership` and `club_gifts`, the info links the
 * `habbopages/hcpayday` and `habbopages/habboclub` links - which `openClientLink` only logs, as the
 * port has no habbo pages window (`HabboHelp`) to answer them. `special_amount_icon`'s `asset_uri`
 * is `hc_center_icon_credits`, the embedded file of the published `hc_center_hc_center_icon_credits`,
 * which is the bitmap drawn.
 */
import { FederatedPointerEvent } from 'pixi.js';
import { useEffect, useState } from 'react';

import { isClubKickbackEnabled, openClubCatalogPage, openClubHelpPage, removeClubCenter, showClubCenter, showOfferVideo } from '#base/commands';
import { useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { getOfferCenterShowingVideo, useOfferCenterStore } from '#base/context/offer-center';
import { useBadgeImageUrl, useConfigData, useTranslation } from '#base/context/system';
import { useOwnClubSubscription, useOwnUserFigure, useOwnUserGender } from '#base/context/user';
import { GetDesktopSize, getGlobalRect, TemplateWindow, useAvatarImageTexture } from '#base/theme';
import { CLUB_STATUS_ACTIVE, GetFriendlyTime, replaceFirst, resolveClubStatus } from '#base/utils';

import { catalogTemplateId } from '../page/catalogTemplates';
import { CatalogClubCenterBreakdownView, ClubCenterBreakdownPlacement } from './CatalogClubCenterBreakdownView';

/** `ClubSpecialInfoBubbleView.MARGIN` and its window's size (`club_center_special_info_xml`). */
const BREAKDOWN_MARGIN = 8;
const BREAKDOWN_WIDTH = 374;
const BREAKDOWN_HEIGHT = 146;
/**
 * `special_content_postit`'s size, and where in it `special_breakdown_link` keeps its right edge
 * and its top (the link sizes to its text from the right): the post-it, `getSpecialCalloutAnchor`,
 * is found from the clicked link.
 */
const POSTIT_WIDTH = 222;
const POSTIT_HEIGHT = 150;
const BREAKDOWN_LINK_RIGHT = 207;
const BREAKDOWN_LINK_TOP = 120;

export const CatalogClubCenterView = () => {
    const kickback = useCatalogStore(x => x.clubKickbackData);
    const giftsAvailable = useCatalogStore(x => x.clubCenterGiftsAvailable);
    const badgeId = useCatalogStore(x => x.clubBadgeId);
    // `HabboClubCenter.indicateVideoAvailable`: what the offer centre last said, and whether its video is up.
    const videoAvailable = useOfferCenterStore(x => x.videoAvailable);
    const showingVideo = useOfferCenterStore(getOfferCenterShowingVideo);
    const subscription = useOwnClubSubscription();
    const figure = useOwnUserFigure();
    const gender = useOwnUserGender();
    const config = useConfigData();
    const badgeUrl = useBadgeImageUrl();
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const [ breakdown, setBreakdown ] = useState<ClubCenterBreakdownPlacement | undefined>(undefined);
    // `createAvatarImage(figure, "h")`, `setDirection("full", 4)`, `getCroppedImage("full")`: the figure cut to its own bounds.
    const avatar = useAvatarImageTexture(figure, gender, { direction: 4, cropped: true });

    useEffect(() => {
        showClubCenter(send, store, performance.now());
    }, [ send, store ]);

    const kickbackEnabled = isClubKickbackEnabled(config);
    const status = resolveClubStatus(subscription);
    const formatMinutes = (minutes: number) => GetFriendlyTime(t, minutes * 60, '.short');
    const formatDays = (days: number) => GetFriendlyTime(t, days * 86400, '.short');
    const isActive = (status === CLUB_STATUS_ACTIVE);

    let statusInfo = '';
    let paydayTime = '';
    let paydaySum = 0;

    if (kickback) {
        statusInfo = t(`hccenter.status.${status}.info`, `hccenter.status.${status}.info`);
        statusInfo = replaceFirst(statusInfo, '%timeleft%', formatMinutes(subscription.minutesUntilExpiration));
        statusInfo = replaceFirst(statusInfo, '%joindate%', kickback.firstSubscriptionDate);
        statusInfo = replaceFirst(statusInfo, '%streakduration%', formatDays(kickback.currentHcStreak));
        paydayTime = (kickback.timeUntilPayday < 60) ? t('hccenter.special.time.soon', 'hccenter.special.time.soon') : formatMinutes(kickback.timeUntilPayday);
        paydaySum = kickback.creditRewardForMonthlySpent + kickback.creditRewardForStreakBonus;
    }

    const showAmount = !!kickback && kickbackEnabled && (paydaySum > 0);
    const giftsWaiting = isActive && (giftsAvailable > 0);
    const giftInfo = giftsWaiting ? replaceFirst(t('hccenter.unclaimedgifts', 'hccenter.unclaimedgifts'), '%unclaimedgifts%', giftsAvailable) : t('hccenter.gift.info', 'hccenter.gift.info');

    /** `showPaydayBreakdownView`: away with it when it is up, otherwise `positionWindow` beside the post-it. */
    const toggleBreakdown = (event: FederatedPointerEvent) => {
        if (breakdown) {
            setBreakdown(undefined);

            return;
        }

        if (!kickback) return;

        const link = getGlobalRect(event.currentTarget);
        const postit = { x: link.x + link.width - BREAKDOWN_LINK_RIGHT, y: link.y - BREAKDOWN_LINK_TOP, width: POSTIT_WIDTH, height: POSTIT_HEIGHT };
        const pointRight = (GetDesktopSize().width < (postit.x + postit.width + BREAKDOWN_WIDTH + BREAKDOWN_MARGIN)) && (postit.x > (BREAKDOWN_WIDTH + BREAKDOWN_MARGIN));

        setBreakdown({
            x: pointRight ? (postit.x - (BREAKDOWN_WIDTH + BREAKDOWN_MARGIN)) : (postit.x + postit.width + BREAKDOWN_MARGIN),
            y: postit.y + (postit.height * 0.5) - (BREAKDOWN_HEIGHT * 0.5),
            pointer: pointRight ? 'right' : 'left',
        });
    };

    return (
        <>
            <TemplateWindow
                id={catalogTemplateId('club_center_xml')}
                frame={{ id: 'hc_center', centered: true, rememberPosition: false, onClose: () => removeClubCenter(store) }}
                bindings={{
                    // The constructor: what `hccenter.activity.enabled` removes, or hides until the data is in.
                    special_content: { visible: kickbackEnabled },
                    special_content_postit: { visible: kickbackEnabled },
                    special_breakdown_link: { visible: showAmount, onPointerTap: toggleBreakdown },
                    special_amount_icon: { visible: showAmount, asset: 'habbo-window-manager-com-hc_center_hc_center_icon_credits' },
                    special_amount_title: { visible: showAmount },
                    special_amount_content: { visible: showAmount, caption: showAmount ? replaceFirst(t('hccenter.special.sum', 'hccenter.special.sum'), '%credits%', paydaySum) : '' },
                    special_time_content: { visible: !!kickback && kickbackEnabled, caption: paydayTime },
                    // `ClubCenterView.setVideoOfferButtonVisibility`; `onInput`'s `btn_earn` -> `IOfferCenter.showVideo`.
                    btn_earn: { visible: videoAvailable, disabled: showingVideo, onPointerTap: showOfferVideo },
                    avatar: {
                        children: avatar.texture && (
                            <pixiSprite
                                texture={avatar.texture}
                                scale={2}
                                eventMode="none"
                            />
                        ),
                    },

                    // `dataReceived`.
                    status_title: { caption: `\${hccenter.status.${status}}` },
                    status_info: { caption: statusInfo },
                    hc_badge: { asset: (kickback && badgeId) ? badgeUrl(badgeId) : '' },
                    btn_gift: { caption: giftsWaiting ? '${hccenter.btn.gifts.redeem}' : '${hccenter.btn.gifts.view}', onPointerTap: () => openClubCatalogPage('club_gifts') },
                    gift_info: { caption: giftInfo },
                    btn_buy: { caption: isActive ? '${hccenter.btn.extend}' : '${hccenter.btn.buy}', onPointerTap: () => openClubCatalogPage('hc_membership') },

                    // `onInput`.
                    special_infolink: { onPointerTap: () => openClubHelpPage(send, 'hcpayday') },
                    general_infolink: { onPointerTap: () => openClubHelpPage(send, 'habboclub') },
                }}
            />
            {breakdown && kickback && (
                <CatalogClubCenterBreakdownView
                    kickback={kickback}
                    placement={breakdown}
                    onPaydayHelp={() => openClubHelpPage(send, 'hcpayday')}
                    onClose={() => setBreakdown(undefined)}
                />
            )}
        </>
    );
};
