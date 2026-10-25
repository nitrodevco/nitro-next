import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `CameraPublishStatusMessageParser`: ok, the seconds to wait, and on success the published photo's id when the body has it. */
export type CameraPublishStatusMessageType = {
    isOk: boolean;
    secondsToWait: number;
    extraDataId: string;
};

export class CameraPublishStatusMessage implements IIncomingPacket<CameraPublishStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): CameraPublishStatusMessageType {
        const isOk = wrapper.readBoolean();
        const secondsToWait = wrapper.readInt();
        const extraDataId = (isOk && wrapper.bytesAvailable) ? wrapper.readString() : '';

        return { isOk, secondsToWait, extraDataId };
    }
}
