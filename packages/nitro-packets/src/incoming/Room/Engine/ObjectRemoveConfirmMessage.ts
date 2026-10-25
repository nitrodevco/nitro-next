import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ObjectRemoveConfirmMessageType = {
    /** The room object's category: the protocol's 1 is a wall item (20), anything else a floor item (10). */
    category: number;
    id: number;
    /** Localization keys of the confirmation's title and text. */
    confirmTitle: string;
    confirmBody: string;
};

/** `ObjectRemoveConfirmMessageParser`. */
export class ObjectRemoveConfirmMessage implements IIncomingPacket<ObjectRemoveConfirmMessageType> {
    public parse(wrapper: IMessageDataWrapper): ObjectRemoveConfirmMessageType {
        return {
            category: (wrapper.readInt() === 1) ? 20 : 10,
            id: wrapper.readInt(),
            confirmTitle: wrapper.readString(),
            confirmBody: wrapper.readString(),
        };
    }
}
