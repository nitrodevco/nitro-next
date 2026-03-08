import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(TopLevelContexts: ImmutableArray<NavigatorTopLevelContextSnapshot>): Unknown type 'ImmutableArray<NavigatorTopLevelContextSnapshot>'. Add override mapping.

export type NavigatorMetadataMessageType = {
  topLevelContexts: any;
};

export class NavigatorMetadataMessage implements IIncomingPacket<NavigatorMetadataMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NavigatorMetadataMessageType
  {

    const packet: NavigatorMetadataMessageType = {
      topLevelContexts: undefined as any, // Unknown type 'ImmutableArray<NavigatorTopLevelContextSnapshot>'. Add override mapping.
    };

    return packet;
  }
}
