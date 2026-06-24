import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type class_493ComposerType = object;

export class class_493Composer implements IOutgoingPacket<class_493ComposerType> {
    public constructor(private params: class_493ComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
