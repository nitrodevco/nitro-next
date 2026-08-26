import { DialogFlagEnum } from "./DialogFlagEnum";

export class DialogUtilities {
    public static readonly DEFAULT_FLAGS = DialogFlagEnum.ButtonOk | DialogFlagEnum.TextTitle | DialogFlagEnum.TextSummary;
    
    private static readonly LINK_EVENT_PREFIX = "event:";
    
    private static readonly LOCALIZATION_KEY_REGEX = /^\$\{(.+)\}$/;

    public static resolveFlags(flags: number) {
        return flags === 0 ? DialogUtilities.DEFAULT_FLAGS : flags;
    }

    public static hasFlag(flags: number, flag: DialogFlagEnum) {
        return (flags & flag) !== 0;
    }

    public static resolveText(value: string, localize: (key: string, defaultValue: string) => string) {
        const key = DialogUtilities.unwrapLocalizationKey(value);

        return localize(key, key);
    }

    public static unwrapLocalizationKey(value: string) {
        if (!value) return "";

        return DialogUtilities.LOCALIZATION_KEY_REGEX.exec(value)?.[1] ?? value;
    }

    public static isLinkEvent(url: string) {
        return url.startsWith(DialogUtilities.LINK_EVENT_PREFIX);
    }

    public static parseLineBreaks(message: string) {
        return message.replace(/\\r/g, '\r');
    }
}
