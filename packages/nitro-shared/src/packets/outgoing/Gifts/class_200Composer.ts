import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type class_200ComposerType = object;

export class class_200Composer implements IOutgoingPacket<class_200ComposerType> {
    public constructor(private params: class_200ComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
