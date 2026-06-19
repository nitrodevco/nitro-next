import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type class_165ComposerType = object;

export class class_165Composer implements IOutgoingPacket<class_165ComposerType> {
    public constructor(private params: class_165ComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
