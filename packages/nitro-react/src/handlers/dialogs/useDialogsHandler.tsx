import { DialogUtilities, GetConfigValue } from "@nitrodevco/nitro-api";
import { HabboBroadcastMessage, ModeratorMessage } from "@nitrodevco/nitro-packets";

import { useDialogActions } from "#base/context/dialog";
import { useMessageListener } from "#base/hooks";

export const useDialogsHandler = () => {
    const DEFAULT_ALERT_IMAGE_URL = GetConfigValue<string>('notification.image.url');
    
    const { simpleAlert } = useDialogActions();

    useMessageListener(HabboBroadcastMessage, data => {
        simpleAlert('notifications.broadcast.title', '', DialogUtilities.parseLineBreaks(data.message), { imageUrl: DEFAULT_ALERT_IMAGE_URL });
    });

    useMessageListener(ModeratorMessage, data => {
        simpleAlert('', 'mod.alert.title', DialogUtilities.parseLineBreaks(data.message), {
            linkTitle: 'mod.alert.link',
            linkUrl: data.url,
            imageUrl: DEFAULT_ALERT_IMAGE_URL
        });
    });
}
