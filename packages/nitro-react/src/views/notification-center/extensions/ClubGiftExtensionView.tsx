import { IClubGiftExtension } from "@nitrodevco/nitro-api";

import { useTranslation, useWindowActions } from "#base/context";
import { useNotificationExtensionActions } from "#base/context/notification";
import { ButtonThick, NitroIcon } from "#base/theme";
import { DialogLinkButtonView } from "#base/views/dialogs/DialogLinkButtonView";

import { NotificationExtensionFrameView } from "./NotificationExtensionFrameView";

type ClubGiftExtensionViewProps = {
    extension: IClubGiftExtension;
}

export const ClubGiftExtensionView = ({ extension }: ClubGiftExtensionViewProps) => {
    const { detachExtension } = useNotificationExtensionActions();
    const { showWindow } = useWindowActions();

    const t = useTranslation();

    const openCatalog = () => {
        showWindow('catalog');

        detachExtension(extension.id);
    }

    return (
        <NotificationExtensionFrameView className="min-h-20.5">
            <div className="flex items-center gap-1 w-full">
                <NitroIcon icon="icon-hc-small" />
                <div className="text-style-il-regular text-white">
                    { t('notifications.text.club_gift', 'notifications.text.club_gift', { count: extension.numGifts.toString() }) }
                </div>
            </div>
            <ButtonThick variant="3" className="h-7 w-full" onClick={ openCatalog }>
                { t('notifications.button.show_gift_list', 'notifications.button.show_gift_list') }
            </ButtonThick>
            <DialogLinkButtonView className="text-style-il-regular text-white hover:text-[#bae1f9]" onClick={ () => detachExtension(extension.id, true) }>
                { t('notifications.button.later', 'notifications.button.later') }
            </DialogLinkButtonView>
        </NotificationExtensionFrameView>
    );
}
