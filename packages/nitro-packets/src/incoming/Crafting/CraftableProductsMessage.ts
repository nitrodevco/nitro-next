import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CraftableProductsMessageType = object;

export class CraftableProductsMessage implements IIncomingPacket<CraftableProductsMessageType> {
    public parse(wrapper: IMessageDataWrapper): CraftableProductsMessageType {
        const packet: CraftableProductsMessageType = {
        };

        return packet;
    }
}
