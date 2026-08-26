import { NotificationExtensionEnum, NotificationStyleEnum, NotificationUtilities } from "@nitrodevco/nitro-api";
import { AccountSafetyLockStatusChangeMessage, ClubGiftNotificationEventMessage, HabboAchievementNotificationMessage, InfoFeedEnableMessage, MOTDNotificationEventMessage, NotificationDialogMessage, PetLevelNotificationEventMessage, RespectNotificationMessage, UserObjectMessage } from "@nitrodevco/nitro-packets";

import { useConfigValue, useTranslation } from "#base/context";
import { useDialogActions } from "#base/context/dialog";
import { useNotificationActions, useNotificationExtensionActions, useShowNotification } from "#base/context/notification";
import { useOwnUserId } from "#base/context/user";
import { useMessageListener } from "#base/hooks";

export const useNotificationsHandler = () => {
    const itemsEnabled = useConfigValue<boolean>('notification.items.enabled') ?? true;

    const userId = useOwnUserId();

    const { addNotification, setNotificationsDisabled } = useNotificationActions();
    const { attachExtension, detachExtension } = useNotificationExtensionActions();
    const { alert } = useDialogActions();

    const showNotification = useShowNotification();

    const t = useTranslation();

    useMessageListener(InfoFeedEnableMessage, data => {
        setNotificationsDisabled(!data.enabled);
    });

    useMessageListener(NotificationDialogMessage, data => {
        if (!itemsEnabled) return;

        showNotification(data.type, data.parameters);
    });

    useMessageListener(RespectNotificationMessage, data => {
        if (!itemsEnabled || data.userId !== userId) return;

        addNotification(t('notifications.text.respect.1', 'notifications.text.respect.1'), NotificationStyleEnum.Respect);
        addNotification(t('notifications.text.respect.2', 'notifications.text.respect.2', { count: data.respectsReceived.toString() }), NotificationStyleEnum.Respect);
    });

    useMessageListener(HabboAchievementNotificationMessage, data => {
        if (!itemsEnabled) return;

        addNotification(t('achievements.levelup.desc', 'achievements.levelup.desc'), NotificationStyleEnum.Achievement, {
            badgeId: data.data.badgeId,
            internalLink: `questengine/achievements/${ data.data.category }`
        });
    });

    useMessageListener(PetLevelNotificationEventMessage, data => {
        if (!itemsEnabled) return;

        addNotification(t('notifications.text.petlevel', 'notifications.text.petlevel', { pet_name: data.petName, level: data.level.toString() }), NotificationStyleEnum.PetLevel);
    });

    useMessageListener(MOTDNotificationEventMessage, data => {
        if (!itemsEnabled || !data.messages.length) return;

        alert('notifications.motd.title', data.messages.join('\n'), 0, null);
    });

    useMessageListener(ClubGiftNotificationEventMessage, data => {
        if (data.numGifts < 1) return;

        attachExtension({
            id: NotificationUtilities.getExtensionId(NotificationExtensionEnum.ClubGift),
            kind: NotificationExtensionEnum.ClubGift,
            numGifts: data.numGifts
        });
    });

    useMessageListener(UserObjectMessage, data => {
        if (!data.userInfo.accountSafetyLocked) return;

        attachExtension({
            id: NotificationUtilities.getExtensionId(NotificationExtensionEnum.SafetyLocked),
            kind: NotificationExtensionEnum.SafetyLocked,
            statusId: data.userInfo.userId
        });
    });

    useMessageListener(AccountSafetyLockStatusChangeMessage, data => {
        if (data.status !== 1) return;

        detachExtension(NotificationUtilities.getExtensionId(NotificationExtensionEnum.SafetyLocked));
    });
}
