import { NotificationStyleEnum } from "@nitrodevco/nitro-api";

import { useNotification } from "#base/context/notification";

import { NotificationBaseView } from "./NotificationBaseView";
import { NOTIFICATION_TIMINGS } from "./NotificationViewConfigs";
import { NotificationFriendOnlineView } from "./types/NotificationFriendOnlineView";
import { NotificationTreasureHuntView } from "./types/NotificationTreasureHuntView";
import { NotificationWiredView } from "./types/NotificationWiredView";

type NotificationItemViewProps = {
    id: number;
}

export const NotificationItemView = ({ id }: NotificationItemViewProps) => {
    const notification = useNotification(id);

    if (!notification) return null;

    switch (notification.styleName) {
        case NotificationStyleEnum.TreasureHunt:
            return <NotificationTreasureHuntView notification={ notification } />;
        case NotificationStyleEnum.FriendOnline:
            return <NotificationFriendOnlineView notification={ notification } />;
        case NotificationStyleEnum.Wired:
            return <NotificationWiredView notification={ notification } />;
        default:
            return <NotificationBaseView notification={ notification } { ...NOTIFICATION_TIMINGS[notification.styleName] } />;
    }
}
