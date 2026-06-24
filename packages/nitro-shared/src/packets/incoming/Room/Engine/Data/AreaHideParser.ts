import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

import type { IAreaHide } from "./IAreaHide";

export const AreaHideParser = (wrapper: IMessageDataWrapper): IAreaHide[] => {
    const parseItem = (wrapper: IMessageDataWrapper) => {
        return {
            furniId: wrapper.readInt(),
            on: wrapper.readBoolean(),
            rootX: wrapper.readInt(),
            rootY: wrapper.readInt(),
            width: wrapper.readInt(),
            length: wrapper.readInt(),
            invert: wrapper.readBoolean()
        };
    }

    const datas: IAreaHide[] = [];

    let count = wrapper.readInt();

    while (count > 0) {
        datas.push(parseItem(wrapper));

        count--;
    }

    return datas;
}