import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface ILiftedRoomData {
    flatId: number;
    areaId: number;
    image: string;
    caption: string;
}

export const LiftedRoomDataParser = (wrapper: IMessageDataWrapper): ILiftedRoomData => {
    const data: ILiftedRoomData = {
        flatId: 0,
        areaId: 0,
        image: '',
        caption: '',
    };

    data.flatId = wrapper.readInt();
    data.areaId = wrapper.readInt();
    data.image = wrapper.readString();
    data.caption = wrapper.readString();

    return data;
}
