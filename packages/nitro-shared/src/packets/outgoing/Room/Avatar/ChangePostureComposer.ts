import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChangePostureComposerType = object;

export class ChangePostureComposer implements IOutgoingPacket<ChangePostureComposerType> {
    public constructor(private params: ChangePostureComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
