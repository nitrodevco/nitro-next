import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredLinkDeleteNetworkComposerType = {
    furniId: number;
    networkId: string;
};

/** Deletes a network (`WiredLinkController.deleteNetwork`). Flash `wiredlink._-E3`. */
export class WiredLinkDeleteNetworkComposer implements IOutgoingPacket<WiredLinkDeleteNetworkComposerType> {
    public constructor(private params: WiredLinkDeleteNetworkComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.furniId,
            this.params.networkId,
        ];
    }
}
