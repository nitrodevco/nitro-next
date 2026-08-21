import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IAreaHideMessageData {
    furniId: number;
    on: boolean;
    rootX: number;
    rootY: number;
    width: number;
    length: number;
    invert: boolean;
}

export const AreaHideMessageDataParser = (wrapper: IMessageDataWrapper): IAreaHideMessageData => {
    const data: IAreaHideMessageData = {
        furniId: 0,
        on: false,
        rootX: 0,
        rootY: 0,
        width: 0,
        length: 0,
        invert: false,
    };

    data.furniId = wrapper.readInt();
    data.on = wrapper.readBoolean();
    data.rootX = wrapper.readInt();
    data.rootY = wrapper.readInt();
    data.width = wrapper.readInt();
    data.length = wrapper.readInt();
    data.invert = wrapper.readBoolean();

    return data;
}
