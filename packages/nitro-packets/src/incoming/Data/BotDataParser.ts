import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IBotData {
    id: number;
    name: string;
    motto: string;
    gender: string;
    figure: string;
}

export const BotDataParser = (wrapper: IMessageDataWrapper): IBotData => {
    const data: IBotData = {
        id: 0,
        name: '',
        motto: '',
        gender: '',
        figure: '',
    };

    data.id = wrapper.readInt();
    data.name = wrapper.readString();
    data.motto = wrapper.readString();
    data.gender = wrapper.readString();
    data.figure = wrapper.readString();

    return data;
};
