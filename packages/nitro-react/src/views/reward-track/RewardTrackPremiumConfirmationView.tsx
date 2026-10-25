/**
 * `RewardTrackPremiumPurchaseConfirmationView` over
 * `habbo-quest-engine-com/reward_track_premium_purchase_confirmation_xml` (built in window context
 * 1, centred when shown). `initializeUI`: the benefits the track has - the points boost as a
 * percentage over 1, its premium prizes, its instant points, its premium tasks and levels - and its
 * price in credits and diamonds, the `+` only with both.
 *
 * Unlock buys premium (`purchasePremium`) and holds every button until the answer; a failure lets
 * them be pressed again half a second later (`purchaseFailed`), a success closes the window.
 */
import { useEffect, useState } from 'react';

import { closeRewardTrackPremiumConfirmation, purchaseRewardTrackPremium } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { RewardTrack, useRewardTrackStore } from '#base/context/reward-track';
import { useTranslation } from '#base/context/system';
import { TemplateWindow, useTemplateFrame } from '#base/theme';

const TEMPLATE = 'habbo-quest-engine-com/reward_track_premium_purchase_confirmation_xml';

/** `RETRY_ENABLE_DELAY_MS`. */
const RETRY_ENABLE_DELAY_MS = 500;

export const RewardTrackPremiumConfirmationView = () => {
    const trackId = useRewardTrackStore(x => x.premiumConfirmationTrackId);
    const track = useRewardTrackStore(x => x.tracks.find(entry => entry.id === x.premiumConfirmationTrackId));

    if (!trackId || !track) return null;

    return (
        <RewardTrackPremiumConfirmation
            key={trackId}
            track={track}
        />
    );
};

const RewardTrackPremiumConfirmation = ({ track }: { track: RewardTrack }) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const failures = useRewardTrackStore(x => x.premiumPurchaseFailures);
    const [ pending, setPending ] = useState(false);
    const [ failuresAtPurchase, setFailuresAtPurchase ] = useState(failures);
    const close = () => {
        if (!pending) closeRewardTrackPremiumConfirmation();
    };
    const frame = useTemplateFrame({ id: 'reward_track_premium', centered: true, rememberPosition: false, resizeDirection: 'none', onClose: close });

    // `purchaseFailed`: the buttons come back half a second after a failure.
    useEffect(() => {
        if (!pending || (failures === failuresAtPurchase)) return;

        const timer = setTimeout(() => setPending(false), RETRY_ENABLE_DELAY_MS);

        return () => clearTimeout(timer);
    }, [ pending, failures, failuresAtPurchase ]);

    const hasPremiumPrizes = track.prizes.some(prize => prize.premium);
    const hasPremiumTasks = track.tasks.some(task => task.premium);
    const hasPremiumLevels = track.tasks.some(task => task.levels.some(level => level.premium));

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={{
                header_button_close: { disabled: pending },
                benefit_boost_txt: { caption: t('reward_track.premium.confirm.benefit.boost', '', { percent: String(Math.round((track.taskPointsBoost - 1) * 100)) }) },
                benefit_instant_points_txt: { caption: t('reward_track.premium.confirm.benefit.instant_points', '', { points: String(track.instantPoints) }) },
                benefit_boost_row: { visible: track.taskPointsBoost > 1 },
                benefit_rewards_row: { visible: hasPremiumPrizes },
                benefit_instant_points_row: { visible: track.instantPoints > 0 },
                benefit_tasks_row: { visible: hasPremiumTasks },
                benefit_levels_row: { visible: hasPremiumLevels },
                price_credits: { caption: String(track.costCredits), visible: track.costCredits > 0, setCaptionAfterBuild: true },
                credits_icon: { visible: track.costCredits > 0 },
                price_diamonds: { caption: String(track.costDiamonds), visible: track.costDiamonds > 0, setCaptionAfterBuild: true },
                diamonds_icon: { visible: track.costDiamonds > 0 },
                plus_txt: { visible: (track.costCredits > 0) && (track.costDiamonds > 0) },
                cancel_button: { disabled: pending, onPointerTap: close },
                confirm_button: {
                    disabled: pending,
                    onPointerTap: () => {
                        setFailuresAtPurchase(failures);
                        setPending(true);
                        purchaseRewardTrackPremium(send, track.id);
                    },
                },
            }}
        />
    );
};
