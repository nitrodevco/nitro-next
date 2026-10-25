import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `InitCameraMessageParser`: the poster's credit and ducket prices, then the publish price when the body has it. */
export type InitCameraMessageType = {
    creditPrice: number;
    ducketPrice: number;
    publishDucketPrice: number;
};

export class InitCameraMessage implements IIncomingPacket<InitCameraMessageType> {
    public parse(wrapper: IMessageDataWrapper): InitCameraMessageType {
        const creditPrice = wrapper.readInt();
        const ducketPrice = wrapper.readInt();
        const publishDucketPrice = wrapper.bytesAvailable ? wrapper.readInt() : 0;

        return { creditPrice, ducketPrice, publishDucketPrice };
    }
}
