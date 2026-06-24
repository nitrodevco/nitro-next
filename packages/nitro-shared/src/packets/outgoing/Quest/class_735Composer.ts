import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type class_735ComposerType = object;

export class class_735Composer implements IOutgoingPacket<class_735ComposerType> {
    public constructor(private params: class_735ComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
