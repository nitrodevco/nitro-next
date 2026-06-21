import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HeightMapMessageType = {
    width: number;
    size: number;
    height: number;
    heights: number[];
};

export class HeightMapMessage implements IIncomingPacket<HeightMapMessageType> {
    public parse(wrapper: IMessageDataWrapper): HeightMapMessageType {

        const packet: HeightMapMessageType = {
            width: wrapper.readInt(),
            size: wrapper.readInt(),
            height: 0,
            heights: []
        };

        packet.height = packet.size / packet.width;

        let i = 0;

        while (i < packet.size) {
            packet.heights[i] = wrapper.readShort();

            i++;
        }

        return packet;
    }
}
