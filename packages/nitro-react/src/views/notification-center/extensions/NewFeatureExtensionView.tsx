import { INewFeatureExtension, NewFeatureTypeEnum, NotificationUtilities } from "@nitrodevco/nitro-api";

import { useConfigValue, useTranslation } from "#base/context";
import { useNotificationExtensionActions } from "#base/context/notification";
import { Button, cn, NitroIcon } from "#base/theme";
import { DialogLinkButtonView } from "#base/views/dialogs/DialogLinkButtonView";

import { NewFeatureCountdownView } from "./NewFeatureCountdownView";
import { NotificationExtensionFrameView } from "./NotificationExtensionFrameView";

type NewFeatureExtensionViewProps = {
    extension: INewFeatureExtension;
}

export const NewFeatureExtensionView = ({ extension }: NewFeatureExtensionViewProps) => {
    const { config, countdownSeconds, linkRevealed } = extension;

    const { detachExtension, revealExtensionLink } = useNotificationExtensionActions();
    const imageTemplate = useConfigValue<string>('notification.image.url') ?? '';

    const t = useTranslation();

    const description = t(`notifications.new_feature.${ config.name }.desc`, `notifications.new_feature.${ config.name }.desc`);
    const imageUrl = config.image.length ? imageTemplate.replace('%image%', config.image) : '';
    const isNormal = config.type === NewFeatureTypeEnum.Normal;
    const showDismiss = config.type !== NewFeatureTypeEnum.Promo || linkRevealed;

    const open = () => revealExtensionLink(extension.id);
    const dismiss = () => detachExtension(extension.id, true);

    const image = !!imageUrl.length && (
        <div className={ cn('shrink-0 flex items-center justify-center', isNormal ? 'w-13.75 h-11.75' : 'size-5') }>
            <img src={ imageUrl } alt="" className="max-w-full max-h-full pixel-art" />
        </div>
    );

    if (isNormal) {
        return (
            <NotificationExtensionFrameView color={ config.color } className="min-h-23">
                <div className="flex gap-2 w-full">
                    { image }
                    <div className="text-style-il-regular text-[0.78rem] text-white pt-1 min-w-0 wrap-break-word">{ description }</div>
                </div>
                <div className={ cn('flex items-center gap-2 w-full', showDismiss ? 'justify-between' : 'justify-end') }>
                    { showDismiss && (
                        <DialogLinkButtonView className="text-left text-[0.78rem] text-style-il-regular text-white hover:text-[#bae1f9]" onClick={ dismiss }>
                            { t('notifications.button.cancel', 'notifications.button.cancel') }
                        </DialogLinkButtonView>
                    ) }
                    <Button
                        variant="4"
                        className="h-7 min-w-12.75 px-3 shrink-0"
                        tintColor={ `#${ NotificationUtilities.getNewFeatureButtonColor(config.color).toString(16).padStart(6, '0') }` }
                        onClick={ open }>
                        { t('notifications.button.view', 'notifications.button.view') }
                    </Button>
                </div>
            </NotificationExtensionFrameView>
        );
    }

    return (
        <NotificationExtensionFrameView
            color={ config.color }
            className={ cn('group items-stretch', config.type === NewFeatureTypeEnum.Countdown ? 'min-h-19' : 'min-h-8.5') }
            onClick={ open }>
            <div className="flex items-center gap-2 w-full">
                { image }
                <div className="text-style-il-regular text-white group-hover:text-[#bae1f9] underline flex-1 min-w-0 break-words">{ description }</div>
                { showDismiss && (
                    <button type="button" className="cursor-pointer shrink-0 invert-100" onClick={ event => { event.stopPropagation(); dismiss(); } }>
                        <NitroIcon icon="icon-close-gray" />
                    </button>
                ) }
            </div>
            { config.type === NewFeatureTypeEnum.Countdown && (
                <div className="flex justify-center mt-1">
                    <NewFeatureCountdownView seconds={ countdownSeconds } />
                </div>
            ) }
        </NotificationExtensionFrameView>
    );
}
