import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IHotLookInfo {
    gender: string;
    figureString: string;
}

export const HotLookInfoParser = (wrapper: IMessageDataWrapper): IHotLookInfo => {
    const data: IHotLookInfo = {
        gender: '',
        figureString: '',
    };

    data.gender = wrapper.readString();
    data.figureString = wrapper.readString();

    return data;
};
