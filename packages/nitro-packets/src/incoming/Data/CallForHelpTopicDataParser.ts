import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface ICallForHelpTopicData {
    name: string;
    id: number;
    consequence: string;
}

export const CallForHelpTopicDataParser = (wrapper: IMessageDataWrapper): ICallForHelpTopicData => {
    const data: ICallForHelpTopicData = {
        name: '',
        id: 0,
        consequence: '',
    };

    data.name = wrapper.readString();
    data.id = wrapper.readInt();
    data.consequence = wrapper.readString();

    return data;
};
