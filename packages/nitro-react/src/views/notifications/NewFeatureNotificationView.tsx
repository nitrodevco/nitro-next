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
 * `SingularNotificationController.initComponent` looks for them 2 seconds after it starts
 * (`maybeShowNewFeatureNotification`).
 */
import { ColorConverter } from '@nitrodevco/nitro-api';
import { GetSecondsUntilComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { getHotelProperty, maybeShowNewFeatureNotifications, openNewFeatureLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useSingularNotificationActions, useSingularNotificationStore } from '#base/context/singular-notifications';
import { HotelViewSecondsUntil, useConfigData, useSystemStore, useTranslation } from '#base/context/system';
import { useSecondsClock } from '#base/hooks';
import { Box, CountdownWidget, TemplateBindings, TemplateWindow } from '#base/theme';

/** `SingularNotificationController.initComponent`: `setTimeout(maybeShowNewFeatureNotification, 2000)`. */
const SHOW_DELAY_MS = 2000;

/** `BG_COLOR_NORMAL`. */
const BG_COLOR_NORMAL = '#686661';

/** `extension_grid`'s spacing above an extension. */
const EXTENSION_SPACING = 2;

/** `ColorConverter.hexToUint`: `#rrggbb` (or without the `#`) as a number. */
const hexToUint = (hex: string) => (parseInt(hex.replace('#', ''), 16) || 0);

const TYPE_NORMAL = 'normal';
const TYPE_COUNTDOWN = 'countdown';

/** `LINK_COLOR_NORMAL` / `LINK_COLOR_HIGHLIGHT`: `cancel_link` or `desc` without and with the pointer over. */
const LINK_COLOR_NORMAL = 16777215;
const LINK_COLOR_HIGHLIGHT = 12247545;

/** A `SecondsUntilMessage` for the time string, if one came after it was asked. */
const answerSince = (answer: HotelViewSecondsUntil | undefined, askedAt: number) => (((answer !== undefined) && (answer.receivedAt >= askedAt)) ? answer : undefined);

export const NewFeatureNotificationsView = () => {
    const keys = useSingularNotificationStore(x => x.newFeatureNotifications);
    // The configured texts and colours, read when they come in.
    useConfigData();

    useEffect(() => {
        const timer = setTimeout(maybeShowNewFeatureNotifications, SHOW_DELAY_MS);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {keys.map(key => (
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
    const { markNewFeatureNotificationOpened, closeNewFeatureNotification } = useSingularNotificationActions();
    const type = getHotelProperty(`notifications.new_feature.type.${featureKey}`) || TYPE_NORMAL;
    const expiry = getHotelProperty(`notifications.new_feature.expiry.${featureKey}`);
    const countdownTo = (type === TYPE_COUNTDOWN) ? getHotelProperty(`notifications.new_feature.count_down_to.${featureKey}`) : '';
    // When the times were asked (`Infinity` until then): only an answer after it counts.
    const [ askedAt, setAskedAt ] = useState(Number.POSITIVE_INFINITY);
    const expiryAnswer = answerSince(useSystemStore(x => (expiry ? x.hotelViewSecondsUntil[expiry] : undefined)), askedAt);
    const countdownAnswer = answerSince(useSystemStore(x => (countdownTo ? x.hotelViewSecondsUntil[countdownTo] : undefined)), askedAt);
    const now = useSecondsClock();
    const [ hovered, setHovered ] = useState(false);

    useEffect(() => {
        if (!expiry && !countdownTo) return;

        setAskedAt(performance.now());

        if (expiry) send(new GetSecondsUntilComposer({ timeStr: expiry }));
        if (countdownTo) send(new GetSecondsUntilComposer({ timeStr: countdownTo }));
    }, [ expiry, countdownTo, send ]);

    const expired = !!expiryAnswer && (expiryAnswer.seconds <= 0);

    // `onTime`: an expiry already past disposes it before it is ever built.
    useEffect(() => {
        if (expired) closeNewFeatureNotification(featureKey);
    }, [ expired, featureKey, closeNewFeatureNotification ]);

    // `tryInitialize`: built once every time asked about is answered.
    if ((expiry && !expiryAnswer) || expired || (countdownTo && !countdownAnswer)) return null;

    const color = hexToUint(getHotelProperty(`notifications.new_feature.color.${featureKey}`) || BG_COLOR_NORMAL);
    // `initLayout`: the open button's lightness halfway from the colour's to the top.
    const hsl = ColorConverter.rgbToHSL(color);
    const buttonColor = ColorConverter.hslToRGB((255 - Math.trunc((255 - (hsl & 0xff)) / 2)) | (hsl & 0xffff00));
    const open = () => {
        openNewFeatureLink(send, featureKey);
        markNewFeatureNotificationOpened(featureKey);
    };
    const cancel = () => closeNewFeatureNotification(featureKey);
    const hover = { onPointerOver: () => setHovered(true), onPointerOut: () => setHovered(false) };
    const linkColor = hovered ? LINK_COLOR_HIGHLIGHT : LINK_COLOR_NORMAL;

    const bindings: TemplateBindings = {
        desc: { caption: t(`notifications.new_feature.${featureKey}.desc`, `notifications.new_feature.${featureKey}.desc`), setCaptionAfterBuild: true },
        static_bitmap: { asset: getHotelProperty(`notifications.new_feature.image.${featureKey}`) },
        cancel_link_region: { visible: (type === TYPE_NORMAL) || (type === TYPE_COUNTDOWN) || opened, onPointerTap: cancel },
    };

    if (type === TYPE_NORMAL) {
        bindings[''] = { color };
        bindings.open_button = { color: buttonColor, onPointerTap: open };
        bindings.cancel_link = { color: linkColor, onPointerTap: cancel };
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
