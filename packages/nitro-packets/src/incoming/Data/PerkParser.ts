import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

/** PerkAllowancesMessageParser: code, errorMessage, isAllowed per entry */
export interface IPerk {
    code: string;
    errorMessage: string;
    isAllowed: boolean;
}

export const PerkParser = (wrapper: IMessageDataWrapper): IPerk => {
    return {
        code: wrapper.readString(),
        errorMessage: wrapper.readString(),
        isAllowed: wrapper.readBoolean()
    };
}
