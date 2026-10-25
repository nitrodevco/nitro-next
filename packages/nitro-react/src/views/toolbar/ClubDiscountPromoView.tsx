import { useEffect, useState } from 'react';

import { requestClubExtendOfferFromPromo } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useQuestsStore } from '#base/context/quests';
import { useConfigBoolean } from '#base/context/system';
import { getPurseClubType, useOwnClubSubscription } from '#base/context/user';
import { Box, TemplateWindow, TemplateWindows } from '#base/theme';

/** `ClubDiscountPromoExtension.onTextRegionMouseOver` / `onTextRegionMouseOut`: `promo_text`'s colours. */
const TEXT_COLOR_HIGHLIGHT = 0xbae1f9;
const TEXT_COLOR_NORMAL = 0xffffff;

/** `ClubDiscountPromoExtension.assignState`: the style `club_icon` gets. */
const ICON_STYLE_CLUB = '14';

/** `createWindow`: the glint `flashing_animation` draws, `extend_hilite_png`. */
const GLINT_ASSET = 'habbo-toolbar-com-extend_hilite';
/** `extend_hilite_png`'s size, which `resetAnimationVariables` and `onAnimationTimer` read off the bitmap. */
const GLINT_WIDTH = 46;
const GLINT_HEIGHT = 28;
/** `club_discount_promotion_xml`'s size: the bar's, which nothing resizes. */
const BAR_WIDTH = 192;
const BAR_HEIGHT = 44;
/** `_animBlockMoveAmount`. */
const GLINT_MOVE_AMOUNT = BAR_WIDTH - 7 - GLINT_WIDTH;
/** `animate`: the timer that starts the glint, every 15 s. */
const GLINT_TRIGGER_DELAY = 15000;
/** `startAnimationTimer`: `Timer(25, 26)`. */
const GLINT_STEP_DELAY = 25;
const GLINT_STEPS = 26;

/**
 * Flash's `toolbar/extensions/ClubDiscountPromoExtension` over `habbo-toolbar-com/club_discount_promotion_xml`:
 * the bar `HabboToolbar.initVipExtendExtension` creates while `club.membership.extend.vip.promotion.enabled`,
 * docked as `club_promo` at priority 10 - under the purse, above the targeted offer (13) - while the
 * membership is expiring and VIP (`onClubChanged`: `clubIsExpiring` and `isExtensionEnabled`, club level 2).
 * With under a day left it goes when the membership does (`onExtendOfferExpire`). The VIP quests promo
 * detaches it while that is docked (`CitizenshipVipQuestsPromoExtension.onCitizenshipQuestPromoEnabled`).
 *
 * `promo_text` and its shadow read `discount.bar.vip.expiring`; a click on `text_region` asks for the
 * extension offer (`onTextRegionClicked`), whose dialog `showClubExtendOffer` puts up. The text turns
 * `0xbae1f9` under the pointer.
 *
 * The glint (`animate`, `onTriggerTimer`, `onAnimationTimer`): 15 s after the bar is built,
 * `flashing_animation` shows `extend_hilite_png` at 3,3, as tall as the bar less 6, and slides it
 * right over 26 steps 25 ms apart - `x = 3 + step / 20 * (width - 7 - 46)`; once it passes that
 * distance the window narrows to what is left of the bar and draws the bitmap's left part
 * (`copyPixels`) - then `clearAnimation` hides it. `clearAnimation` also drops the window
 * reference, so the 15 s timer's later ticks find nothing to show: the glint plays once per bar.
 */
/** `onAnimationTimer`: where `flashing_animation` is at a step, and the part of the bitmap it draws. */
const glintAt = (step: number) => {
    // `IWindow.x` is an int.
    const x = Math.trunc(3 + ((step / 20) * GLINT_MOVE_AMOUNT));
    const width = (x > GLINT_MOVE_AMOUNT) ? (BAR_WIDTH - 4 - x) : GLINT_WIDTH;

    return { x, width, frame: { x: 0, y: 0, width, height: GLINT_HEIGHT } };
};

export const ClubDiscountPromoView = () => {
    const enabled = useConfigBoolean('club.membership.extend.vip.promotion.enabled');
    const vipQuestsPromoAttached = useQuestsStore(x => x.vipQuestsPromoAttached);
    const subscription = useOwnClubSubscription();
    const minutesLeft = subscription.minutesUntilExpiration;
    // The countdown the bar was taken down for; a new subscription status brings it back.
    const [ expiredAt, setExpiredAt ] = useState<number | null>(null);

    // `onClubChanged`: a membership with under a day left takes the bar down when it runs out.
    useEffect(() => {
        if ((minutesLeft <= 0) || (minutesLeft >= 1440)) return;

        const timeout = setTimeout(() => setExpiredAt(minutesLeft), minutesLeft * 60 * 1000);

        return () => clearTimeout(timeout);
    }, [ minutesLeft ]);

    if (!enabled || vipQuestsPromoAttached || (expiredAt === minutesLeft) || !subscription.isExpiring || (getPurseClubType(subscription) !== 2)) return null;

    return <ClubDiscountPromoContent />;
};

const ClubDiscountPromoContent = () => {
    const { send } = useWebSocketContext();
    const [ hover, setHover ] = useState(false);
    // `§_-n1X§` of the step drawn; null while `flashing_animation` is hidden.
    const [ glintStep, setGlintStep ] = useState<number | null>(null);

    useEffect(() => {
        let stepTimer: ReturnType<typeof setInterval> | undefined = undefined;

        // `onTriggerTimer` -> `resetAnimationVariables` (step 0) and `startAnimationTimer`. Each tick
        // places the window for the step it counts, then counts on; the last tick's step is cleared
        // at once by `onAnimationTimerComplete`, so it is never drawn.
        const trigger = setTimeout(() => {
            let ticks = 0;

            setGlintStep(0);

            stepTimer = setInterval(() => {
                ticks++;

                if (ticks < GLINT_STEPS) {
                    setGlintStep(ticks - 1);

                    return;
                }

                clearInterval(stepTimer);
                setGlintStep(null);
            }, GLINT_STEP_DELAY);
        }, GLINT_TRIGGER_DELAY);

        return () => {
            clearTimeout(trigger);
            clearInterval(stepTimer);
        };
    }, []);

    const glint = (glintStep !== null) ? glintAt(glintStep) : null;

    const arrange = ({ find }: TemplateWindows) => {
        if (glint) find('flashing_animation')?.setRectangle(glint.x, 3, glint.width, BAR_HEIGHT - 6);
    };

    return (
        <Box layout={{ marginTop: 2, flexShrink: 0 }}>
            <TemplateWindow
                id="habbo-toolbar-com/club_discount_promotion_xml"
                arrange={arrange}
                bindings={{
                    flashing_animation: { visible: !!glint, asset: GLINT_ASSET, frame: glint?.frame },
                    club_icon: { style: ICON_STYLE_CLUB },
                    promo_text: { caption: '${discount.bar.vip.expiring}', color: hover ? TEXT_COLOR_HIGHLIGHT : TEXT_COLOR_NORMAL },
                    promo_text_shadow: { caption: '${discount.bar.vip.expiring}' },
                    text_region: {
                        onPointerTap: () => requestClubExtendOfferFromPromo(send),
                        onPointerOver: () => setHover(true),
                        onPointerOut: () => setHover(false),
                    },
                }}
            />
        </Box>
    );
};
