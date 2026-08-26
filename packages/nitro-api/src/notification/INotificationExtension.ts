import { NewFeatureTypeEnum } from "./NewFeatureTypeEnum";
import { NotificationExtensionEnum } from "./NotificationExtensionEnum";

export interface INewFeatureConfig {
    readonly name: string;
    readonly type: NewFeatureTypeEnum;
    readonly color: string;
    readonly image: string;
    readonly internalLink: string;
    readonly expiry: string;
    readonly countDownTo: string;
}

export interface INotificationExtensionBase {
    readonly id: string;
    readonly kind: NotificationExtensionEnum;
}

export interface IClubGiftExtension extends INotificationExtensionBase {
    readonly kind: NotificationExtensionEnum.ClubGift;
    readonly numGifts: number;
}

export interface ISafetyLockedExtension extends INotificationExtensionBase {
    readonly kind: NotificationExtensionEnum.SafetyLocked;
    readonly statusId: number;
}

export interface INewFeatureExtension extends INotificationExtensionBase {
    readonly kind: NotificationExtensionEnum.NewFeature;
    readonly config: INewFeatureConfig;
    readonly countdownSeconds: number;
    readonly linkRevealed: boolean;
}

export type NotificationExtension = IClubGiftExtension | ISafetyLockedExtension | INewFeatureExtension;
