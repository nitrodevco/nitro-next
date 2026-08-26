import { NotificationExtensionEnum } from "@nitrodevco/nitro-api";

import { useNotificationExtensions } from "#base/context/notification";

import { ClubGiftExtensionView } from "./ClubGiftExtensionView";
import { NewFeatureExtensionView } from "./NewFeatureExtensionView";
import { SafetyLockedExtensionView } from "./SafetyLockedExtensionView";

export const NotificationExtensionsView = () => {
    const extensions = useNotificationExtensions();

    if (!extensions.length) return null;

    return (
        <div className="flex flex-col items-end gap-0.5 w-full pointer-events-none mt-0.5">
            { extensions.map(extension => {
                switch (extension.kind) {
                    case NotificationExtensionEnum.ClubGift:
                        return <ClubGiftExtensionView key={ extension.id } extension={ extension } />;
                    case NotificationExtensionEnum.SafetyLocked:
                        return <SafetyLockedExtensionView key={ extension.id } />;
                    case NotificationExtensionEnum.NewFeature:
                        return <NewFeatureExtensionView key={ `${ extension.id }-${ extension.countdownSeconds }` } extension={ extension } />;
                    default:
                        return null;
                }
            }) }
        </div>
    );
}
