import { GetObjectDataFromWrapper, type IIncomingPacket, type IMessageDataWrapper, type IObjectData } from '@nitrodevco/nitro-api';

export type ObjectsDataUpdateMessageType = {
    stuffDatas: { objectId: number, stuffData: IObjectData }[];
};

export class ObjectsDataUpdateMessage implements IIncomingPacket<ObjectsDataUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): ObjectsDataUpdateMessageType {
        const packet: ObjectsDataUpdateMessageType = {
            stuffDatas: []
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.stuffDatas.push({ objectId: wrapper.readInt(), stuffData: GetObjectDataFromWrapper(wrapper) });

            count--;
        }

        return packet;
    }
}
