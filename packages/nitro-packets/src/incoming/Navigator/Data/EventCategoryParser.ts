import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IEventCategory {
    categoryId: number;
    categoryName: string;
    visible: boolean;
}

export const EventCategoryParser = (wrapper: IMessageDataWrapper): IEventCategory => {
    return {
        categoryId: wrapper.readInt(),
        categoryName: wrapper.readString(),
        visible: wrapper.readBoolean(),
    };
};
