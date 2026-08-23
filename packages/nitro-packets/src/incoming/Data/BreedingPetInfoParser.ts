import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IBreedingPetInfo {
    webId: number;
    name: string;
    level: number;
    figure: string;
    owner: string;
}

export const BreedingPetInfoParser = (wrapper: IMessageDataWrapper): IBreedingPetInfo => {
    const data: IBreedingPetInfo = {
        webId: 0,
        name: '',
        level: 0,
        figure: '',
        owner: '',
    };

    data.webId = wrapper.readInt();
    data.name = wrapper.readString();
    data.level = wrapper.readInt();
    data.figure = wrapper.readString();
    data.owner = wrapper.readString();

    return data;
};
