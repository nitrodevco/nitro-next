import { NotificationPhaseEnum } from "./NotificationPhaseEnum";
import { NotificationStyleEnum } from "./NotificationStyleEnum";

export interface INotificationItem {
    readonly id: number;
    readonly styleName: NotificationStyleEnum;
    readonly content: string;
    readonly icon: string | null;
    readonly badgeId: string | null;
    readonly internalLink: string | null;
    readonly useStyleConfig: boolean;
    readonly phase: NotificationPhaseEnum;
    readonly hovering: boolean;
    readonly expired: boolean;
}
