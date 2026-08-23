import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SellablePetPalettesMessageType = object;

export class SellablePetPalettesMessage implements IIncomingPacket<SellablePetPalettesMessageType> {
    public parse(wrapper: IMessageDataWrapper): SellablePetPalettesMessageType {
        const packet: SellablePetPalettesMessageType = {
        };

        return packet;
    }
}
