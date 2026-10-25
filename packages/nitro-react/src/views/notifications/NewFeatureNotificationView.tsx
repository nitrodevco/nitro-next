/**
 * Flash's `notifications/singular/NewFeatureNotification`: a promotion docked at the end of the
 * toolbar's extension column as `new_feature_<key>`, 2 under whatever is above it. Its type
 * (`notifications.new_feature.type.<key>`) picks the layout of `habbo-notifications-com`:
 * `normal` (the default) `new_feature_notification_xml`, otherwise `new_feature_notification_<type>_xml`
 * (`promo`, `countdown`).
 *
 * `initLayout`: the `desc` text `notifications.new_feature.<key>.desc`, the `static_bitmap` the
 * asset `notifications.new_feature.image.<key>`, and the `border` (else the window) in
 * `notifications.new_feature.color.<key>` (`#686661` when none), with a normal notification's
 * `open_button` in that colour lightened halfway to white (its HSL lightness).
 *
 * `eventHandler`: the open button - or a promo's or countdown's whole region - opens the configured
 * link and shows the cancel link (a countdown shows it from the start); the cancel link takes the
 * notification down. The pointer over the cancel link (a normal one) or the whole notification
 * lights `cancel_link` / `desc` (`onMouseOver` / `onMouseOut`).
 *
 * The constructor asks the server (`GetSecondsUntilMessageComposer`) how long until the key's
 * expiry (`notifications.new_feature.expiry.<key>`) and, for a `countdown`, until its
 * `notifications.new_feature.count_down_to.<key>`, and builds nothing until both are answered
 * (`onTime` / `tryInitialize`): an expiry already past takes it down unseen, and the countdown's
 * `countdown_widget` runs from the seconds answered.
 *
 * `initializeAutoOpen` (build WIN63-202610151745): a key whose
 * `notifications.new_feature.auto_open_condition.<key>` is `not_claimed:<claimId>` asks the server
 * whether that claim was taken (`HasClaimedProduct`) once it is built. Not taken, it opens its link
 * by itself after 5 seconds on the hotel view - the wait starting over whenever the view is left
 * and come back to; taken, or claimed meanwhile (`ClaimProductResult` 0 or 1), or opened by hand,
 * it never does (`stopAutoOpen`).
 *
 * `SingularNotificationController.initComponent` looks for them 2 seconds after it starts
 * (`maybeShowNewFeatureNotification`). The column holds them in the order `init` docked them
 * (`ExtensionView.attachExtension` pushes each at the end): one that waits for its times docks
 * after the ones that wait for nothing, whatever `notifications.new_feature.active` says.
 *
 * Not Flash's, each one absent keeping Flash's behaviour (the hotel panel's extensions):
 * - `notifications.new_feature.show_from.<key>` (the server's time, as an expiry's): built only once
 *   the server answers it reached, docking then if it is reached while the client runs;
 * - `notifications.new_feature.close.<key>`: `forever` remembers the cancel link's click for the
 *   user in this browser, so it is not shown again; `never` hides the cancel link;
 * - `notifications.new_feature.audience.<key>`: `hc` only with Habbo Club, `non_hc` only without,
 *   `new` only while the server calls the user a noob (`NoobnessLevel`);
 * - the texts `notifications.new_feature.<key>.open_button` / `.cancel_link`: a normal one's button
 *   and cancel link, over the layout's `notifications.button.view` / `notifications.button.cancel`.
 */
import { ClubLevelEnum, ColorConverter, NoobnessLevelEnum } from '@nitrodevco/nitro-api';
import { useEffect, useMemo, useState } from 'react';

import { isNewFeatureClosedForever, maybeShowNewFeatureNotifications, openNewFeatureLink, rememberNewFeatureClosedForever, requestNewFeatureClaimState, requestNewFeatureSecondsUntil } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useSingularNotificationActions, useSingularNotificationStore } from '#base/context/singular-notifications';
import { HotelViewSecondsUntil, useConfigData, useIsLandingViewVisible, useSystemStore, useTranslation } from '#base/context/system';
import { useOwnClubLevel, useOwnUserId, useUserStore } from '#base/context/user';
import { useSecondsClock } from '#base/hooks';
import { Box, CountdownWidget, TemplateBindings, TemplateWindow } from '#base/theme';
import { configReader } from '#base/utils';

