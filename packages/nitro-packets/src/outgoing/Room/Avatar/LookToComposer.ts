import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type LookToComposerType = object;

export class LookToComposer implements IOutgoingPacket<LookToComposerType> {
    public constructor(private params: LookToComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
