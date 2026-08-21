import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IFlatControllerData {
    userId: number;
    userName: string;
}

export const FlatControllerDataParser = (wrapper: IMessageDataWrapper): IFlatControllerData => {
    const data: IFlatControllerData = {
        userId: 0,
        userName: '',
    };

    data.userId = wrapper.readInt();
    data.userName = wrapper.readString();

    return data;
}
