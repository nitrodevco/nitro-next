import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuideAdvertisementReadComposerType = object;

export class GuideAdvertisementReadComposer implements IOutgoingPacket<GuideAdvertisementReadComposerType> {
    public constructor(private params: GuideAdvertisementReadComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
