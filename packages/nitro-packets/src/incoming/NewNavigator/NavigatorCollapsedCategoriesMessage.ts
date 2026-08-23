import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NavigatorCollapsedCategoriesMessageType = {
    collapsedCategories: string[];
};

export class NavigatorCollapsedCategoriesMessage implements IIncomingPacket<NavigatorCollapsedCategoriesMessageType> {
    public parse(wrapper: IMessageDataWrapper): NavigatorCollapsedCategoriesMessageType {
        const packet: NavigatorCollapsedCategoriesMessageType = {
            collapsedCategories: [],
        };

        let v1 = wrapper.readInt();
        while (v1 > 0) {
            packet.collapsedCategories.push(wrapper.readString());
            v1--;
        }

        return packet;
    }
}
