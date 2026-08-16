import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Blocks: ImmutableArray<NavigatorSearchResultBlockSnapshot>): Unknown type 'ImmutableArray<NavigatorSearchResultBlockSnapshot>'. Add override mapping.

export type NavigatorSearchResultBlocksMessageType = {
  searchCodeOriginal: string;
  filteringData: string;
  blocks: any;
};

export class NavigatorSearchResultBlocksMessage implements IIncomingPacket<NavigatorSearchResultBlocksMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NavigatorSearchResultBlocksMessageType
  {

    const packet: NavigatorSearchResultBlocksMessageType = {
      searchCodeOriginal: wrapper.readString(),
      filteringData: wrapper.readString(),
      blocks: undefined as any, // Unknown type 'ImmutableArray<NavigatorSearchResultBlockSnapshot>'. Add override mapping.
    };

    return packet;
  }
}
