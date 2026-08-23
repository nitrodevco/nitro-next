import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CameraPublishStatusMessageType = object;

export class CameraPublishStatusMessage implements IIncomingPacket<CameraPublishStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): CameraPublishStatusMessageType {
        const packet: CameraPublishStatusMessageType = {
        };

        return packet;
    }
}
