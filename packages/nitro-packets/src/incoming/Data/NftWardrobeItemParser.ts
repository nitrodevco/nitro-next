import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface INftWardrobeItem {
    id: string;
    figureString: string;
    gender: string;
    tokenId: string;
    contractKey: string;
}

export const NftWardrobeItemParser = (wrapper: IMessageDataWrapper): INftWardrobeItem => {
    const data: INftWardrobeItem = {
        id: '',
        figureString: '',
        gender: '',
        tokenId: '',
        contractKey: '',
    };

    data.id = wrapper.readString();
    data.figureString = wrapper.readString();
    data.gender = wrapper.readString();
    data.tokenId = wrapper.readString();
    data.contractKey = wrapper.readString();

    return data;
};
