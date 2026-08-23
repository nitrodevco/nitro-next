import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ISearchResultSet } from './Data/SearchResultSetParser';
import { SearchResultSetParser } from './Data/SearchResultSetParser';

export type NavigatorSearchResultBlocksMessageType = {
    searchResult: ISearchResultSet;
};

export class NavigatorSearchResultBlocksMessage implements IIncomingPacket<NavigatorSearchResultBlocksMessageType> {
    public parse(wrapper: IMessageDataWrapper): NavigatorSearchResultBlocksMessageType {
        const packet: NavigatorSearchResultBlocksMessageType = {
            searchResult: SearchResultSetParser(wrapper),
        };

        return packet;
    }
}
