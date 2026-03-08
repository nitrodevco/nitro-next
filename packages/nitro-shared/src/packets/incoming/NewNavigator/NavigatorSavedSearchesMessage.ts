import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(SavedSearches: List<NavigatorQuickLinkSnapshot>): List<T> requires custom read loop (length + items).

export type NavigatorSavedSearchesMessageType = {
  savedSearches: any[];
};

export class NavigatorSavedSearchesMessage implements IIncomingPacket<NavigatorSavedSearchesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NavigatorSavedSearchesMessageType
  {

    const packet: NavigatorSavedSearchesMessageType = {
      savedSearches: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
