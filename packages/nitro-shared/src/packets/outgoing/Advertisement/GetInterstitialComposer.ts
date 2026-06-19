import type { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetInterstitialComposerType = object;

export class GetInterstitialComposer implements IOutgoingPacket<GetInterstitialComposerType> {
    public constructor(private params: GetInterstitialComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
