import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredLinkSaveConfigurationComposerType = {
    furniId: number;
    networkId: string;
    receiveLocal: boolean;
};

/** Connects the Link to a network (`"0"` clears it) and sets whether it receives its own room (`WiredLinkController.save`). Flash `WiredLinkSaveConfigurationMessageComposer`. */
export class WiredLinkSaveConfigurationComposer implements IOutgoingPacket<WiredLinkSaveConfigurationComposerType> {
    public constructor(private params: WiredLinkSaveConfigurationComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.furniId,
            this.params.networkId,
            this.params.receiveLocal,
        ];
    }
}