/** `SingularNotificationController.initComponent`: `setTimeout(maybeShowNewFeatureNotification, 2000)`. */
const SHOW_DELAY_MS = 2000;

/** `BG_COLOR_NORMAL`. */
const BG_COLOR_NORMAL = '#686661';

/** `extension_grid`'s spacing above an extension. */
const EXTENSION_SPACING = 2;

/** `ColorConverter.hexToUint`: `#rrggbb` (or without the `#`) as a number. */
const hexToUint = (hex: string) => (parseInt(hex.replace('#', ''), 16) || 0);

/** `AUTO_OPEN_CONDITION_NOT_CLAIMED` / `AUTO_OPEN_DELAY_MS`. */
const AUTO_OPEN_CONDITION_NOT_CLAIMED = 'not_claimed';
const AUTO_OPEN_DELAY_MS = 5000;

/** `initializeAutoOpen`'s parse: the claim id of a `not_claimed:<claimId>` condition, else none. */
const autoOpenClaimId = (condition: string) => {
    const parts = condition.split(':');

    return ((parts.length === 2) && (parts[0] === AUTO_OPEN_CONDITION_NOT_CLAIMED) && parts[1].length) ? parts[1] : '';
};

/**
 * `static_bitmap.assetUri`: the window context's `ResourceManager.retrieveAsset` takes the window
 * manager's own asset of that name (`reward_track_small_icon`), else loads the name as a url
 * (`${image.library.url}album1584/...png`, `https://...`).
 */
const imageAsset = (image: string) => ((!image || image.includes('/') || image.includes('$')) ? image : `habbo-window-manager-com-${image}`);

const TYPE_NORMAL = 'normal';
const TYPE_COUNTDOWN = 'countdown';

/** `LINK_COLOR_NORMAL` / `LINK_COLOR_HIGHLIGHT`: `cancel_link` or `desc` without and with the pointer over. */
const LINK_COLOR_NORMAL = 16777215;
const LINK_COLOR_HIGHLIGHT = 12247545;

/** Not Flash's: `notifications.new_feature.close.<key>`. */
const CLOSE_FOREVER = 'forever';
const CLOSE_NEVER = 'never';

/** Not Flash's: `notifications.new_feature.audience.<key>`. */
const AUDIENCE_HC = 'hc';
const AUDIENCE_NON_HC = 'non_hc';
const AUDIENCE_NEW = 'new';

/** The longest `setTimeout` waits; a later show-from is looked at again when the client next starts. */
const MAX_TIMER_MS = 2147483647;

/** Whether the user is one the audience names; the noob one waits until the server has said (`noobnessLevel` -1). */
const inAudience = (audience: string, clubLevel: ClubLevelEnum, noobnessLevel: number) => {
    switch (audience) {
        case AUDIENCE_HC: return clubLevel >= ClubLevelEnum.Club;
        case AUDIENCE_NON_HC: return clubLevel < ClubLevelEnum.Club;
        case AUDIENCE_NEW: return (noobnessLevel >= 0) && (noobnessLevel !== Number(NoobnessLevelEnum.NotNoob));
        default: return true;
    }
};

/** A `SecondsUntilMessage` for the time string, if one came after it was asked. */
const answerSince = (answer: HotelViewSecondsUntil | undefined, askedAt: number) => (((answer !== undefined) && (answer.receivedAt >= askedAt)) ? answer : undefined);

