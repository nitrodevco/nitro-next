import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(CollapsedCategoryIds: List<string>): List<T> requires custom read loop (length + items).

export type NavigatorCollapsedCategoriesMessageType = {
  collapsedCategoryIds: string[];
};

export class NavigatorCollapsedCategoriesMessage implements IIncomingPacket<NavigatorCollapsedCategoriesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NavigatorCollapsedCategoriesMessageType
  {

    const packet: NavigatorCollapsedCategoriesMessageType = {
      collapsedCategoryIds: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
