import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredLinkCreateNetworkComposerType = {
    furniId: number;
    name: string;
};

/** Creates a network (`WiredLinkController.createNetwork`). Flash `wiredlink._-In`. */
export class WiredLinkCreateNetworkComposer implements IOutgoingPacket<WiredLinkCreateNetworkComposerType> {
    public constructor(private params: WiredLinkCreateNetworkComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.furniId,
            this.params.name,
        ];
    }
}