export const NewFeatureNotificationsView = () => {
    const keys = useSingularNotificationStore(x => x.newFeatureNotifications);
    const attached = useSingularNotificationStore(x => x.newFeatureNotificationsAttached);
    // The docked ones in the order they docked, then the ones still waiting (drawing nothing yet).
    const ordered = [ ...attached.filter(key => keys.includes(key)), ...keys.filter(key => !attached.includes(key)) ];

    useEffect(() => {
        const timer = setTimeout(maybeShowNewFeatureNotifications, SHOW_DELAY_MS);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {ordered.map(key => (
                <NewFeatureNotification
                    key={key}
                    featureKey={key}
                />
            ))}
        </>
    );
};

const NewFeatureNotification = ({ featureKey }: { featureKey: string }) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const opened = useSingularNotificationStore(x => x.newFeatureNotificationsOpened.includes(featureKey));
    const { attachNewFeatureNotification, markNewFeatureNotificationOpened, closeNewFeatureNotification, clearNewFeatureClaim } = useSingularNotificationActions();
    const { configString } = configReader(useConfigData());
    const type = configString(`notifications.new_feature.type.${featureKey}`) || TYPE_NORMAL;
    const expiry = configString(`notifications.new_feature.expiry.${featureKey}`);
    const countdownTo = (type === TYPE_COUNTDOWN) ? configString(`notifications.new_feature.count_down_to.${featureKey}`) : '';
    const showFrom = configString(`notifications.new_feature.show_from.${featureKey}`);
    const close = configString(`notifications.new_feature.close.${featureKey}`);
    const audience = configString(`notifications.new_feature.audience.${featureKey}`);
    const userId = useOwnUserId();
    const clubLevel = useOwnClubLevel();
    const noobnessLevel = useUserStore(x => x.noobnessLevel);
    const closedBefore = useMemo(() => (close === CLOSE_FOREVER) && (userId > 0) && isNewFeatureClosedForever(userId, featureKey), [ close, userId, featureKey ]);
    // When the times were asked (`Infinity` until then): only an answer after it counts.
    const [ askedAt, setAskedAt ] = useState(Number.POSITIVE_INFINITY);
    const expiryAnswer = answerSince(useSystemStore(x => (expiry ? x.hotelViewSecondsUntil[expiry] : undefined)), askedAt);
    const countdownAnswer = answerSince(useSystemStore(x => (countdownTo ? x.hotelViewSecondsUntil[countdownTo] : undefined)), askedAt);
    const showFromAnswer = answerSince(useSystemStore(x => (showFrom ? x.hotelViewSecondsUntil[showFrom] : undefined)), askedAt);
    const [ showFromReached, setShowFromReached ] = useState(false);
    const now = useSecondsClock();
    const [ hovered, setHovered ] = useState(false);
    const autoOpenClaim = autoOpenClaimId(configString(`notifications.new_feature.auto_open_condition.${featureKey}`));
    // Until `stopAutoOpen`.
    const [ autoOpening, setAutoOpening ] = useState(true);
    const autoOpenClaimed = useSingularNotificationStore(x => (autoOpenClaim ? x.newFeatureClaims[autoOpenClaim] : undefined));
    const onHotelView = useIsLandingViewVisible();

    useEffect(() => {
        if (!expiry && !countdownTo && !showFrom) return;

        setAskedAt(performance.now());

        if (expiry) requestNewFeatureSecondsUntil(send, expiry);
        if (countdownTo) requestNewFeatureSecondsUntil(send, countdownTo);
        if (showFrom && (showFrom !== expiry) && (showFrom !== countdownTo)) requestNewFeatureSecondsUntil(send, showFrom);
    }, [ expiry, countdownTo, showFrom, send ]);

    // Not Flash's: the show-from reached now, or once the seconds answered have run.
    useEffect(() => {
        if (!showFromAnswer) return;

        const wait = (showFromAnswer.seconds * 1000) - (performance.now() - showFromAnswer.receivedAt);

        if (wait <= 0) {
            setShowFromReached(true);

            return;
        }

        if (wait > MAX_TIMER_MS) return;

        const timer = setTimeout(() => setShowFromReached(true), wait);

        return () => clearTimeout(timer);
    }, [ showFromAnswer ]);

    const expired = !!expiryAnswer && (expiryAnswer.seconds <= 0);

    // `onTime`: an expiry already past disposes it before it is ever built.
    useEffect(() => {
        if (expired) closeNewFeatureNotification(featureKey);
    }, [ expired, featureKey, closeNewFeatureNotification ]);

    // `tryInitialize`: built once every time asked about is answered.
    const built = !((expiry && !expiryAnswer) || expired || (countdownTo && !countdownAnswer))
        && (!showFrom || showFromReached) && inAudience(audience, clubLevel, noobnessLevel) && !closedBefore;

    // `init`: `attachExtension("new_feature_" + key)`, at the end of the column.
    useEffect(() => {
        if (built) attachNewFeatureNotification(featureKey);
    }, [ built, featureKey, attachNewFeatureNotification ]);

    /** `openConfiguredLink`: the auto-open stopped, the cancel link shown, the link opened. */
    const open = () => {
        setAutoOpening(false);
        openNewFeatureLink(send, featureKey);
        markNewFeatureNotificationOpened(featureKey);
    };

    // `init` -> `initializeAutoOpen`: asked once the notification is built.
    useEffect(() => {
        if (!built || !autoOpenClaim) return;

        clearNewFeatureClaim(autoOpenClaim);
        requestNewFeatureClaimState(send, autoOpenClaim);
    }, [ built, autoOpenClaim, send, clearNewFeatureClaim ]);

    // `onHasClaimedProductResponse` (taken) / `onClaimProductResult` (0 or 1): `stopAutoOpen`.
    useEffect(() => {
        if (autoOpenClaimed === true) setAutoOpening(false);
    }, [ autoOpenClaimed ]);

    // `onToolbarStateChanged` / `onAutoOpenTimerComplete`: the 5 seconds run while not taken and on
    // the hotel view, and start over when it is left.
    const autoOpenArmed = built && autoOpening && !!autoOpenClaim && (autoOpenClaimed === false) && onHotelView;

    useEffect(() => {
        if (!autoOpenArmed) return;

        const timer = setTimeout(() => open(), AUTO_OPEN_DELAY_MS);

        return () => clearTimeout(timer);
    }, [ autoOpenArmed ]);

    if (!built) return null;

    const color = hexToUint(configString(`notifications.new_feature.color.${featureKey}`) || BG_COLOR_NORMAL);
    // `initLayout`: the open button's lightness halfway from the colour's to the top.
    const hsl = ColorConverter.rgbToHSL(color);
    const buttonColor = ColorConverter.hslToRGB((255 - Math.trunc((255 - (hsl & 0xff)) / 2)) | (hsl & 0xffff00));
    const cancel = () => {
        if ((close === CLOSE_FOREVER) && (userId > 0)) rememberNewFeatureClosedForever(userId, featureKey);

        closeNewFeatureNotification(featureKey);
    };
    const hover = { onPointerOver: () => setHovered(true), onPointerOut: () => setHovered(false) };
    const linkColor = hovered ? LINK_COLOR_HIGHLIGHT : LINK_COLOR_NORMAL;

    const bindings: TemplateBindings = {
        desc: { caption: t(`notifications.new_feature.${featureKey}.desc`, `notifications.new_feature.${featureKey}.desc`), setCaptionAfterBuild: true },
        static_bitmap: { asset: imageAsset(configString(`notifications.new_feature.image.${featureKey}`)) },
        cancel_link_region: { visible: (close !== CLOSE_NEVER) && ((type === TYPE_NORMAL) || (type === TYPE_COUNTDOWN) || opened), onPointerTap: cancel },
    };

    if (type === TYPE_NORMAL) {
        const openCaption = t(`notifications.new_feature.${featureKey}.open_button`, '');
        const cancelCaption = t(`notifications.new_feature.${featureKey}.cancel_link`, '');

        bindings[''] = { color };
        bindings.open_button = { color: buttonColor, onPointerTap: open, ...(openCaption ? { caption: openCaption } : {}) };
        bindings.cancel_link = { color: linkColor, onPointerTap: cancel, ...(cancelCaption ? { caption: cancelCaption } : {}) };
        bindings.cancel_link_region = { ...bindings.cancel_link_region, ...hover };
    } else {
        bindings.border = { color };
        bindings.main_region = { onPointerTap: open, ...hover };
        bindings.desc = { ...bindings.desc, color: linkColor };
    }

    // `initLayout`: the countdown runs from the seconds the server answered.
    if (countdownAnswer) {
        const seconds = Math.max(0, Math.max(0, countdownAnswer.seconds) - Math.trunc((now - countdownAnswer.receivedAt) / 1000));

        bindings.countdown_widget = {
            children: (
                <CountdownWidget
                    seconds={seconds}
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
            ),
        };
    }

    return (
        <Box layout={{ position: 'relative', marginTop: EXTENSION_SPACING, flexShrink: 0 }}>
            <TemplateWindow
                id={(type === TYPE_NORMAL) ? 'habbo-notifications-com/new_feature_notification_xml' : `habbo-notifications-com/new_feature_notification_${type}_xml`}
                bindings={bindings}
            />
        </Box>
    );
};
