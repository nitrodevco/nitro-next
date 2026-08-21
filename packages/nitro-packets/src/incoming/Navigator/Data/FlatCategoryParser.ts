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
