import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredLinkGetConnectionsComposerType = {
    furniId: number;
    networkId: string;
};

/** Asks for the Links connected to a network (`WiredLinkController.getConnections`). Flash `wiredlink._-41L`. */
export class WiredLinkGetConnectionsComposer implements IOutgoingPacket<WiredLinkGetConnectionsComposerType> {
    public constructor(private params: WiredLinkGetConnectionsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.furniId,
            this.params.networkId,
        ];
    }
}
