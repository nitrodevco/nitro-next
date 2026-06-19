import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModMessageComposerType = object;

export class ModMessageComposer implements IOutgoingPacket<ModMessageComposerType> {
    public constructor(private params: ModMessageComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
