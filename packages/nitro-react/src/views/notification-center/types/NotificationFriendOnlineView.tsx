import { INotificationItem } from "@nitrodevco/nitro-api";
import type { MouseEvent } from "react";

import { useNotificationPhase } from "../useNotificationPhase";

const FRIEND_ONLINE_LEFT = "bg-[url('/assets/flash/notifications/friendonline/left.png')] bg-no-repeat";
const FRIEND_ONLINE_MIDDLE = "bg-[url('/assets/flash/notifications/friendonline/middle.png')] bg-repeat-x";

type NotificationFriendOnlineViewProps = {
    notification: INotificationItem;
}

export const NotificationFriendOnlineView = ({ notification }: NotificationFriendOnlineViewProps) => {
    const { content, icon } = notification;

    const { style, onClick: onNotificationClick, onMouseEnter, onMouseLeave } = useNotificationPhase(notification, {
        timeFadeIn: 800,
        timeDisplay: 8000,
        timeFadeOut: 800
    });

    const closeAndOpenMessenger = (event: MouseEvent<HTMLDivElement>) => {
        close(event)

        console.log('open messenger')
    }

    const close = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        
        onNotificationClick(event);
    }

    return (
        <div
            className="pointer-events-auto flex h-14.5 w-fit items-start transition-all ease-linear"
            style={ style }
            onClick={ closeAndOpenMessenger }
            onMouseEnter={ onMouseEnter }
            onMouseLeave={ onMouseLeave }>
            <div className="mt-3 flex h-8.5 items-stretch">
                <span className={ `w-1.75 shrink-0 ${ FRIEND_ONLINE_LEFT }` } />
                <div className={ `flex items-center gap-1.25 pl-px pr-2.5 ${ FRIEND_ONLINE_MIDDLE }` }>
                    <span data-slide-away className="flex h-4.25 w-2.5 items-center justify-center cursor-pointer" onClick={ close }>
                        <span className="friendonline-slide block shrink-0" />
                    </span>
                    <span className="font-goldfish text-[0.56rem] leading-3 whitespace-nowrap text-[#cfcfcf]">{ content }</span>
                </div>
            </div>
            <div className="relative -ml-2.5 mt-0.75 size-13.25 shrink-0">
                <div className="friendonline-circle-inner absolute inset-0" />
                { !!icon?.length && (
                    <div className="absolute left-0.5 top-px size-12.5 overflow-hidden rounded-full">
                        <img src={ icon } alt="" className="size-full object-contain pixel-art" />
                    </div>
                ) }
                <div className="friendonline-circle absolute inset-0" />
            </div>
        </div>
    );
}
