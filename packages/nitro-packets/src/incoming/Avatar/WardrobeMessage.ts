import { AvatarGenderType, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IOutfitData } from './Data/IOutfitData';

export type WardrobeMessageType = {
    state: number;
    outfits: IOutfitData[];
};

export class WardrobeMessage implements IIncomingPacket<WardrobeMessageType> {
    public parse(wrapper: IMessageDataWrapper): WardrobeMessageType {
        const packet: WardrobeMessageType = {
            state: wrapper.readInt(),
            outfits: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.outfits.push({
                slotId: wrapper.readInt(),
                figure: wrapper.readString(),
                gender: wrapper.readString()?.toUpperCase() as AvatarGenderType,
            });

            count--;
        }

        return packet;
    }
}
