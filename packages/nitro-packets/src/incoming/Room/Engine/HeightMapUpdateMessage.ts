import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HeightMapUpdateMessageType = {
    heightUpdates: { x: number, y: number, height: number }[];
};

export class HeightMapUpdateMessage implements IIncomingPacket<HeightMapUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): HeightMapUpdateMessageType {
        const packet: HeightMapUpdateMessageType = {
            heightUpdates: []
        };

        let count = wrapper.readByte();

        while (count > 0) {
            const x = wrapper.readByte();
            const y = wrapper.readByte();
            const height = wrapper.readShort();

            packet.heightUpdates.push({ x, y, height });

            count--;
        }

        return packet;
    }
}
