import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredLinkOpenMessageType = {
    furniId: number;
};

/**
 * The server asks the client to open a WIRED Link's window. Flash parser `wiredlink._-v15`;
 * `WiredLinkController.onOpen` asks for the Link's configuration when the user owns the furni.
 */
export class WiredLinkOpenMessage implements IIncomingPacket<WiredLinkOpenMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredLinkOpenMessageType {
        return { furniId: wrapper.readInt() };
    }
}
