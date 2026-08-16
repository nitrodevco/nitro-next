import type { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type InterstitialShownComposerType = object;

export class InterstitialShownComposer implements IOutgoingPacket<InterstitialShownComposerType> {
    public constructor(private params: InterstitialShownComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
