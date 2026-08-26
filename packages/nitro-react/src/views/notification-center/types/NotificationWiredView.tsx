import { DialogUtilities, INotificationItem } from "@nitrodevco/nitro-api";

import { useTranslation } from "#base/context";
import { Border } from "#base/theme";

import { useNotificationPhase } from "../useNotificationPhase";

const WIRED_BODY_COLOR = '#355477';
const WIRED_HEADER_COLOR = '#1e3044';

type NotificationWiredViewProps = {
    notification: INotificationItem;
}

export const NotificationWiredView = ({ notification }: NotificationWiredViewProps) => {
    const { content } = notification;

    const t = useTranslation();

    const { style, onClick, onMouseEnter, onMouseLeave } = useNotificationPhase(notification, {
        timeFadeIn: 800,
        timeDisplay: 10000,
        timeFadeOut: 800
    });

    return (
        <Border
            variant="2"
            tintColor={ WIRED_BODY_COLOR }
            className="pointer-events-auto relative w-47.5 cursor-pointer overflow-hidden transition-all ease-linear"
            style={ style }
            onClick={ onClick }
            onMouseEnter={ onMouseEnter }
            onMouseLeave={ onMouseLeave }>
            <div className="wired-notification-bg pointer-events-none absolute left-0 -top-4.75 -scale-x-100 opacity-30" />
            <div className="relative flex h-6 items-center justify-center rounded-t-md px-1.75" style={ { backgroundColor: WIRED_HEADER_COLOR } }>
                <span className="font-ubuntu-bold text-[11px] leading-4 text-white">
                    { DialogUtilities.resolveText('product.type.wired', t) }
                </span>
            </div>
            <div className="relative px-2 pt-1.75 pb-2">
                <div className="wrap-break-word text-center font-ubuntu text-[11px] leading-4 text-white">{ content }</div>
            </div>
        </Border>
    );
}
