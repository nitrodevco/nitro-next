import { IIncomingPacket, IMessageDataWrapper, SlideAvatarMoveType } from '@nitrodevco/nitro-api';

export type SlideObjectBundleMessageType = {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    heights: { objectId: number; from: number; to: number; }[];
    rollerItemId: number;
    avatar: { moveType: SlideAvatarMoveType, objectId: number, from: number; to: number; } | undefined;
};

export class SlideObjectBundleMessage implements IIncomingPacket<SlideObjectBundleMessageType> {
    public parse(wrapper: IMessageDataWrapper): SlideObjectBundleMessageType {
        const packet: SlideObjectBundleMessageType = {
            fromX: wrapper.readInt(),
            fromY: wrapper.readInt(),
            toX: wrapper.readInt(),
            toY: wrapper.readInt(),
            heights: [],
            rollerItemId: -1,
            avatar: undefined
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.heights.push({
                objectId: wrapper.readInt(),
                from: parseFloat(wrapper.readString()),
                to: parseFloat(wrapper.readString())
            });

            count--;
        }

        packet.rollerItemId = wrapper.readInt();

        if (wrapper.bytesAvailable) {
            packet.avatar = {
                moveType: wrapper.readInt(),
                objectId: wrapper.readInt(),
                from: parseFloat(wrapper.readString()),
                to: parseFloat(wrapper.readString())

            }
        }

        return packet;
    }
}
