import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `ThumbnailStatusMessageParser`: ok unless the body says otherwise; an empty body is a success. */
export type ThumbnailStatusMessageType = {
    isOk: boolean;
    isRenderLimitHit: boolean;
};

export class ThumbnailStatusMessage implements IIncomingPacket<ThumbnailStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): ThumbnailStatusMessageType {
        if (!wrapper.bytesAvailable) return { isOk: true, isRenderLimitHit: false };

        const isOk = wrapper.readBoolean();
        const isRenderLimitHit = wrapper.readBoolean();

        return { isOk, isRenderLimitHit };
    }
}
