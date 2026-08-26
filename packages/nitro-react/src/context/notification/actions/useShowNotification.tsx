import { DialogUtilities, NotificationStyleEnum, NotificationUtilities } from "@nitrodevco/nitro-api";

import { useConfigData, useConfigValue, useSystemContext, useTranslation } from "#base/context";
import { useDialogActions } from "#base/context/dialog";

import { useNotificationActions } from "./useNotificationActions";

export const useShowNotification = () => {
    const { addNotification } = useNotificationActions();
    const { notificationPopup } = useDialogActions();
    
    const localizations = useSystemContext(x => x.localizations);
    const config = useConfigData();
    const imageTemplate = useConfigValue<string>('notification.image.url') ?? '';

    const t = useTranslation();

    return (type: string, params: Record<string, string> = {}) => {
        const hotelConfig = config[`notification.${ type }`];

        const merged = {
            ...params,
            ...(typeof hotelConfig === 'object' && hotelConfig !== null ? hotelConfig as Record<string, string> : {})
        };

        const localize = (key: string, replacements: Record<string, string>) => key in localizations ? t(key, key, replacements) : null;

        const title = NotificationUtilities.getNotificationPart(merged, type, 'title', true, localize) ?? '';
        const message = DialogUtilities.parseLineBreaks(NotificationUtilities.getNotificationPart(merged, type, 'message', true, localize) ?? '');
        const linkTitle = NotificationUtilities.getNotificationPart(merged, type, 'linkTitle', false, localize);
        const linkUrl = NotificationUtilities.getNotificationPart(merged, type, 'linkUrl', false, localize);
        const imageUrl = NotificationUtilities.getNotificationImageUrl(merged, type, imageTemplate);

        if (merged.display === NotificationUtilities.DISPLAY_BUBBLE) {
            addNotification(message, NotificationStyleEnum.Info, {
                iconAssetUri: imageUrl,
                internalLink: linkUrl ?? undefined
            });

            return;
        }

        notificationPopup(title, message, {
            linkTitle: linkTitle ?? linkUrl ?? '',
            linkUrl: linkUrl ?? '',
            imageUrl
        });
    };
}
