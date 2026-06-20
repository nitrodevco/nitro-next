import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetRandomStateComposerType = {
    objectId: number;
    param: number;
};

export class SetRandomStateComposer implements IOutgoingPacket<SetRandomStateComposerType> {
    public constructor(private params: SetRandomStateComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.objectId,
            this.params.param,
        ];
    }
}
