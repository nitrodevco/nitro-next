import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IBadgePartData {
    id: number;
    fileName: string;
    maskFileName: string;
}

export const BadgePartDataParser = (wrapper: IMessageDataWrapper): IBadgePartData => {
    const data: IBadgePartData = {
        id: 0,
        fileName: '',
        maskFileName: '',
    };

    data.id = wrapper.readInt();
    data.fileName = wrapper.readString();
    data.maskFileName = wrapper.readString();

    return data;
};
