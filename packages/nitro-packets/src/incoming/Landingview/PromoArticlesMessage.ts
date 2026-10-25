// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/** `PromoArticlesMessageParser` and `PromoArticleData` from Flash's landing-view controller. */
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface PromoArticleData {
    id: number;
    title: string;
    bodyText: string;
    buttonText: string;
    linkType: number;
    linkContent: string;
    imageUrl: string;
}

export interface PromoArticlesMessageType {
    articles: PromoArticleData[];
}

export class PromoArticlesMessage implements IIncomingPacket<PromoArticlesMessageType> {
    public parse(wrapper: IMessageDataWrapper): PromoArticlesMessageType {
        const packet: PromoArticlesMessageType = { articles: [] };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.articles.push({
                id: wrapper.readInt(),
                title: wrapper.readString(),
                bodyText: wrapper.readString(),
                buttonText: wrapper.readString(),
                linkType: wrapper.readInt(),
                linkContent: wrapper.readString(),
                imageUrl: wrapper.readString(),
            });
            count--;
        }

        return packet;
    }
}
