import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IRoomVisitData {
    roomId: number;
    roomName: string;
    enterHour: number;
    enterMinute: number;
}

export const RoomVisitDataParser = (wrapper: IMessageDataWrapper): IRoomVisitData => {
    const data: IRoomVisitData = {
        roomId: 0,
        roomName: '',
        enterHour: 0,
        enterMinute: 0,
    };

    data.roomId = wrapper.readInt();
    data.roomName = wrapper.readString();
    data.enterHour = wrapper.readInt();
    data.enterMinute = wrapper.readInt();

    return data;
};
