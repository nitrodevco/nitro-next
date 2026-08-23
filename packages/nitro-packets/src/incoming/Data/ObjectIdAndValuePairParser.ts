import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IObjectIdAndValuePair {
    objectId: number;
    value: number;
}

export const ObjectIdAndValuePairParser = (wrapper: IMessageDataWrapper): IObjectIdAndValuePair => {
    const data: IObjectIdAndValuePair = {
        objectId: 0,
        value: 0,
    };

    data.objectId = wrapper.readInt();
    data.value = wrapper.readInt();

    return data;
};
