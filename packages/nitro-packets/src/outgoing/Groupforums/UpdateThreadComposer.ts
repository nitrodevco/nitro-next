import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateThreadComposerType = object;

export class UpdateThreadComposer implements IOutgoingPacket<UpdateThreadComposerType> {
    public constructor(private params: UpdateThreadComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
