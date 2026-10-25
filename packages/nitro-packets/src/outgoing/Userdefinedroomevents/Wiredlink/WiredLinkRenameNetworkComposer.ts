import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredLinkRenameNetworkComposerType = {
    furniId: number;
    networkId: string;
    name: string;
};

/** Renames a network (`WiredLinkController.renameNetwork`). Flash `wiredlink._-V2v`. */
export class WiredLinkRenameNetworkComposer implements IOutgoingPacket<WiredLinkRenameNetworkComposerType> {
    public constructor(private params: WiredLinkRenameNetworkComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.furniId,
            this.params.networkId,
            this.params.name,
        ];
    }
}
