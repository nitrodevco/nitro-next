import { INewFeatureConfig, NewFeatureTypeEnum, NotificationExtensionEnum, NotificationUtilities } from "@nitrodevco/nitro-api";
import { GetSecondsUntilComposer, SecondsUntilMessage } from "@nitrodevco/nitro-packets";
import { useEffect, useRef } from "react";

import { useConfigValue, useWebSocketContext } from "#base/context";
import { useNotificationExtensionActions } from "#base/context/notification";
import { useMessageListener } from "#base/hooks";

type PendingNewFeature = {
    config: INewFeatureConfig;
    pendingExpiry: boolean;
    pendingCountdown: boolean;
    countdownSeconds: number;
}

export const useNewFeatureHandler = () => {
    const rawFeatures = useConfigValue<Record<string, unknown>[]>('notification.new_feature');
    const { attachExtension } = useNotificationExtensionActions();
    const { send } = useWebSocketContext();

    const pendingRef = useRef<PendingNewFeature[]>([]);

    useEffect(() => {
        if (!Array.isArray(rawFeatures) || !rawFeatures.length) return;

        const timeout = window.setTimeout(() => {
            const pending: PendingNewFeature[] = [];

            for (const raw of rawFeatures) {
                const config = NotificationUtilities.parseNewFeatureConfig(raw);

                if (!config) continue;

                const pendingExpiry = !!config.expiry.length;
                const pendingCountdown = config.type === NewFeatureTypeEnum.Countdown && !!config.countDownTo.length;

                if (!pendingExpiry && !pendingCountdown) {
                    attachExtension({
                        id: NotificationUtilities.getExtensionId(NotificationExtensionEnum.NewFeature, config.name),
                        kind: NotificationExtensionEnum.NewFeature,
                        config,
                        countdownSeconds: 0,
                        linkRevealed: false
                    });

                    continue;
                }

                pending.push({ config, pendingExpiry, pendingCountdown, countdownSeconds: 0 });

                if (pendingExpiry) send(new GetSecondsUntilComposer({ timeStr: config.expiry }));

                if (pendingCountdown) send(new GetSecondsUntilComposer({ timeStr: config.countDownTo }));
            }

            pendingRef.current = pending;
        }, NotificationUtilities.NEW_FEATURE_BOOT_DELAY);

        return () => window.clearTimeout(timeout);
    }, [rawFeatures, attachExtension, send]);

    useMessageListener(SecondsUntilMessage, data => {
        const remaining: PendingNewFeature[] = [];

        for (const entry of pendingRef.current) {
            const matchesExpiry = entry.pendingExpiry && data.timeStr === entry.config.expiry;
            const matchesCountdown = entry.pendingCountdown && data.timeStr === entry.config.countDownTo;

            if (matchesExpiry && data.secondsUntil <= 0) continue;

            const next: PendingNewFeature = {
                config: entry.config,
                pendingExpiry: matchesExpiry ? false : entry.pendingExpiry,
                pendingCountdown: matchesCountdown ? false : entry.pendingCountdown,
                countdownSeconds: matchesCountdown ? Math.max(0, data.secondsUntil) : entry.countdownSeconds
            };

            if (next.pendingExpiry || next.pendingCountdown) {
                remaining.push(next);

                continue;
            }

            attachExtension({
                id: NotificationUtilities.getExtensionId(NotificationExtensionEnum.NewFeature, next.config.name),
                kind: NotificationExtensionEnum.NewFeature,
                config: next.config,
                countdownSeconds: next.countdownSeconds,
                linkRevealed: false
            });
        }

        pendingRef.current = remaining;
    });
}
