import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChangeMottoComposerType = object;

export class ChangeMottoComposer implements IOutgoingPacket<ChangeMottoComposerType> {
    public constructor(private params: ChangeMottoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
