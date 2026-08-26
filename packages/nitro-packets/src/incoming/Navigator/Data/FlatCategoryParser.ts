import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IFlatCategory {
    nodeId: number;
    nodeName: string;
    visible: boolean;
    automatic: boolean;
    automaticCategoryKey: string;
    globalCategoryKey: string;
    staffOnly: boolean;
}

export const FlatCategoryParser = (wrapper: IMessageDataWrapper): IFlatCategory => {
    return {
        nodeId: wrapper.readInt(),
        nodeName: wrapper.readString(),
        visible: wrapper.readBoolean(),
        automatic: wrapper.readBoolean(),
        automaticCategoryKey: wrapper.readString(),
        globalCategoryKey: wrapper.readString(),
        staffOnly: wrapper.readBoolean()
    };
}

/**
 * FlatCategory.visibleName in the SWF:
 *   globalCategoryKey == "" ? nodeName : "${navigator.flatcategory.global." + globalCategoryKey + "}"
 * The wire never carries the display string — the client builds it.
 */
export const getFlatCategoryVisibleName = (category: IFlatCategory) =>
    category.globalCategoryKey === ''
        ? category.nodeName
        : `\${navigator.flatcategory.global.${category.globalCategoryKey}}`;
