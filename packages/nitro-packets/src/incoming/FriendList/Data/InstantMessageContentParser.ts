import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export const INSTANT_MESSAGE_TEXT = 0;
export const INSTANT_MESSAGE_HABBICON = 1;

/** Flash `InstantMessageContentData`: what a console message carries - text, or a habbicon by id. */
export interface IInstantMessageContent {
    messageType: number;
    messageText: string;
    habbiconId: number;
}

export const InstantMessageContentParser = (wrapper: IMessageDataWrapper): IInstantMessageContent => {
    const messageType = wrapper.readInt();

    switch (messageType) {
        case INSTANT_MESSAGE_TEXT:
            return { messageType, messageText: wrapper.readString(), habbiconId: 0 };
        case INSTANT_MESSAGE_HABBICON:
            return { messageType, messageText: '', habbiconId: wrapper.readInt() };
        default:
            return { messageType: INSTANT_MESSAGE_TEXT, messageText: '', habbiconId: 0 };
    }
};
