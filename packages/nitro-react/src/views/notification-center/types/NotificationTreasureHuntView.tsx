import { DialogUtilities, INotificationItem } from "@nitrodevco/nitro-api";

import { useTranslation } from "#base/context";
import { NitroIcon } from "#base/theme";

import { NotificationBaseView } from "../NotificationBaseView";

const TREASURE_HUNT_BODY_COLOR = '#664e16';
const TREASURE_HUNT_HEADER_COLOR = '#382b0c';

type NotificationTreasureHuntViewProps = {
    notification: INotificationItem;
}

export const NotificationTreasureHuntView = ({ notification }: NotificationTreasureHuntViewProps) => {
    const t = useTranslation();

    const header = (
        <div className="flex h-6 shrink-0 items-center rounded-t-md px-1.75" style={ { backgroundColor: TREASURE_HUNT_HEADER_COLOR } }>
            <span className="font-ubuntu-bold text-[11px] leading-4 text-white">
                { DialogUtilities.resolveText('treasure_hunt.title', t) }
            </span>
        </div>
    );

    const iconFallback = (
        <div className="relative size-9.75 shrink-0 self-start rotate-270">
            <NitroIcon icon="mysterybox-key-base" className="absolute inset-0" />
            <NitroIcon icon="mysterybox-key-overlay" className="absolute inset-0" />
        </div>
    );

    return (
        <NotificationBaseView
            notification={ notification }
            variant="2"
            tintColor={ TREASURE_HUNT_BODY_COLOR }
            header={ header }
            iconFallback={ iconFallback }
            textClassName="font-ubuntu text-[11px] leading-3.5"
            contentClassName="gap-0.25 pt-1.5 pr-1.75 pb-1.75 pl-1.75"
            timeFadeIn={ 800 }
            timeDisplay={ 15000 }
            timeFadeOut={ 800 } />
    );
}
