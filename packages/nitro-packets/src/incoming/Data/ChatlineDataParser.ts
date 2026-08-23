import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IChatlineData {
    timeStamp: string;
    chatterId: number;
    chatterName: string;
    msg: string;
    hasHighlighting: boolean;
}

export const ChatlineDataParser = (wrapper: IMessageDataWrapper): IChatlineData => {
    const data: IChatlineData = {
        timeStamp: '',
        chatterId: 0,
        chatterName: '',
        msg: '',
        hasHighlighting: false,
    };

    data.timeStamp = wrapper.readString();
    data.chatterId = wrapper.readInt();
    data.chatterName = wrapper.readString();
    data.msg = wrapper.readString();
    data.hasHighlighting = wrapper.readBoolean();

    return data;
};
