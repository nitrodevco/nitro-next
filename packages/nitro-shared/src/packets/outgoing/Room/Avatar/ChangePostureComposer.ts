import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChangePostureComposerType = {
    postureType: 0 | 1;
};

export class ChangePostureComposer implements IOutgoingPacket<ChangePostureComposerType> {
    public constructor(private params: ChangePostureComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.postureType
        ];
    }
}
