import { GetObjectDataFromWrapper, type IIncomingPacket, type IMessageDataWrapper, type IObjectData } from '@nitrodevco/nitro-api';

export type ObjectDataUpdateMessageType = {
    objectId: number;
    stuffData: IObjectData;
};

export class ObjectDataUpdateMessage implements IIncomingPacket<ObjectDataUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): ObjectDataUpdateMessageType {
        const packet: ObjectDataUpdateMessageType = {
            objectId: parseInt(wrapper.readString()),
            stuffData: GetObjectDataFromWrapper(wrapper)
        };

        return packet;
    }
}
