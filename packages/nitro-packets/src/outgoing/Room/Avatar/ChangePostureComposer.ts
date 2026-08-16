import { IOutgoingPacket, PostureTypeEnum } from '@nitrodevco/nitro-api';

export type ChangePostureComposerType = {
    postureType: PostureTypeEnum;
};

export class ChangePostureComposer implements IOutgoingPacket<ChangePostureComposerType> {
    public constructor(private params: ChangePostureComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.postureType
        ];
    }
}
