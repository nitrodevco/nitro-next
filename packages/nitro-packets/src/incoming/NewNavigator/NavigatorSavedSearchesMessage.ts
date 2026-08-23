import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ISavedSearch } from './Data/SavedSearchParser';
import { SavedSearchParser } from './Data/SavedSearchParser';

export type NavigatorSavedSearchesMessageType = {
    savedSearches: ISavedSearch[];
};

export class NavigatorSavedSearchesMessage implements IIncomingPacket<NavigatorSavedSearchesMessageType> {
    public parse(wrapper: IMessageDataWrapper): NavigatorSavedSearchesMessageType {
        const packet: NavigatorSavedSearchesMessageType = {
            savedSearches: [],
        };

        let v1 = wrapper.readInt();
        while (v1 > 0) {
            packet.savedSearches.push(SavedSearchParser(wrapper));
            v1--;
        }

        return packet;
    }
}
