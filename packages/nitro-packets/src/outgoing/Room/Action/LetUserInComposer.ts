import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type LetUserInComposerType = object;

export class LetUserInComposer implements IOutgoingPacket<LetUserInComposerType> {
    public constructor(private params: LetUserInComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
