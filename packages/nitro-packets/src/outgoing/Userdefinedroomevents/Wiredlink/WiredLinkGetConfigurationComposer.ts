import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredLinkGetConfigurationComposerType = {
    furniId: number;
};

/** Asks for a WIRED Link's configuration (`WiredLinkController.onOpen`). Flash `wiredlink._-7F`. */
export class WiredLinkGetConfigurationComposer implements IOutgoingPacket<WiredLinkGetConfigurationComposerType> {
    public constructor(private params: WiredLinkGetConfigurationComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.furniId,
        ];
    }
}
