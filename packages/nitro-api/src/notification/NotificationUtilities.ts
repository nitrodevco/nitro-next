import { ColorConverter } from "../utils/ColorConverter";
import { INewFeatureConfig } from "./INotificationExtension";
import { NewFeatureTypeEnum } from "./NewFeatureTypeEnum";
import { NotificationExtensionEnum } from "./NotificationExtensionEnum";

export type NotificationLocalizer = (key: string, replacements: Record<string, string>) => string | null;

export class NotificationUtilities {
    public static readonly DISPLAY_BUBBLE = "BUBBLE";

    public static readonly NEW_FEATURE_DEFAULT_COLOR = "#686661";
    public static readonly NEW_FEATURE_BOOT_DELAY = 2000;

    public static getNotificationPart(params: Record<string, string>, type: string, part: string, force: boolean, localize: NotificationLocalizer): string | null {
        if (part in params) return params[part];

        const key = `notification.${ type }.${ part }`;
        const value = localize(key, params);

        if (value !== null) return value;

        return force ? key : null;
    }

    public static getNotificationImageUrl(params: Record<string, string>, type: string, template: string) {
        const image = params["image"];

        if (image?.length) return image;

        return template.replace("%image%", NotificationUtilities.normalizeImageName(type));
    }

    public static normalizeImageName(type: string) {
        return type.split(".").join("_");
    }

    public static getExtensionId(kind: NotificationExtensionEnum, key: string = "") {
        return kind === NotificationExtensionEnum.NewFeature ? `${ kind }_${ key }` : kind;
    }

    public static resolveNewFeatureType(value: unknown): NewFeatureTypeEnum {
        switch (value) {
            case NewFeatureTypeEnum.Promo:
                return NewFeatureTypeEnum.Promo;
            case NewFeatureTypeEnum.Countdown:
                return NewFeatureTypeEnum.Countdown;
            default:
                return NewFeatureTypeEnum.Normal;
        }
    }

    public static parseNewFeatureConfig(raw: Record<string, unknown>): INewFeatureConfig | null {
        const name = typeof raw?.name === "string" ? raw.name : "";

        if (!name.length) return null;

        const readString = (key: string, fallback: string = "") => {
            const value = raw[key];

            return typeof value === "string" && value.length ? value : fallback;
        };

        return {
            name,
            type: NotificationUtilities.resolveNewFeatureType(raw.type),
            color: readString("color", NotificationUtilities.NEW_FEATURE_DEFAULT_COLOR),
            image: readString("image"),
            internalLink: readString("internal.link"),
            expiry: readString("expiry"),
            countDownTo: readString("count_down_to")
        };
    }

    public static getNewFeatureButtonColor(color: string) {
        const value = parseInt(color.replace("#", ""), 16);
        const hsl = ColorConverter.rgbToHSL(value);
        const lightness = 255 - Math.trunc((255 - (hsl & 0xFF)) / 2);

        return ColorConverter.hslToRGB(lightness | (hsl & 0xFFFF00));
    }
}
