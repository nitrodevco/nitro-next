import { useConfigValue, useTranslation } from "#base/context";
import { DialogLinkButtonView } from "#base/views/dialogs/DialogLinkButtonView";

import { NotificationExtensionFrameView } from "./NotificationExtensionFrameView";

export const SafetyLockedExtensionView = () => {
    const unlockUrl = useConfigValue<string>('link.format.safetylock_unlock') ?? '';

    const t = useTranslation();

    return (
        <NotificationExtensionFrameView className="min-h-20">
            <div className="text-style-il-regular text-white w-full">
                { t('notifications.text.safety_locked', 'notifications.text.safety_locked') }
            </div>
            <DialogLinkButtonView className="text-style-il-regular text-white hover:text-[#bae1f9]" onClick={ () => unlockUrl.length && window.open(unlockUrl, 'habboMain') }>
                { t('notifications.button.safety_locked', 'notifications.button.safety_locked') }
            </DialogLinkButtonView>
        </NotificationExtensionFrameView>
    );
}
