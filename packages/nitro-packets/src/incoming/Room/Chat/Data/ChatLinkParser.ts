import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One `{n}` placeholder link inside a chat message - the Flash client read `[String, String, Boolean]` triples. */
export interface IChatLink {
    text: string;
    url: string;
    isInternal: boolean;
}

export const ChatLinkParser = (wrapper: IMessageDataWrapper): IChatLink => ({
    text: wrapper.readString(),
    url: wrapper.readString(),
    isInternal: wrapper.readBoolean(),
});

export const ChatLinksParser = (wrapper: IMessageDataWrapper): IChatLink[] => {
    const links: IChatLink[] = [];
    const count = wrapper.readInt();

    for (let i = 0; i < count; i++) links.push(ChatLinkParser(wrapper));

    return links;
};
